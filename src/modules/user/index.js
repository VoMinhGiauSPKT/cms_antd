import BaseTable from '@components/common/table/BaseTable';
import apiConfig from '@constants/apiConfig';
import useListBase from '@hooks/useListBase';
import { Button } from 'antd';
import React from 'react';

import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import AvatarField from '@components/common/form/AvatarField';
import { BaseTooltip } from '@components/common/form/BaseTooltip';
import TextField from '@components/common/form/TextField';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE, STATUS_DELETE } from '@constants';
import { FieldTypes } from '@constants/formConfig';
import { ssoStatusOptions } from '@constants/masterData';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { useLocation } from 'react-router-dom';

const UserAdminListPage = ({ pageOptions }) => {
    const translate = useTranslate();
    const location = useLocation();
    const { pathname: pagePath } = useLocation();
    const search = location.search;
    const statusValue = translate.formatKeys(ssoStatusOptions, ['label']);
    const { data, mixinFuncs, queryFilter, loading, pagination, serializeParams } = useListBase({
        apiConfig: {
            getList: apiConfig.account.getList,
            getById: apiConfig.account.getById,
            create: apiConfig.account.createAdmin,
            update: apiConfig.account.updateAdmin,
            delete: apiConfig.account.delete,
        },
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: translate.formatMessage(pageOptions.objectName),
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
            funcs.getCreateLink = (record) => {
                return `${pagePath}/create${search}`;
            };
            funcs.getItemDetailLink = (dataRow) => {
                return `${pagePath}/${dataRow.id}${search}`;
            };
            funcs.getList = () => {
                const params = mixinFuncs.prepareGetListParams(queryFilter);
                mixinFuncs.handleFetchList({ ...params, kind: pageOptions?.kind });
            };
            funcs.additionalActionColumnButtons = () => ({
                deleteAdmin: (record) => {
                    console.log('rc', record);
                    const isDelete = record?.status === STATUS_DELETE;
                    const hasPerm = mixinFuncs.hasPermission([apiConfig.account.delete.permissionCode]);
                    return (
                        <BaseTooltip type="delete" objectName={'Người dùng'}>
                            <Button
                                type="link"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    mixinFuncs.showDeleteItemConfirm(record.id);
                                }}
                                disabled={!hasPerm || !isDelete}
                                style={{ padding: 0 }}
                            >
                                <DeleteOutlined style={{ color: (!hasPerm || !isDelete) ? '' : 'red' }} />
                            </Button>
                        </BaseTooltip>
                    );
                },
            });
        },
    });
    const columns = [
        {
            title: "#",
            align: "center",
            width: 60,
            render: (text, record, index) => {
                const { current = 1, pageSize = 10 } = pagination;
                return (current - 1) * pageSize + index + 1;
            }
        },
        {
            title: "Avatar",
            dataIndex: "avatarPath",
            align: "center",
            width: 80,
            render: (avatar) => (
                <AvatarField
                    size="large"
                    icon={<UserOutlined />}
                    src={avatar ? `${AppConstants.avatarRootUrl}${avatar}` : null}
                />
            ),
        },
        { title: translate.formatMessage(commonMessage.fullName), dataIndex: 'fullName' },
        { title: translate.formatMessage(commonMessage.username), dataIndex: 'username', width: 200 },
        {
            title: translate.formatMessage(commonMessage.email),
            dataIndex: 'email',
            width: '220px',
        },
        {
            title: translate.formatMessage(commonMessage.phone),
            dataIndex: 'phone',
            width: '180px',
        },
        mixinFuncs.renderStatusColumn({ width: 120 }),
        mixinFuncs.renderActionColumn(
            {
                edit: true,
                deleteAdmin: true,
            },
            { width: '150px' },
        ),
    ];

    const searchFields = [
        {
            key: 'fullName',
            placeholder: translate.formatMessage(commonMessage.fullName),
        },
        {
            key: "email",
            placeholder: translate.formatMessage(commonMessage.email),
        },
        {
            key: 'phone',
            placeholder: translate.formatMessage(commonMessage.phone),
            type: FieldTypes.STRING,
            renderItem: () => <TextField placeholder={translate.formatMessage(commonMessage.phone)} />,
        },
        {
            key: 'status',
            placeholder: translate.formatMessage(commonMessage.status),
            type: FieldTypes.SELECT,
            options: statusValue,
            submitOnChanged: true,
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs(commonMessage, translate)}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                // actionBar={mixinFuncs.renderActionBar()}
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

export default UserAdminListPage;
