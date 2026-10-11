import React from 'react';
import { Button, Modal, Tag, Tooltip, Divider } from 'antd';
import { CheckOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import useListBase from '@hooks/useListBase';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { FieldTypes } from '@constants/formConfig';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import { formatDateString } from '@utils';
import { useNavigate } from 'react-router-dom';

const RegistrationListPage = ({ pageOptions }) => {

    const navigate = useNavigate();

    const { execute: executeApprove } = useFetch(
        apiConfig.classroomStudent.registerFromRegistration,
        { immediate: false }
    );

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.registration,
        options: {
            pageSize: 20,
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

    const handleApprove = (record) => {
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn duyệt đăng ký này vào lớp học không?',
            okText: 'Có',
            cancelText: 'Không',
            centered: true,
            onOk: () => {
                executeApprove({
                    data: {
                        registrationId: record.id,
                        id: record.id,
                    },
                    onCompleted: () => {
                        showSuccessMessage('Duyệt đăng ký thành công');
                        mixinFuncs.getList();
                    },
                    onError: (err) => {
                        showErrorMessage(err?.message || 'Duyệt đăng ký thất bại');
                    },
                });
            },
        });
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
            title: 'Họ và tên',
            render: (text, record) => record?.name || record?.fullName,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (email) => email,
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            render: (phone) => phone,
        },
        {
            title: 'Khóa học',
            render: (text, record) => record.classroom.course.name,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdDate',
            align: 'center',
            render: (date) => (date ? formatDateString(date, 'DD/MM/YYYY HH:mm:ss') : '-'),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            width: 120,
            render: (status) => (
                <Tag
                    color={status === 1 ? 'green' : 'default'}
                    style={{
                        width: 100,
                        textAlign: 'center',
                    }}
                >
                    {status === 1 ? 'Hoạt động' : 'Khóa'}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            width: 150,
            align: 'center',
            render: (text, record) => {
                return (
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Tooltip title="Xem chi tiết">
                            <Button
                                type="link"
                                style={{ padding: 0 }}
                                onClick={() => navigate(`/registrations/${record.id}`)}
                            >
                                <EyeOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                            </Button>
                        </Tooltip>
                        <Divider type="vertical" />

                        <Tooltip title="Duyệt đăng ký">
                            <Button
                                type="link"
                                style={{ padding: 0 }}
                                onClick={() => handleApprove(record)}
                            >
                                <CheckOutlined style={{ color: '#1890ff', fontSize: 16 }} />
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
            key: 'phone',
            placeholder: 'Điện thoại',
        },
        {
            key: 'classroomId',
            placeholder: 'Lớp học',
            type: FieldTypes.AUTOCOMPLETE,
            apiConfig: apiConfig.classRoom.getList,
            mappingOptions: (item) => ({
                value: item.id,
                label: item?.course?.name || item?.name,
            }),
            searchParams: (text) => ({ name: text }),
            submitOnChanged: true,
        },
        {
            key: 'status',
            placeholder: 'Trạng thái',
            type: FieldTypes.SELECT,
            options: [
                { value: 1, label: 'Hoạt động' },
                { value: 0, label: 'Khóa' },
            ],
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

export default RegistrationListPage;
