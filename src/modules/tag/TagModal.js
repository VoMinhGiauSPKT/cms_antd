import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form, Input } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { BaseForm } from '@components/common/form/BaseForm';
import TextField from '@components/common/form/TextField';
import SelectField from '@components/common/form/SelectField';
import { statusOptions } from '@constants/masterData';
import useTranslate from '@hooks/useTranslate';
import { STATUS_ACTIVE } from '@constants';

const TagModal = ({ open, onCancel, onSubmit, loading, dataDetail, isEditing }) => {
    const [form] = Form.useForm();
    const translate = useTranslate();
    const statusValue = translate.formatKeys(statusOptions, ['label']);
    const [colorValue, setColorValue] = useState('#1890ff');

    useEffect(() => {
        if (open) {
            if (dataDetail) {
                const color = dataDetail.color || dataDetail.colorCode || '#1890ff';
                setColorValue(color);
                form.setFieldsValue({
                    name: dataDetail.name,
                    color: color,
                    status: dataDetail.status !== undefined ? dataDetail.status : STATUS_ACTIVE,
                });
            } else {
                form.resetFields();
                setColorValue('#1890ff');
                form.setFieldsValue({
                    color: '#1890ff',
                    status: STATUS_ACTIVE,
                });
            }
        }
    }, [open, dataDetail, form]);

    const handleColorChange = (newColor) => {
        setColorValue(newColor);
        form.setFieldsValue({ color: newColor });
    };

    const handleFinish = (values) => {
        onSubmit(values);
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={isEditing ? 'Cập nhật thẻ' : 'Thêm mới thẻ'}
            footer={null}
            destroyOnClose
            maskClosable={false}
            width={600}
        >
            <BaseForm form={form} onFinish={handleFinish} layout="vertical" size="100%">
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={24}>
                        <TextField
                            label="Tên thẻ"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên thẻ',
                                },
                            ]}
                        />
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Mã màu"
                            name="color"
                            rules={[{ required: true, message: 'Vui lòng chọn hoặc nhập mã màu' }]}
                        >
                            <Input
                                placeholder="#bf2a2a"
                                value={colorValue}
                                onChange={(e) => handleColorChange(e.target.value)}
                                prefix={
                                    <input
                                        type="color"
                                        value={colorValue.startsWith('#') && colorValue.length === 7 ? colorValue : '#1890ff'}
                                        onChange={(e) => handleColorChange(e.target.value)}
                                        style={{
                                            border: 'none',
                                            width: 22,
                                            height: 22,
                                            cursor: 'pointer',
                                            background: 'transparent',
                                            padding: 0,
                                            marginRight: 4,
                                        }}
                                    />
                                }
                            />
                        </Form.Item>
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
                    <Button onClick={onCancel} style={{ width: 100 }}>
                        <StopOutlined /> Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading} style={{ width: 100 }}>
                        <SaveOutlined /> {isEditing ? 'Lưu' : 'Thêm mới'}
                    </Button>
                </div>
            </BaseForm>
        </Modal>
    );
};

export default TagModal;
