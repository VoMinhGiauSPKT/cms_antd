import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { showErrorMessage } from '@services/notifyService';
import { STATUS_ACTIVE } from '@constants';
import DeviceForm from './DeviceForm';
import { DEVICE_KIND_DEVICE } from '@constants/masterData';


const DeviceSavePage = ({ pageOptions }) => {
    const translate = useTranslate();
    const { id } = useParams();
    const location = useLocation();
    const search = location.search;

    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.device.getById,
            create: apiConfig.device.create,
            update: apiConfig.device.update,
        },
        options: {
            getListUrl: pageOptions.listPageUrl + `${search}`,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    kind: DEVICE_KIND_DEVICE,
                    status: data.status !== undefined ? data.status : STATUS_ACTIVE,
                };
            };

            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                    kind: DEVICE_KIND_DEVICE,
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
        <PageWrapper
            loading={loading}
            routes={pageOptions.renderBreadcrumbs(commonMessage, translate, title)}
        >
            <DeviceForm
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

export default DeviceSavePage;
