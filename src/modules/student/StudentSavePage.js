import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PageWrapper from '@components/common/layout/PageWrapper';
import apiConfig from '@constants/apiConfig';
import useFetch from '@hooks/useFetch';
import useSaveBase from '@hooks/useSaveBase';
import useTranslate from '@hooks/useTranslate';
import { commonMessage } from '@locales/intl';
import { showErrorMessage } from '@services/notifyService';
import { STATUS_ACTIVE } from '@constants';
import StudentForm from './StudentForm';

const StudentSavePage = ({ pageOptions }) => {
    const translate = useTranslate();
    const { id } = useParams();
    const location = useLocation();
    const search = location.search;

    // api lay quyen cho hs (kind =3)
    const { data: groups } = useFetch(apiConfig.groupPermission.autoComplete, {
        immediate: true,
        params: {
            kind: 3
        },
        mappingData: (res) => {
            const list = res.data?.content || res.data || [];
            return list.map((item) => ({
                value: item.id,
                label: item.name
            }));
        }
    })

    const { detail, mixinFuncs, loading, onSave, setIsChangedFormValues, isEditing, title } = useSaveBase({
        apiConfig: {
            getById: apiConfig.student.getById,
            create: apiConfig.student.create,
            update: apiConfig.student.update,
        },
        options: {
            getListUrl: pageOptions.listPageUrl + `${search}`,
            objectName: pageOptions.objectName
        },
        override: (funcs) => {
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    status: data.status || STATUS_ACTIVE,
                }
            };

            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id
                }
            };

            funcs.mappingData = (data) => {
                return {
                    ...data.data
                }
            };

            funcs.onSaveError = (error) => {
                mixinFuncs.handleShowErrorMessage(error, showErrorMessage);
                mixinFuncs.setSubmit(false)
            }
        }
    })

    return (
        <PageWrapper
            loading={loading}
            routes={pageOptions.renderBreadcrumbs(commonMessage, translate, title)}
        >
            <StudentForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
                groups={groups || []}
            />
        </PageWrapper>
    )
}

export default StudentSavePage