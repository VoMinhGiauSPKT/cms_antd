import React from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import useTranslate from '@hooks/useTranslate';
import { statusOptions, DEVICE_KIND_BRAND } from '@constants/masterData';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import AvatarField from '@components/common/form/AvatarField';
import { FieldTypes } from '@constants/formConfig';
import PageWrapper from '@components/common/layout/PageWrapper';

const BrandListPage = ({ pageOptions }) => {
    const translate = useTranslate();
    const navigate = useNavigate();
    const { deviceId } = useParams();
    const [searchParams] = useSearchParams();
    const deviceName = searchParams.get('deviceName') || '';
    const statusValue = translate.formatKeys(statusOptions, ['label']);

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.device,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            const originPrepareGetListParams = funcs.prepareGetListParams;
            funcs.prepareGetListParams = (filter) => {
                return {
                    ...originPrepareGetListParams(filter),
                    kind: DEVICE_KIND_BRAND,
                    parentId: deviceId,
                    deviceName: deviceName,
                };
            };

            const originChangeFilter = funcs.changeFilter;
            funcs.changeFilter = (filter) => {
                originChangeFilter({
                    ...filter,
                    ...(deviceName ? { deviceName } : {}),
                });
            };

            funcs.getItemDetailLink = (dataRow) => {
                return `/device/${deviceId}/brand/${dataRow.id}?deviceName=${encodeURIComponent(deviceName)}`;
            };
        },
    });

    const columns = [
        {
            title: '#',
            align: 'center',
            width: 60,
            render: (text, record, index) => {
                const { current = 1, pageSize = DEFAULT_TABLE_ITEM_SIZE } = pagination;
                return (current - 1) * pageSize + index + 1;
            },
        },
        {
            title: 'Avatar',
            align: 'center',
            width: 80,
            render: (text, record) => {
                const avatar = record?.avatar || record?.avatarPath || record?.image;
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
            title: 'Tên thương hiệu',
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

    const searchFields = [
        {
            key: 'name',
            placeholder: 'Tên thương hiệu',
        },
        {
            key: 'status',
            placeholder: 'Trạng thái',
            type: FieldTypes.SELECT,
            options: statusValue,
            submitOnChanged: true,
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs(deviceName)}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => navigate(`/device/${deviceId}/brand/create?deviceName=${encodeURIComponent(deviceName)}`)}
                    >
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
        </PageWrapper>
    );
};

export default BrandListPage;
