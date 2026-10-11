import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, Button } from 'antd';
import { StopOutlined, SaveOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import useBasicForm from '@hooks/useBasicForm';
import { BaseForm } from '@components/common/form/BaseForm';
import NumericField from '@components/common/form/NumericField';
import DatePickerField from '@components/common/form/DatePickerField';
import { DEFAULT_FORMAT } from '@constants';
import AutoCompleteField from '@components/common/form/AutoCompleteField';
import apiConfig from '@constants/apiConfig';


const ClassForm = (props) => {
    const { formId, dataDetail, onSubmit, setIsChangedFormValues, isEditing } = props;
    const navigate = useNavigate();
    const { form, mixinFuncs, onValuesChange } = useBasicForm({ onSubmit, setIsChangedFormValues });

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (values) => {
        return mixinFuncs.handleSubmit({
            ...values,
            startDate: values.startDate ? dayjs(values.startDate).format(DEFAULT_FORMAT) : null,
            endDate: values.endDate ? dayjs(values.endDate).format(DEFAULT_FORMAT) : null,
        });
    };

    useEffect(() => {
        if (!isEditing) {
            form.setFieldsValue({
                price: 0,
            });
        }
    }, [isEditing]);

    useEffect(() => {
        if (dataDetail?.id) {
            form.setFieldsValue({
                ...dataDetail,
                courseId: dataDetail.course?.id || dataDetail.courseId,
                startDate: dataDetail.startDate ? dayjs(dataDetail.startDate, [DEFAULT_FORMAT, 'YYYY-MM-DDTHH:mm:ss.SSSZ']) : null,
                endDate: dataDetail.endDate ? dayjs(dataDetail.endDate, [DEFAULT_FORMAT, 'YYYY-MM-DDTHH:mm:ss.SSSZ']) : null,
            });
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
                <Row gutter={16}>
                    <Col span={12}>
                        <AutoCompleteField
                            key={dataDetail?.course?.id}
                            label="Khóa học"
                            name="courseId"
                            required
                            apiConfig={apiConfig.course.getList}
                            mappingOptions={(item) => ({ value: item.id, label: item.name })}
                            searchParams={(text) => ({ name: text })}
                        />
                    </Col>
                    <Col span={12}>
                        <NumericField
                            label="Giá"
                            name="price"
                            min={0}
                            rules={[{ required: true, message: 'Giá không được để trống' }]}
                        />
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <DatePickerField
                            label="Ngày bắt đầu"
                            name="startDate"
                            format={DEFAULT_FORMAT}
                            showTime
                            style={{ width: '100%' }}
                            rules={[{ required: true, message: 'Ngày bắt đầu không được để trống' }]}
                        />
                    </Col>
                    <Col span={12}>
                        <DatePickerField
                            label="Ngày kết thúc"
                            name="endDate"
                            format={DEFAULT_FORMAT}
                            showTime
                            style={{ width: '100%' }}
                            rules={[
                                { required: true, message: 'Ngày kết thúc không được để trống' },
                                {
                                    validator: (rule, value) => {
                                        const startDate = form.getFieldValue('startDate');
                                        return value && startDate && !dayjs(value).isAfter(dayjs(startDate))
                                            ? Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'))
                                            : Promise.resolve();
                                    },
                                },
                            ]}
                        />
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                    <Button danger onClick={handleCancel} style={{ width: 100 }}>
                        <StopOutlined /> Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ width: 110 }}>
                        <SaveOutlined /> {isEditing ? 'Cập nhật' : 'Thêm mới'}
                    </Button>
                </div>
            </Card>
        </BaseForm>
    );
};

export default ClassForm;
