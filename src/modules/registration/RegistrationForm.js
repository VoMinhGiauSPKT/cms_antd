import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button } from 'antd';
import { StopOutlined, SaveOutlined } from '@ant-design/icons';
import useBasicForm from '@hooks/useBasicForm';
import { BaseForm } from '@components/common/form/BaseForm';
import TextField from '@components/common/form/TextField';
import AutoCompleteField from '@components/common/form/AutoCompleteField';
import apiConfig from '@constants/apiConfig';

const RegistrationForm = (props) => {
    const { formId, dataDetail, onSubmit, setIsChangedFormValues, isDetail } = props;
    const navigate = useNavigate();
    const { form, mixinFuncs, onValuesChange } = useBasicForm({ onSubmit, setIsChangedFormValues });

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({
            ...values,
        });
    };

    useEffect(() => {
        if (dataDetail?.id) {
            form.setFieldsValue({
                ...dataDetail,
                classroomId: dataDetail.classroom?.id || dataDetail.classroomId,
            });
        }
    }, [dataDetail, form]);

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
                        <TextField
                            label="Họ và tên"
                            name="fullName"
                            required
                            disabled={isDetail}
                            placeholder="Nhập họ và tên"
                        />
                    </Col>
                    <Col span={12}>
                        <AutoCompleteField
                            key={dataDetail?.classroom?.id}
                            label="Lớp học"
                            name="classroomId"
                            required
                            disabled={isDetail}
                            placeholder="Chọn lớp học"
                            apiConfig={apiConfig.classRoom.getList}
                            mappingOptions={(item) => ({
                                value: item.id,
                                label: item?.course?.name || item?.name,
                            })}
                            searchParams={(text) => ({ name: text })}
                        />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            label="Email"
                            name="email"
                            required
                            disabled={isDetail}
                            placeholder="Nhập email"
                            rules={[
                                { type: 'email', message: 'Email không đúng định dạng' },
                            ]}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            label="Số điện thoại"
                            name="phone"
                            required
                            disabled={isDetail}
                            placeholder="Nhập số điện thoại"
                        />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <TextField
                            label="Lời nhắn"
                            name="message"
                            type="textarea"
                            rows={4}
                            placeholder="Nhập lời nhắn"
                            disabled={isDetail}
                        />
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                    <Button danger={!isDetail} onClick={handleCancel} style={{ width: 100 }}>
                        {isDetail ? (
                            <>
                                Quay lại
                            </>
                        ) : (
                            <>
                                <StopOutlined /> Hủy
                            </>
                        )}
                    </Button>
                    {!isDetail && <Button type="primary" htmlType="submit" style={{ width: 110 }}>
                        <SaveOutlined /> Thêm mới
                    </Button>}
                </div>
            </Card>
        </BaseForm>
    );
};

export default RegistrationForm;
