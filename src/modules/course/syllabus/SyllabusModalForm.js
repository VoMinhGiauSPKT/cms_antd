import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button, Form } from 'antd';
import { StopOutlined, SaveOutlined } from '@ant-design/icons';
import CropImageField from '@components/common/form/CropImageField';
import TextField from '@components/common/form/TextField';
import SelectField from '@components/common/form/SelectField';
import NumericField from '@components/common/form/NumericField';
import { BaseForm } from '@components/common/form/BaseForm';
import apiConfig from '@constants/apiConfig';
import { AppConstants } from '@constants';
import useFetch from '@hooks/useFetch';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import DefaultAvatar from '@assets/images/avatar-default.png';
import { syllabusKindOptions } from '@constants/masterData';
import useTranslate from '@hooks/useTranslate';



const SyllabusModalForm = ({ open, close, dataDetail, isEditing, onSubmit, isSubmitting }) => {
    const translate = useTranslate();
    const kindOptions = translate.formatKeys(syllabusKindOptions, ['label']);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedKind, setSelectedKind] = useState(1);

    const { execute: executeUpfile } = useFetch(apiConfig.file.upload);

    const uploadFile = (file, onSuccess) => {
        executeUpfile({
            data: {
                type: 'AVATAR',
                file: file,
            },
            onCompleted: (response) => {
                if (response.result === true) {
                    onSuccess();
                    setImageUrl(response.data.filePath);
                    form.setFieldsValue({ avatar: response.data.filePath });
                    showSuccessMessage('Upload ảnh thành công!');
                }
            },
            onError: (err) => {
                // console.log(err)
                showErrorMessage('lỗi upload ảnh: ', err);
            },
        });

    }

    useEffect(() => {
        if (open) {
            if (isEditing && dataDetail?.id) {
                form.setFieldsValue({
                    ...dataDetail,
                    kind: dataDetail.kind || 1,
                });
                setImageUrl(dataDetail.avatar);
                setSelectedKind(dataDetail.kind || 1);
            } else {
                form.resetFields();
                form.setFieldsValue({ kind: 1 });
                setImageUrl(null);
                setSelectedKind(1);
            }
        }
    }, [open, isEditing, dataDetail, form])

    const handleFinish = (values) => {
        onSubmit({
            ...values,
            avatar: imageUrl,
        });
    };
    return (
        <Modal
            open={open}
            onCancel={close}
            title={isEditing ? 'Chỉnh sửa giáo trình' : 'Thêm mới giáo trình'}
            footer={null}
            destroyOnClose={true}
            maskClosable={false}
            width={750}
        >
            <BaseForm
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                style={{ marginTop: 16 }}
            >

                {/* anh */}
                <Row gutter={16}>
                    <Col span={24}>
                        <CropImageField
                            label="Avatar"
                            name="avatar"
                            required
                            imageUrl={imageUrl ? `${AppConstants.avatarRootUrl}${imageUrl}` : DefaultAvatar}
                            aspect={1 / 1}
                            uploadFile={uploadFile}
                            rules={[{ required: true, message: 'Vui lòng tải lên ảnh Avatar' }]}
                        />
                    </Col>
                </Row>

                {/* giao trinh va loai */}
                <Row gutter={16} style={{ marginTop: 12 }}>
                    <Col span={12}>
                        <TextField
                            label="Tên giáo trình"
                            name="name"
                            required
                            placeholder="Tên giáo trình"
                            rules={[{ required: true, message: 'Vui lòng nhập tên giáo trình' }]}
                        />
                    </Col>
                    <Col span={12}>
                        <SelectField
                            label="Loại"
                            name="kind"
                            required
                            disabled={isEditing}
                            options={kindOptions}
                            onChange={(value) => {
                                setSelectedKind(value);
                                if (value === 1) {
                                    form.setFieldsValue({ timeline: undefined });
                                }
                            }}
                        />
                    </Col>
                </Row>

                {/* thoi luong cho bai hoc */}
                {selectedKind === 2 && (
                    <Row gutter={16} style={{ marginTop: 12 }}>
                        <Col span={12}>
                            <NumericField
                                label="Thời lượng"
                                name="timeline"
                                min={0}
                                required
                                placeholder="Thời lượng"
                                rules={[{ required: true, message: 'Vui lòng nhập thời lượng' }]}
                            />
                        </Col>
                    </Row>
                )}

                {/* mo ta */}
                <Row gutter={16} style={{ marginTop: 12 }}>
                    <Col span={24}>
                        <TextField
                            label="Mô tả"
                            name="description"
                            type="textarea"
                            required
                            minRows={6}
                            maxRows={10}
                            placeholder="Mô tả"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        />
                    </Col>
                </Row>

                <Row justify="end" gutter={12} style={{ marginTop: 24 }}>
                    <Col>
                        <Button danger onClick={close} icon={<StopOutlined />}>
                            Hủy
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            icon={<SaveOutlined />}
                        >
                            {isEditing ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </Col>
                </Row>
            </BaseForm>
        </Modal>
    )
}

export default SyllabusModalForm;