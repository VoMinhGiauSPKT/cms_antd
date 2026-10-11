import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { showErrorMessage } from '@services/notifyService';
import { STATUS_ACTIVE } from '@constants';
import SliderForm from './SliderForm';

const SliderSavePage = ({ pageOptions }) => {
    const translate = useTranslate();
    const { id } = useParams();
    const location = useLocation();
    const search = location.search;

    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.slider.getById,
            create: apiConfig.slider.create,
            update: apiConfig.slider.update,
        },
        options: {
            getListUrl: pageOptions.listPageUrl + `${search}`,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    kind: 8,
                    status: data.status !== undefined ? data.status : STATUS_ACTIVE,
                };
            };

            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                    kind: 8,
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
            <SliderForm
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

export default SliderSavePage;
