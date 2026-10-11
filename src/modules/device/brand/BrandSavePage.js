import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import { showErrorMessage } from '@services/notifyService';
import { STATUS_ACTIVE } from '@constants';
import BrandForm from './BrandForm';
import { DEVICE_KIND_BRAND } from '@constants/masterData';


const BrandSavePage = ({ pageOptions }) => {
    const { deviceId, id } = useParams();
    const [searchParams] = useSearchParams();
    const deviceName = searchParams.get('deviceName') || '';

    const listUrl = `/device/${deviceId}/brand?deviceName=${deviceName}`;

    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.device.getById,
            create: apiConfig.device.create,
            update: apiConfig.device.update,
        },
        options: {
            getListUrl: listUrl,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    kind: DEVICE_KIND_BRAND,
                    parentId: deviceId,
                    status: data.status !== undefined ? data.status : STATUS_ACTIVE,
                };
            };

            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                    kind: DEVICE_KIND_BRAND,
                    parentId: deviceId,
                };
            };

            funcs.mappingData = (data) => {
                return {
                    ...data.data,
                };
            };

            funcs.onSaveError = (error) => {
                mixinFuncs.handleShowErrorMessage(error, showErrorMessage);
                mixinFuncs.setSubmit(false);
            };
        },
    });

    return (
        <PageWrapper loading={loading} routes={pageOptions.renderBreadcrumbs(deviceName, listUrl, title)}>
            <BrandForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
            />
        </PageWrapper>
    );
};

export default BrandSavePage;
