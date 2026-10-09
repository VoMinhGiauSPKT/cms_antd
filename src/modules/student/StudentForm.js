import useTranslate from '@hooks/useTranslate';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useFetch from '@hooks/useFetch';
import useBasicForm from '@hooks/useBasicForm';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import apiConfig from '@constants/apiConfig';
import { AppConstants, STATUS_ACTIVE } from '@constants';
import { BaseForm } from '@components/common/form/BaseForm';
import { Card, Col, Row, Button } from 'antd';
import { StopOutlined, SaveOutlined } from '@ant-design/icons';
import TextField from '@components/common/form/TextField';
import SelectField from '@components/common/form/SelectField';
import CropImageField from '@components/common/form/CropImageField';
import DefaultAvatar from '@assets/images/avatar-default.png';
import { statusUserOptions } from '@constants/masterData';
import { commonMessage } from '@locales/intl';
import { checkUserName, checkFullName, checkEmail, checkPhone, checkPassword } from '@utils';


const StudentForm = (props) => {
    const { formId, dataDetail, onSubmit, setIsChangedFormValues, groups = [], isEditing } = props;
    const translate = useTranslate();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const statusValue = translate.formatKeys(statusUserOptions, ['label']);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({ onSubmit, setIsChangedFormValues })

    // up anh
    const uploadFile = (file, onSuccess, onError) => {
        executeUpFile({
            data: {
                type: "AVATAR",
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
        })
    }

    // nop
    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, avatar: imageUrl })
    }

    // huy
    const handleCancel = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (!isEditing) {
            form.setFieldsValue({
                status: STATUS_ACTIVE,
            })
        }
    }, [isEditing])

    useEffect(() => {
        if (dataDetail?.id) {
            form.setFieldsValue({
                ...dataDetail,
                ...dataDetail.account,
                groupId: dataDetail.account?.groupId?.id,
            })
            setImageUrl(dataDetail.account?.avatar)
        }
    }, [dataDetail])

    return (
        <BaseForm
            id={formId}
            onFinish={handleSubmit}
            form={form}
            onValuesChange={onValuesChange}
        >
            <Card className="card-form" bordered={false}>
                {/* avatar */}
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

                {/* ten dang nhap va ho ten */}
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
                            label={translate.formatMessage(commonMessage.fullName)}
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    validator: checkFullName,
                                },
                            ]}
                        />
                    </Col>
                </Row>

                {/* email va sdt */}
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label={translate.formatMessage(commonMessage.email)}
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
                            label={translate.formatMessage(commonMessage.phone)}
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

                {/* mat khau va dia chi */}
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label={translate.formatMessage(commonMessage.password)}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    validator: checkPassword,
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            label={translate.formatMessage(commonMessage.address)}
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Địa chỉ không được để trống',
                                },
                            ]}
                        />
                    </Col>
                </Row>

                {/* nhom quyen va trang thai */}
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
export default StudentForm