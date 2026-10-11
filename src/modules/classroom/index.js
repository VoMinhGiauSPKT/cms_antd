import React from 'react';
import { Button, Modal, Tag, Tooltip, Divider } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import useListBase from '@hooks/useListBase';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import { FieldTypes } from '@constants/formConfig';
import {
    CLASSROOM_STATE_CREATED,
    CLASSROOM_STATE_LEARNING,
    CLASSROOM_STATE_FINISHED,
    CLASSROOM_STATE_CANCELED,
    stateClassroomOptions,
} from '@constants/masterData';

import { formatMoneyValue } from '@utils';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import TextClamp from '@components/common/form/TextClamp';



const ClassListPage = ({ pageOptions }) => {
    const navigate = useNavigate();

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.classRoom,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: pageOptions.objectName,
        },
    });

    const { execute: executeChangeState } = useFetch(apiConfig.classRoom.changeState, { immediate: false });

    // doi trang thai
    const handleStateChange = (id, state, actionName) => {
        Modal.confirm({
            title: `Bạn có chắc chắn muốn ${actionName} lớp học này không?`,
            okText: "Có",
            cancelText: "Không",
            onOk: () => {
                executeChangeState({
                    data: { id, state },
                    onCompleted: () => {
                        showSuccessMessage(`${actionName.charAt(0).toUpperCase() + actionName.slice(1)} lớp học thành công`);
                        mixinFuncs.getList();
                    },
                    onError: (err) => {
                        showErrorMessage(`${actionName.charAt(0).toUpperCase() + actionName.slice(1)} lớp học thất bại: `, err);
                    },
                });
            },
        });
    };

    const columns = [
        {
            title: "#",
            align: "center",
            width: 60,
            render: (text, record, index) => {
                const { current = 1, pageSize = 10 } = pagination;
                return (current - 1) * pageSize + index + 1;
            },
        },
        {
            title: "Khóa học",
            dataIndex: ["course", "name"],
            width: 600,
            render: (name, record) => (
                <Tooltip title={name}>
                    <Link
                        to={`/classes/${record.id}/student?classroomName=${name}`}
                        style={{ color: '#1890ff', fontWeight: 500 }}
                    >
                        <TextClamp lineClamp={2}>
                            {name}
                        </TextClamp>
                    </Link>
                </Tooltip>
            ),
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            align: "center",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            align: "center",
        },
        {
            title: "Giá",
            dataIndex: "price",
            align: "right",
            render: (price) => formatMoneyValue(price),
        },
        {
            title: "Tình trạng",
            dataIndex: "state",
            align: "center",
            render: (state) => {
                const stateItem = stateClassroomOptions.find((item) => item.value === state);
                return (
                    <Tag
                        color={stateItem?.color || 'default'}
                        style={{
                            width: 100,
                            textAlign: 'center',
                        }}
                    >
                        {stateItem?.label || 'Chưa xác định'}
                    </Tag>
                );
            },
        },

        {
            title: "Hành động",
            align: "right",
            render: (text, record) => {
                const isActivated = record.state !== CLASSROOM_STATE_CREATED;

                // Nút Hoàn thành (khi Đang học)
                const slot1 = record.state === CLASSROOM_STATE_LEARNING ? (
                    <Tooltip title="Đánh dấu hoàn thành">
                        <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() => handleStateChange(record.id, CLASSROOM_STATE_FINISHED, "đánh dấu hoàn thành")}
                        >
                            <CheckCircleOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                        </Button>
                    </Tooltip>
                ) : null;

                // Nút Huỷ (khi Đang học) hoặc đang tạo
                let slot2 = null;
                if (record.state === CLASSROOM_STATE_LEARNING) {
                    slot2 = (
                        <Tooltip title="Huỷ lớp học">
                            <Button
                                type="link"
                                style={{ padding: 0 }}
                                onClick={() => handleStateChange(record.id, CLASSROOM_STATE_CANCELED, "huỷ")}
                            >
                                <CloseCircleOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                            </Button>
                        </Tooltip>
                    );
                } else if (record.state === CLASSROOM_STATE_CREATED) {
                    slot2 = (
                        <Tooltip title="Kích hoạt">
                            <Button
                                type="link"
                                style={{ padding: 0 }}
                                onClick={() => handleStateChange(record.id, CLASSROOM_STATE_LEARNING, "kích hoạt")}
                            >
                                <CheckOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                            </Button>
                        </Tooltip>
                    );
                }

                // Nút Sửa
                const slotEdit = (
                    <Tooltip title={isActivated ? "Lớp học đã kích hoạt, không thể chỉnh sửa" : "Chỉnh sửa"}>
                        <Button
                            type="link"
                            disabled={isActivated}
                            style={{ padding: 0 }}
                            onClick={() => navigate(`/classes/${record.id}`)}
                        >
                            <EditOutlined style={{ color: isActivated ? '#8c8c8c' : '#1890ff', fontSize: 16 }} />
                        </Button>
                    </Tooltip>
                );

                // Nút Xóa
                const slotDelete = (
                    <Tooltip title="Xóa">
                        <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() => mixinFuncs.showDeleteItemConfirm(record.id)}
                        >
                            <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                        </Button>
                    </Tooltip>
                );

                return (
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        {slot1 ? (
                            <>
                                <span style={{ width: 18, display: 'inline-flex', justifyContent: 'center' }}>{slot1}</span>
                                <Divider type="vertical" />
                            </>
                        ) : (
                            <span style={{ width: 27, display: 'inline-block' }} />
                        )}

                        {slot2 ? (
                            <>
                                <span style={{ width: 18, display: 'inline-flex', justifyContent: 'center' }}>{slot2}</span>
                                <Divider type="vertical" />
                            </>
                        ) : (
                            <span style={{ width: 27, display: 'inline-block' }} />
                        )}

                        <span style={{ width: 18, display: 'inline-flex', justifyContent: 'center' }}>{slotEdit}</span>
                        <Divider type="vertical" />

                        <span style={{ width: 18, display: 'inline-flex', justifyContent: 'center' }}>{slotDelete}</span>
                    </div>
                );

            },
        },


    ];

    const searchFields = [
        {
            key: "courseId",
            placeholder: "Khóa học",
            type: FieldTypes.AUTOCOMPLETE,
            apiConfig: apiConfig.course.getList,
            mappingOptions: (item) => ({ value: item.id, label: item.name }),
            searchParams: (text) => ({ name: text }),
            submitOnChanged: true,
        },
        {
            key: "state",
            placeholder: "Tình trạng",
            type: FieldTypes.SELECT,
            options: stateClassroomOptions,
            submitOnChanged: true,
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs()}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
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
        </PageWrapper>
    );
};

export default ClassListPage;
