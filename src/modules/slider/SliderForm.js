import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { StopOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useTranslate from '@hooks/useTranslate';
import useFetch from '@hooks/useFetch';
import useBasicForm from '@hooks/useBasicForm';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import apiConfig from '@constants/apiConfig';
import { AppConstants, STATUS_ACTIVE } from '@constants';
import { BaseForm } from '@components/common/form/BaseForm';
import TextField from '@components/common/form/TextField';
import SelectField from '@components/common/form/SelectField';
import CropImageField from '@components/common/form/CropImageField';
import DefaultAvatar from '@assets/images/avatar-default.png';
import { statusOptions } from '@constants/masterData';

const SliderForm = (props) => {
    const { formId, dataDetail, onSubmit, setIsChangedFormValues, isEditing } = props;
    const translate = useTranslate();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const statusValue = translate.formatKeys(statusOptions, ['label']);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({ onSubmit, setIsChangedFormValues });

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
            onError: () => {
                showErrorMessage('File upload không hợp lệ !');
            },
        });
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({
            ...values,
            avatar: imageUrl,
            avatarPath: imageUrl,
            image: imageUrl,
        });
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
            });
            const avatar = dataDetail.avatar || dataDetail.avatarPath || dataDetail.image;
            setImageUrl(avatar);
        }
    }, [dataDetail]);

    return (
        <BaseForm id={formId} onFinish={handleSubmit} form={form} onValuesChange={onValuesChange}>
            <Card className="card-form" bordered={false}>
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label="Avatar"
                            name="avatar"
                            imageUrl={imageUrl ? `${AppConstants.avatarRootUrl}${imageUrl}` : DefaultAvatar}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                        />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label="Tên slider"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên slider',
                                },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            label="Trạng thái"
                            name="status"
                            options={statusValue}
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                        />
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                    <Button onClick={handleCancel} style={{ width: 100 }}>
                        <StopOutlined /> Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                        <SaveOutlined /> {isEditing ? 'Lưu' : 'Thêm mới'}
                    </Button>
                </div>
            </Card>
        </BaseForm>
    );
};

export default SliderForm;
