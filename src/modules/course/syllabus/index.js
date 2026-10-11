import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { PlusOutlined, SaveOutlined, EditOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import { arrayMove } from '@dnd-kit/sortable';
import PageWrapper from '@components/common/layout/PageWrapper';
import DragDropTableV2 from '@components/common/table/DragDropTableV2';
import AvatarField from '@components/common/form/AvatarField';
import apiConfig from '@constants/apiConfig';
import { AppConstants } from '@constants';
import useFetch from '@hooks/useFetch';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import ListPage from '@components/common/layout/ListPage';
import SyllabusModalForm from './SyllabusModalForm';


const SyllabusListPage = ({ pageOptions }) => {
    const { courseId } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    const { execute: executeGetList, loading } = useFetch(apiConfig.syllabus.getList, { immediate: false });
    const { execute: executeUpdateOrdering, loading: updatingOrder } = useFetch(
        apiConfig.syllabus.updateOrdering,
        { immediate: false },
    );

    const { execute: executeDelete } = useFetch(apiConfig.syllabus.delete, { immediate: false });

    const { execute: executeCreate, loading: creating } = useFetch(apiConfig.syllabus.create, { immediate: false });
    const { execute: executeUpdate, loading: updating } = useFetch(apiConfig.syllabus.update, { immediate: false });

    // lay danh sach
    const fetchData = useCallback(() => {
        if (!courseId) return
        executeGetList({
            params: {
                courseId: courseId,
                page: 0,
                size: 1000,
            },
            onCompleted: (res) => {
                const items = res?.data?.content || [];
                setDataSource(items);
            },
            onError: () => {
                showErrorMessage('Không thể tải danh sách giáo trình');
            }
        })
    }, [courseId, executeGetList])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // keo tha
    const onDragEnd = (active, over) => {
        if (!over) return;

        if (active.id !== over.id) {
            setDataSource((prev) => {
                const activeIndex = prev.findIndex((item) => item.id === active.id);
                const overIndex = prev.findIndex((item) => item.id === over.id);

                return arrayMove(prev, activeIndex, overIndex)
            })
        }
    }


    // phan nay kho (xem lai) 
    const handleUpdateOrdering = () => {

        // Hàm tìm id của Chương đứng gần nhất phía trước một bài học
        const findParentChapterId = (list, currentIndex) => {
            for (let i = currentIndex - 1; i >= 0; i--) {
                // Nếu dòng phía trước là Chương (kind = 1 hoặc tên có chữ "Chương")
                if (list[i].kind === 1) {
                    return list[i].id;
                }
            }
            return 0;
        };
        const payload = dataSource.map((item, index, list) => {
            const isChapter = item.kind === 1;
            return {
                id: item.id,
                ordering: index,
                // Nếu là Chương thì chapterId = 0, nếu là Bài học thì lấy id của Chương đứng trước nó
                chapterId: isChapter ? 0 : (findParentChapterId(list, index) || item.chapterId || 0),
            };
        });
        // console.log("Dữ liệu gửi lên API kèm chapterId:", payload);
        executeUpdateOrdering({
            data: payload,
            onCompleted: () => {
                showSuccessMessage("Cập nhật vị trí thành công");
            },
            onError: (err) => {
                // console.log(err);
                showErrorMessage("Cập nhật vị trí thất bại: ", err);
            },
        });
    };

    // xoa
    const handleDelete = (record) => {
        // Tìm chapterId của chương chứa bài học này
        const findParentChapterId = (targetId) => {
            const index = dataSource.findIndex((item) => item.id === targetId);
            for (let i = (index !== -1 ? index : dataSource.length) - 1; i >= 0; i--) {
                if (dataSource[i].kind === 1) {
                    return dataSource[i].id;
                }
            }
            return undefined;
        };
        const parentChapterId = findParentChapterId(record.id);
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa giáo trình này không?",
            okText: "Có",
            cancelText: "Không",
            okType: "danger",
            onOk: () => {
                executeDelete({
                    pathParams: { id: record.id },
                    // Nếu là bài học thì gửi kèm chapterId lên query param
                    params: parentChapterId ? { chapterId: parentChapterId } : {},
                    onCompleted: () => {
                        showSuccessMessage("Xóa giáo trình thành công");
                        fetchData();
                    },
                    onError: (err) => {
                        showErrorMessage("Xóa giáo trình thất bại: ", err);
                    },
                });
            },
        });
    };

    const handleSubmitModal = (values) => {
        // Tìm chương cha gần nhất nếu đây là Bài học
        const findParentChapterId = (list, targetId) => {
            const index = targetId ? list.findIndex((item) => item.id === targetId) : list.length;
            for (let i = index - 1; i >= 0; i--) {
                if (list[i].kind === 1) {
                    return list[i].id;
                }
            }
            return 0;
        };

        if (isEditing) {
            // cap nhat
            const updatePayload = {
                id: dataDetail.id,
                name: values.name,
                avatar: values.avatar,
                description: values.description,
                ...(values.kind === 2 ? { timeline: values.timeline } : {}),
                ...(values.kind === 2 ? { chapterId: findParentChapterId(dataSource, dataDetail.id) } : {}),
            };

            executeUpdate({
                data: updatePayload,
                onCompleted: () => {
                    showSuccessMessage('Cập nhật giáo trình thành công');
                    setOpenModal(false);
                    fetchData();
                },
                onError: (err) => {
                    showErrorMessage('Cập nhật giáo trình thất bại:', err);
                },
            });
        } else {
            // them
            const createPayload = {
                courseId: courseId,
                kind: values.kind,
                name: values.name,
                avatar: values.avatar,
                description: values.description,
                ordering: dataSource.length,
                ...(values.kind === 2 ? { timeline: values.timeline } : {}),
                ...(values.kind === 2 ? { chapterId: findParentChapterId(dataSource) } : {}),
            };

            executeCreate({
                data: createPayload,
                onCompleted: () => {
                    showSuccessMessage('Thêm mới giáo trình thành công');
                    setOpenModal(false);
                    fetchData();
                },
                onError: (err) => {
                    showErrorMessage('Thêm mới giáo trình thất bại: ', err);
                },
            });
        }
    };


    const columns = [
        {
            key: "sort",
            width: 50,
            align: "center",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            width: 80,
            onCell: (record) => {
                return {
                    style: record.kind === 2 ? { paddingLeft: 32 } : {},
                };
            },
            render: (avatar) => (
                <AvatarField
                    size="large"
                    icon={<BookOutlined />}
                    src={avatar ? `${AppConstants.avatarRootUrl}${avatar}` : null}
                />
            ),
        },
        {
            title: "Tên giáo trình",
            dataIndex: "name",
        },
        {
            title: "Thời lượng",
            dataIndex: "timeline",
            align: "center",
            width: 120,
        },
        {
            title: "Hành động",
            align: "center",
            width: 120,
            render: (record) => (
                <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                    <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={() => {
                            setIsEditing(true);
                            setDataDetail(record);
                            setOpenModal(true);
                        }}
                    >
                        <EditOutlined style={{ color: "#1890ff", fontSize: 16 }} />
                    </Button>
                    <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={() => handleDelete(record)}
                    >
                        <DeleteOutlined style={{ color: "#ff4d4f", fontSize: 16 }} />
                    </Button>
                </div>
            ),
        },
    ];

    const renderActionBar = (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    setIsEditing(false);
                    setDataDetail({});
                    setOpenModal(true);
                }}
            >
                Thêm mới
            </Button>
            <Button
                type="primary"
                icon={<SaveOutlined />}
                loading={updatingOrder}
                onClick={handleUpdateOrdering}
            >
                Cập nhật vị trí
            </Button>
        </div>
    );

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs()}>
            <ListPage
                actionBar={renderActionBar}
                baseTable={
                    <DragDropTableV2
                        columns={columns}
                        dataSource={dataSource}
                        loading={loading}
                        onDragEnd={onDragEnd}
                        rowKey={(record) => record.id}
                        pagination={false}
                    />
                }
            />
            <SyllabusModalForm
                open={openModal}
                close={() => setOpenModal(false)}
                dataDetail={dataDetail}
                isEditing={isEditing}
                onSubmit={handleSubmitModal}
                isSubmitting={creating || updating}
            />
        </PageWrapper>
    );
}

export default SyllabusListPage