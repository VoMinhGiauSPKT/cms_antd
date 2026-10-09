import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button } from 'antd';
import { StopOutlined, SaveOutlined } from '@ant-design/icons';
import useTranslate from '@hooks/useTranslate';
import useFetch from '@hooks/useFetch';
import useBasicForm from '@hooks/useBasicForm';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import apiConfig from '@constants/apiConfig';
import { AppConstants, STATUS_ACTIVE } from '@constants';
import { BaseForm } from '@components/common/form/BaseForm';
import TextField from '@components/common/form/TextField';
import SelectField from '@components/common/form/SelectField';
import NumericField from '@components/common/form/NumericField';
import CropImageField from '@components/common/form/CropImageField';
import DefaultAvatar from '@assets/images/avatar-default.png';
import { statusUserOptions } from '@constants/masterData';


const CourseForm = (props) => {
    const { formId, dataDetail, onSubmit, setIsChangedFormValues, isEditing } = props;
    const translate = useTranslate();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState(null);
    const statusValue = translate.formatKeys(statusUserOptions, ['label']);
    const { execute: executeUpFile } = useFetch(apiConfig.file.upload);
    const { form, mixinFuncs, onValuesChange } = useBasicForm({ onSubmit, setIsChangedFormValues });

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
            onError: (err) => {
                if (err.code === 'ERROR-FILE-FORMAT-INVALID') {
                    showErrorMessage('File upload không hợp lệ !');
                }
            }
        })
    }

    // nop
    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({ ...values, avatar: imageUrl })
    }

    // huy
    const handleCancel = () => {
        navigate(-1);
    }

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
            setImageUrl(dataDetail.avatar);
        }
    }, [dataDetail]);

    return (
        <BaseForm
            id={formId}
            onFinish={handleSubmit}
            form={form}
            onValuesChange={onValuesChange}
        >
            <Card className="card-form" bordered={false}>
                {/* Ảnh đại diện */}
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageField
                            label="Ảnh đại diện"
                            name="avatar"
                            imageUrl={imageUrl ? `${AppConstants.avatarRootUrl}${imageUrl}` : DefaultAvatar}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                            rules={[{ required: true, message: 'Ảnh đại diện không được để trống' }]}
                        />
                    </Col>
                </Row>
                {/* Tên khóa học và Giá */}
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label="Tên khóa học"
                            name="name"
                            rules={[{ required: true, message: 'Tên khóa học không được để trống' }]}
                        />
                    </Col>
                    <Col span={12}>
                        <NumericField
                            label="Giá (VNĐ)"
                            name="price"
                            min={0}
                            rules={[{ required: true, message: 'Giá không được để trống' }]}
                        />
                    </Col>
                </Row>
                {/* Mô tả ngắn và Trạng thái */}
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label="Mô tả ngắn"
                            name="shortDescription"
                            type="textarea"
                            rules={[{ required: true, message: 'Mô tả ngắn không được để trống' }]}
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
                {/* Nút bấm Hủy và Lưu */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                    <Button onClick={handleCancel} style={{ width: 100 }}>
                        <StopOutlined /> Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ width: 100 }}>
                        <SaveOutlined /> Lưu
                    </Button>
                </div>
            </Card>
        </BaseForm>
    )
}

export default CourseForm;