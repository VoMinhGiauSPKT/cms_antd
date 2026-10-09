import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { StopOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { BaseForm } from '@components/common/form/BaseForm';
import TextField from '@components/common/form/TextField';
import SelectField from '@components/common/form/SelectField';
import CropImageField from '@components/common/form/CropImageField';
import DefaultAvatar from '@assets/images/avatar-default.png';
import useTranslate from '@hooks/useTranslate';
import useFetch from '@hooks/useFetch';
import useBasicForm from '@hooks/useBasicForm';
import apiConfig from '@constants/apiConfig';
import { AppConstants, STATUS_ACTIVE } from '@constants';
import { statusUserOptions } from '@constants/masterData';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import { checkUserName, checkFullName, checkEmail, checkPhone, checkPassword } from '@utils';
import { commonMessage } from '@locales/intl';

const MentorForm = (props) => {
    const translate = useTranslate();
    const { formId, actions, dataDetail, onSubmit, setIsChangedFormValues, groups, branchs, isEditing } = props;
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();
    const statusValue = translate.formatKeys(statusUserOptions, ['label']);

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        setIsChangedFormValues,
    });

    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setImageUrl(response.data.filePath);
                    setIsChangedFormValues(true);
                    showSuccessMessage('Upload file thành công !');
                }
            },
            onError: (error) => {
                if (error.code == 'ERROR-FILE-FORMAT-INVALID') {
                    showErrorMessage('File upload không hợp lệ !');
                }
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, avatarPath: imageUrl });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (!isEditing) {
            form.setFieldsValue({
                status: STATUS_ACTIVE,
            });
        }
    }, [isEditing]);

    useEffect(() => {
        if (dataDetail?.id) {
            form.setFieldsValue({
                ...dataDetail,
                ...dataDetail.account,
                groupId: dataDetail.account?.group?.id || dataDetail.account?.groupId,
            })
        }
        setImageUrl(dataDetail.account?.avatar || dataDetail.avatarPath);
    }, [dataDetail]);

    return (
        <BaseForm
            id={formId}
            onFinish={handleSubmit}
            form={form}
            onValuesChange={onValuesChange}
        >
            <Card className="card-form" bordered={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label={translate.formatMessage(commonMessage.avatar)}
                            name="avatarPath"
                            imageUrl={imageUrl ? `${AppConstants.avatarRootUrl}${imageUrl}` : DefaultAvatar}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label={translate.formatMessage(commonMessage.username)}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    validator: checkUserName,
                                },
                            ]}
                            disabled={isEditing}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            label="Mật khẩu"
                            name="password"
                            type="password"
                            rules={[
                                {
                                    required: !isEditing,
                                    validator: checkPassword,
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label="Họ và tên"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    validator: checkFullName,
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            label="Điện thoại"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    validator: checkPhone,
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    validator: checkEmail,
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            label="Vị trí"
                            name="position"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vị trí không được để trống',
                                },
                            ]}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <SelectField
                            label="Nhóm quyền"
                            name="groupId"
                            options={groups}
                            rules={[{ required: true, message: 'Nhóm quyền không được để trống' }]}
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            label="Trạng thái"
                            name="status"
                            options={statusValue}
                            rules={[{ required: true, message: 'Trạng thái không được để trống' }]}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <TextField
                            label="Mô tả"
                            name="description"
                            type="textarea"
                            rows={4}
                            rules={[{ required: true, message: 'Mô tả không được để trống' }]}
                        />
                    </Col>
                </Row>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                    {/* nut huy va nop */}
                    <Button
                        onClick={handleCancel}
                        style={{ width: 100 }}
                    >
                        <StopOutlined /> Hủy
                    </Button>

                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: 100 }}
                    >
                        <SaveOutlined /> Lưu
                    </Button>
                </div>
            </Card>
        </BaseForm>
    )
}

export default MentorForm;