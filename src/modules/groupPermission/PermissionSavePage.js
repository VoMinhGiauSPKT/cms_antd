import PageWrapper from '@components/common/layout/PageWrapper';
import { GROUP_KIND_ADMIN, STATUS_ACTIVE, UserTypes } from '@constants';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useSaveBase from '@hooks/useSaveBase';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PermissionForm from './PermissionForm';
import routes from '@routes';
import { FormattedMessage } from 'react-intl';

const PermissionSavePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [permissions, setPermissions] = useState([]);
    const { execute: executeGetPermission } = useFetch(apiConfig.groupPermission.getPermissionList, {
        immediate: false,
    });

    const { execute: listGroup } = useFetch(apiConfig.groupPermission.getList, {
        params: { kind: 1 },
        immediate: false,
    });

    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.groupPermission.getById,
            create: apiConfig.groupPermission.create,
            update: apiConfig.groupPermission.update,
        },
        options: {
            getListUrl: routes.groupPermissionPage.path,
            objectName: 'quyền',
        },
        override: (funcs) => {
            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        ...response.data,
                        permissions: response.data?.permissions
                            ? response.data?.permissions.map((permission) => permission.id)
                            : [],
                    };
                }
                return null;
            };
        },
    });

    useEffect(() => {
        executeGetPermission({
            params: {
                size: 1000,
            },
            onCompleted: (res) => {
                setPermissions(res?.data);
            },
        });
    }, []);

    return (
        <PageWrapper
            loading={loading}
            routes={[
                { breadcrumbName: <FormattedMessage defaultMessage="Quyền" />, path: routes.groupPermissionPage.path },
                { breadcrumbName: title },
            ]}
        >
            <PermissionForm
                size="normal"
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
                permissions={permissions || []}
            />
        </PageWrapper>
    );
};

export default PermissionSavePage;
