import React, { useEffect } from 'react';
import { Modal, Button, Row, Col, Form, Input, Rate } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { BaseForm } from '@components/common/form/BaseForm';
import AutoCompleteField from '@components/common/form/AutoCompleteField';
import apiConfig from '@constants/apiConfig';

const RatingModal = ({ open, onCancel, onSubmit, loading, dataDetail, isEditing }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            if (dataDetail) {
                form.setFieldsValue({
                    studentId: dataDetail.student.id,
                    courseId: dataDetail.course.id,
                    star: dataDetail?.star,
                    message: dataDetail?.message,
                });
            } else {
                form.resetFields();
            }
        }
    }, [open, dataDetail, form]);

    const handleFinish = (values) => {
        onSubmit(values);
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={isEditing ? 'Cập nhật đánh giá' : 'Thêm mới đánh giá'}
            footer={null}
            destroyOnClose
            maskClosable={false}
            width={650}
        >
            <BaseForm
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                size="100%"
            >
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={12}>
                        <AutoCompleteField
                            label="Học viên"
                            name="studentId"
                            required
                            placeholder="Học viên"
                            apiConfig={apiConfig.student.getList}
                            mappingOptions={(item) => ({
                                value: item.id,
                                label: item.account.fullName,
                            })}
                            searchParams={(text) => ({ fullName: text })}
                        />
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Số sao"
                            name="star"
                            rules={[{ required: true, message: 'Vui lòng chọn số sao' }]}
                        >
                            <Rate />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <AutoCompleteField
                            label="Khóa học"
                            name="courseId"
                            required
                            placeholder="Khóa học"
                            apiConfig={apiConfig.course.getList}
                            mappingOptions={(item) => ({
                                value: item.id,
                                label: item.name,
                            })}
                            searchParams={(text) => ({ name: text })}
                        />
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            label="Nội dung đánh giá"
                            name="message"
                            rules={[{ required: true, message: 'Vui lòng nhập nội dung đánh giá' }]}
                        >
                            <Input.TextArea rows={4} placeholder="Nội dung đánh giá" />
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                    <Button danger onClick={onCancel}>
                        <StopOutlined /> Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        <SaveOutlined /> {isEditing ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                </div>
            </BaseForm>
        </Modal>
    );
};

export default RatingModal;
