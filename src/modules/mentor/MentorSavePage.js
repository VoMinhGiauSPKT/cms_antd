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
import MentorForm from './MentorForm';

const MentorSavePage = ({ pageOptions }) => {
    const translate = useTranslate();
    const { id } = useParams();
    const location = useLocation();
    const search = location.search;

    const { data: groups } = useFetch(apiConfig.groupPermission.autoComplete, {
        immediate: true,
        params: {
            kind: 2,
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
            getById: apiConfig.mentor.getById,
            create: apiConfig.mentor.create,
            update: apiConfig.mentor.update,
        },
        options: {
            getListUrl: pageOptions.listPageUrl + `${search}`,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            funcs.prepareCreateData = (data) => {
                return {
                    ...data,
                    avatarPath: data.avatarPath || data.avatar,
                    status: data.status || STATUS_ACTIVE
                }
            };

            funcs.prepareUpdateData = (data) => {
                return {
                    ...data,
                    id: id,
                    avatarPath: data.avatarPath || data.avatar,
                };
            };

            funcs.mappingData = (data) => {
                return {
                    ...data.data,
                }
            };

            funcs.onSaveError = (error) => {
                mixinFuncs.handleShowErrorMessage(error, showErrorMessage);
                mixinFuncs.setSubmit(false);
            }
        }
    });

    return (
        <PageWrapper loading={loading} routes={pageOptions.renderBreadcrumbs(commonMessage, translate, title)}>
            <MentorForm
                setIsChangedFormValues={setIsChangedFormValues}
                dataDetail={detail ? detail : {}}
                formId={mixinFuncs.getFormId()}
                isEditing={isEditing}
                actions={mixinFuncs.renderActions()}
                onSubmit={onSave}
                groups={groups || []}
            />
        </PageWrapper>
    );

};

export default MentorSavePage;