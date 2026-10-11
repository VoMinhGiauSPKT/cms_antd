import React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { SaveOutlined, StopOutlined } from '@ant-design/icons';
import { BaseForm } from '@components/common/form/BaseForm';
import AutoCompleteField from '@components/common/form/AutoCompleteField';
import useBasicForm from '@hooks/useBasicForm';
import apiConfig from '@constants/apiConfig';

const ClassroomStudentModal = ({ open, onCancel, onSubmit, loading, classroomId }) => {
    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
    });

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title="Thêm học viên"
            footer={null}
            destroyOnClose
            maskClosable={false}
        >
            <BaseForm
                id="modal-add-student-form"
                form={form}
                onFinish={mixinFuncs.handleSubmit}
                onValuesChange={onValuesChange}
                layout="vertical"
                size="100%"
            >
                <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={24}>
                        <AutoCompleteField
                            label="Học viên"
                            name="studentId"
                            required
                            placeholder="Học viên"
                            apiConfig={apiConfig.student.autoComplete}
                            mappingOptions={(e) => ({ value: e.id, label: e?.account?.fullName })}
                            searchParams={(text) => ({ fullName: text, ignoreClassroomId: classroomId })}
                        />
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
                    <Button danger onClick={onCancel}>
                        <StopOutlined /> Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        <SaveOutlined /> Thêm mới
                    </Button>
                </div>
            </BaseForm>

        </Modal>
    );
};

export default ClassroomStudentModal;
