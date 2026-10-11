import React, { useState } from 'react';
import { Button, Rate, Tooltip, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import useListBase from '@hooks/useListBase';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { FieldTypes } from '@constants/formConfig';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import { formatDateString } from '@utils';
import RatingModal from './RatingModal';
import TextClamp from '@components/common/form/TextClamp';
import { DEFAULT_TABLE_ITEM_SIZE } from '@constants';

const RatingListPage = ({ pageOptions }) => {
    const [openModal, setOpenModal] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { execute: executeCreate, loading: creating } = useFetch(apiConfig.rating.create, { immediate: false });
    const { execute: executeUpdate, loading: updating } = useFetch(apiConfig.rating.update, { immediate: false });

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.rating,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.content,
                        total: response.data.totalElements,
                    };
                }
            };
        },
    });

    // them
    const handleOpenCreateModal = () => {
        setIsEditing(false);
        setDataDetail(null);
        setOpenModal(true);
    };
    // update
    const handleOpenEditModal = (record) => {
        setIsEditing(true);
        setDataDetail(record);
        setOpenModal(true);
    };

    const handleSubmitModal = (values) => {
        if (isEditing) {
            executeUpdate({
                data: {
                    ...values,
                    id: dataDetail.id,
                },
                onCompleted: () => {
                    showSuccessMessage('Cập nhật đánh giá thành công');
                    setOpenModal(false);
                    mixinFuncs.getList();
                },
                onError: (err) => {
                    showErrorMessage(err?.message || 'Cập nhật thất bại');
                },
            });
        } else {
            executeCreate({
                data: values,
                onCompleted: () => {
                    showSuccessMessage('Thêm mới đánh giá thành công');
                    setOpenModal(false);
                    mixinFuncs.getList();
                },
                onError: (err) => {
                    showErrorMessage(err?.message || 'Thêm mới thất bại');
                },
            });
        }
    };

    const columns = [
        {
            title: '#',
            width: 60,
            align: 'center',
            render: (text, record, index) => {
                const { current = 1, pageSize = 20 } = pagination;
                return (current - 1) * pageSize + index + 1;
            },
        },
        {
            title: 'Học viên',
            width: 200,
            render: (text, record) => {
                return record.student.account.fullName;
            },
        },
        {
            title: 'Khóa học',
            dataIndex: ['course', 'name'],
            width: 600,
            render: (name) => (
                <Tooltip title={name}>
                    <TextClamp lineClamp={2}>
                        {name}
                    </TextClamp>
                </Tooltip>
            ),
        },
        {
            title: 'Số sao',
            dataIndex: 'star',
            align: 'center',
            render: (star) => <Rate disabled value={star} />,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            align: 'center',
            render: (date) => formatDateString(date, 'DD/MM/YYYY HH:mm:ss'),
        },
        {
            title: 'Hành động',
            align: 'center',
            render: (text, record) => {
                return (
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title="Chỉnh sửa">
                            <Button
                                type="link"
                                style={{ padding: 0 }}
                                onClick={() => handleOpenEditModal(record)}
                            >
                                <EditOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                            </Button>
                        </Tooltip>

                        <Divider type="vertical" />

                        <Tooltip title="Xóa">
                            <Button
                                type="link"
                                style={{ padding: 0 }}
                                onClick={() => mixinFuncs.showDeleteItemConfirm(record.id)}
                            >
                                <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                            </Button>
                        </Tooltip>
                    </div>
                );
            },
        },

    ];

    const searchFields = [
        {
            key: 'courseId',
            placeholder: 'Khóa học',
            type: FieldTypes.AUTOCOMPLETE,
            apiConfig: apiConfig.course.getList,
            mappingOptions: (item) => ({ value: item.id, label: item.name }),
            searchParams: (text) => ({ name: text }),
            submitOnChanged: true,
        },
        {
            key: 'studentId',
            placeholder: 'Học viên',
            type: FieldTypes.AUTOCOMPLETE,
            apiConfig: apiConfig.student.getList,
            mappingOptions: (item) => ({
                value: item.id,
                label: item.account.fullName,
            }),
            searchParams: (text) => ({ fullName: text }),
            submitOnChanged: true,
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs()}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenCreateModal}>
                        Thêm mới
                    </Button>
                }
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                    />
                }
            />
            <RatingModal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onSubmit={handleSubmitModal}
                loading={creating || updating}
                dataDetail={dataDetail}
                isEditing={isEditing}
            />
        </PageWrapper>
    );
}

export default RatingListPage;