import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined, SaveOutlined, UserOutlined } from '@ant-design/icons';
import { arrayMove } from '@dnd-kit/sortable';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '@components/common/layout/PageWrapper';
import ListPage from '@components/common/layout/ListPage';
import DragDropTableV2 from '@components/common/table/DragDropTableV2';
import AvatarField from '@components/common/form/AvatarField';
import apiConfig from '@constants/apiConfig';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE_ALL } from '@constants';
import useListBase from '@hooks/useListBase';
import useFetch from '@hooks/useFetch';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';

const SliderListPage = ({ pageOptions }) => {
    const navigate = useNavigate();
    const [dataSource, setDataSource] = useState([]);

    const { execute: executeUpdateOrdering, loading: updatingOrder } = useFetch(
        apiConfig.slider.updateOrdering,
        { immediate: false },
    );

    const { data, mixinFuncs, loading } = useListBase({
        apiConfig: apiConfig.slider,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE_ALL,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            funcs.prepareGetListParams = () => {
                return {
                    page: 0,
                    size: DEFAULT_TABLE_ITEM_SIZE_ALL,
                    kind: 8,
                };
            };
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data?.content,
                        total: response.data?.totalElements,
                    };
                }
            };
        },
    });


    useEffect(() => {
        if (Array.isArray(data)) {
            setDataSource(data);
        }
    }, [data]);

    const onDragEnd = (active, over) => {
        if (!over) return;
        if (active.id !== over.id) {
            setDataSource((prev) => {
                const activeIndex = prev.findIndex((item) => item.id === active.id);
                const overIndex = prev.findIndex((item) => item.id === over.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };

    const handleUpdateOrdering = () => {
        const payload = dataSource.map((item, index) => ({
            id: item.id,
            ordering: index,
        }));

        executeUpdateOrdering({
            data: payload,
            onCompleted: () => {
                showSuccessMessage('Cập nhật vị trí thành công');
                mixinFuncs.getList();
            },
            onError: (err) => {
                showErrorMessage(err?.message || 'Cập nhật vị trí thất bại');
            },
        });
    };

    const columns = [
        {
            key: 'sort',
            width: 50,
            align: 'center',
        },
        {
            title: 'Avatar',
            align: 'center',
            width: 80,
            render: (text, record) => {
                const avatar = record.avatar;
                return (
                    <AvatarField
                        size="large"
                        icon={<UserOutlined />}
                        src={avatar ? `${AppConstants.avatarRootUrl}${avatar}` : null}
                    />
                );
            },
        },
        {
            title: 'Tên slider',
            dataIndex: 'name',
        },
        mixinFuncs.renderStatusColumn({ width: 140 }),
        mixinFuncs.renderActionColumn(
            {
                edit: true,
                delete: true,
            },
            {
                width: '130px',
            },
        ),
    ];

    const renderActionBar = (
        <div style={{ display: 'flex', gap: 12 }}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/sliders/create')}
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
        </PageWrapper>
    );
};

export default SliderListPage;
