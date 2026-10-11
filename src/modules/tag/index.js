import React, { useState } from 'react';
import { Button, Tooltip, Divider } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import useListBase from '@hooks/useListBase';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import { STATUS_ACTIVE, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import TagModal from './TagModal';

const TagListPage = ({ pageOptions }) => {
    const [openModal, setOpenModal] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { execute: executeCreate, loading: creating } = useFetch(apiConfig.tag.create, { immediate: false });
    const { execute: executeUpdate, loading: updating } = useFetch(apiConfig.tag.update, { immediate: false });

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.tag,
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

    const handleOpenCreateModal = () => {
        setIsEditing(false);
        setDataDetail(null);
        setOpenModal(true);
    };

    const handleOpenEditModal = (record) => {
        setIsEditing(true);
        setDataDetail(record);
        setOpenModal(true);
    };

    const handleSubmitModal = (values) => {
        const payload = {
            ...values,
            color: values.color,
            colorCode: values.color,
            status: values.status !== undefined ? values.status : STATUS_ACTIVE,
        };

        if (isEditing) {
            executeUpdate({
                data: {
                    ...payload,
                    id: dataDetail.id,
                },
                onCompleted: () => {
                    showSuccessMessage('Cập nhật thẻ thành công');
                    setOpenModal(false);
                    mixinFuncs.getList();
                },
                onError: () => {
                    showErrorMessage('Cập nhật thẻ thất bại');
                },
            });
        } else {
            executeCreate({
                data: payload,
                onCompleted: () => {
                    showSuccessMessage('Thêm mới thẻ thành công');
                    setOpenModal(false);
                    mixinFuncs.getList();
                },
                onError: () => {
                    showErrorMessage('Thêm mới thẻ thất bại');
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
            title: 'Tên thẻ',
            dataIndex: 'name',
        },
        {
            title: 'Mã màu',
            dataIndex: 'color',
            render: (color, record) => {
                const colorValue = color || record?.colorCode;
                if (!colorValue) return;
                return (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span
                            style={{
                                display: 'inline-block',
                                width: 16,
                                height: 16,
                                backgroundColor: colorValue,
                                borderRadius: 3,
                                border: '1px solid #d9d9d9',
                            }}
                        />
                        <span>{colorValue}</span>
                    </div>
                );
            },
        },
        mixinFuncs.renderStatusColumn({ width: 140 }),
        {
            title: 'Hành động',
            width: 100,
            align: 'center',
            render: (text, record) => (
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
            ),
        },
    ];

    const searchFields = [
        {
            key: 'name',
            placeholder: 'Tên thẻ',
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
            <TagModal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onSubmit={handleSubmitModal}
                loading={creating || updating}
                dataDetail={dataDetail}
                isEditing={isEditing}
            />
        </PageWrapper>
    );
};

export default TagListPage;
