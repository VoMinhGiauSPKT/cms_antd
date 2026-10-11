import React from 'react';
import { Link } from 'react-router-dom';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import { UserOutlined } from '@ant-design/icons';
import useTranslate from '@hooks/useTranslate';
import { statusOptions, DEVICE_KIND_DEVICE } from '@constants/masterData';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import AvatarField from '@components/common/form/AvatarField';
import { FieldTypes } from '@constants/formConfig';
import PageWrapper from '@components/common/layout/PageWrapper';

const DeviceListPage = ({ pageOptions }) => {
    const translate = useTranslate();
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
                    kind: DEVICE_KIND_DEVICE,
                };
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
            title: 'Tên thiết bị',
            dataIndex: 'name',
            render: (name, record) => {
                return (
                    <Link to={`/device/${record.id}/brand?deviceName=${encodeURIComponent(name)}`}>
                        {name}
                    </Link>
                );
            },
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
            placeholder: 'Tên thiết bị',
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

export default DeviceListPage;
