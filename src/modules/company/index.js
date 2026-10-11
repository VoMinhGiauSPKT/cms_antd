import React from 'react';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import { ShopOutlined } from '@ant-design/icons';
import useTranslate from '@hooks/useTranslate';
import { statusOptions } from '@constants/masterData';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import AvatarField from '@components/common/form/AvatarField';
import { FieldTypes } from '@constants/formConfig';
import PageWrapper from '@components/common/layout/PageWrapper';

const CompanyListPage = ({ pageOptions }) => {
    const translate = useTranslate();
    const statusValue = translate.formatKeys(statusOptions, ['label']);

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.company,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: pageOptions.objectName,
        },
    });

    const columns = [
        {
            title: '#',
            align: 'center',
            width: 60,
            render: (text, record, index) => {
                const { current = 1, pageSize = 20 } = pagination;
                return (current - 1) * pageSize + index + 1;
            },
        },
        {
            title: 'Avatar',
            align: 'center',
            width: 80,
            render: (text, record) => {
                const avatar = record?.avatar;
                return (
                    <AvatarField
                        size="large"
                        icon={<ShopOutlined />}
                        src={avatar ? `${AppConstants.avatarRootUrl}${avatar}` : null}
                    />
                );
            },
        },
        {
            title: 'Tên công ty',
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
            placeholder: 'Tên công ty',
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

export default CompanyListPage;
