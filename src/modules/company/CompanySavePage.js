import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useSaveBase from '@hooks/useSaveBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { showErrorMessage } from '@services/notifyService';
import { STATUS_ACTIVE } from '@constants';
import CompanyForm from './CompanyForm';

const CompanySavePage = ({ pageOptions }) => {
    const translate = useTranslate();
    const { id } = useParams();
    const location = useLocation();
    const search = location.search;

    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.company.getById,
            create: apiConfig.company.create,
            update: apiConfig.company.update,
        },
        options: {
            getListUrl: pageOptions.listPageUrl + `${search}`,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    status: data.status !== undefined ? data.status : STATUS_ACTIVE,
                };
            };

            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
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
            <CompanyForm
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

export default CompanySavePage;
