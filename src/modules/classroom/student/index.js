import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button, Modal, Tag, Tooltip, Divider } from 'antd';
import { PlusOutlined, CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import useListBase from '@hooks/useListBase';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { DEFAULT_TABLE_ITEM_SIZE, DEFAULT_FORMAT } from '@constants';
import { FieldTypes } from '@constants/formConfig';
import {
    CLASSROOM_STUDENT_STATE_PENDING,
    CLASSROOM_STUDENT_STATE_APPROVE,
    CLASSROOM_STUDENT_STATE_REJECT,
    classroomStudentStateOptions,
} from '@constants/masterData';
import { showErrorMessage, showSuccessMessage } from '@services/notifyService';
import { formatDateString } from '@utils';
import ClassroomStudentModal from './ClassroomStudentModal';

const ClassroomStudentListPage = ({ pageOptions }) => {
    const { classroomId } = useParams();
    const [searchParams] = useSearchParams();
    const classroomName = searchParams.get('classroomName') || '';

    const [openModal, setOpenModal] = useState(false);

    const { execute: executeChangeState } = useFetch(apiConfig.classroomStudent.changeState, { immediate: false });
    const { execute: executeRegister, loading: submitting } = useFetch(apiConfig.classroomStudent.registerByStudent, { immediate: false });

    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.classroomStudent,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: pageOptions.objectName,
        },
        override: (funcs) => {
            const originPrepareGetListParams = funcs.prepareGetListParams;
            funcs.prepareGetListParams = (filter) => ({
                ...originPrepareGetListParams(filter),
                classroomId: classroomId,
                classroomName: classroomName,
            });

            const originChangeFilter = funcs.changeFilter;
            funcs.changeFilter = (filter) => {
                originChangeFilter({
                    ...filter,
                    ...(classroomName ? { classroomName } : {}),
                });
            };

            funcs.mappingData = (response) => {
                if (response.result === true) {
                    return {
                        data: response.data.content,
                        total: response.data.totalElements,
                    };
                }
            };
        },
    });

    // Xử lý đổi trạng thái (Duyệt / Từ chối)
    const handleStateChange = (id, state, actionTitle) => {
        Modal.confirm({
            title: `Bạn có chắc chắn muốn ${actionTitle} học viên này không?`,
            okText: 'Có',
            cancelText: 'Không',
            centered: true,
            onOk: () => {
                executeChangeState({
                    data: { id, state },
                    onCompleted: () => {
                        showSuccessMessage(`${actionTitle.charAt(0).toUpperCase() + actionTitle.slice(1)} học viên thành công`);
                        mixinFuncs.getList();
                    },
                    onError: (err) => {
                        showErrorMessage(err?.message || `${actionTitle} thất bại`);
                    },
                });
            },
        });
    };

    // Xử lý thêm học viên từ Modal
    const handleAddStudent = (values) => {
        executeRegister({
            data: {
                classroomId: classroomId,
                studentId: values.studentId,
            },
            onCompleted: () => {
                showSuccessMessage('Thêm học viên thành công');
                setOpenModal(false);
                mixinFuncs.getList();
            },
            onError: (err) => {
                showErrorMessage(err?.message || 'Thêm học viên thất bại');
            },
        });
    };

    const columns = [
        {
            title: '#',
            align: 'center',
            width: 60,
            render: (text, record, index) => {
                const { current = 1, pageSize = 20 } = pagination;
                return (current - 1) * pageSize + index + 1;
            },
        },
        {
            title: 'Họ và tên',
            dataIndex: ['student', 'account', 'fullName'],
        },
        {
            title: 'Email',
            dataIndex: ['student', 'account', 'email'],
            width: 240,
        },
        {
            title: 'Điện thoại',
            dataIndex: ['student', 'account', 'phone'],
            width: 180,
        },
        {
            title: 'Ngày đăng ký',
            dataIndex: 'dateRegistration',
            width: 160,
            align: 'center',
            render: (date) => (date ? formatDateString(date, 'DD/MM/YYYY') : '-'),
        },
        {
            title: 'Tình trạng',
            dataIndex: 'state',
            align: 'center',
            width: 120,
            render: (state) => {
                const stateItem = classroomStudentStateOptions.find((item) => item.value === state);
                return (
                    <Tag
                        color={stateItem?.color || 'default'}
                        style={{
                            width: 75,
                            textAlign: 'center',
                            margin: 0,
                        }}
                    >
                        {stateItem?.label || 'Chưa xác định'}
                    </Tag>
                );
            },
        },
        {
            title: 'Hành động',
            align: 'center',
            width: 140,
            render: (text, record) => {
                const isPending = record.state === CLASSROOM_STUDENT_STATE_PENDING;

                // Slot 1: Nút Duyệt (✓ màu xanh)
                const slot1 = isPending ? (
                    <Tooltip title="Duyệt">
                        <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() => handleStateChange(record.id, CLASSROOM_STUDENT_STATE_APPROVE, 'duyệt')}
                        >
                            <CheckOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                        </Button>
                    </Tooltip>
                ) : null;

                // Slot 2: Nút Từ chối (✕ màu xanh)
                const slot2 = isPending ? (
                    <Tooltip title="Từ chối">
                        <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() => handleStateChange(record.id, CLASSROOM_STUDENT_STATE_REJECT, 'từ chối')}
                        >
                            <CloseOutlined style={{ color: '#1890ff', fontSize: 16 }} />
                        </Button>
                    </Tooltip>
                ) : null;

                // Slot 3: Nút Xóa (🗑 màu đỏ)
                const slot3 = (
                    <Tooltip title="Xóa">
                        <Button
                            type="link"
                            style={{ padding: 0 }}
                            onClick={() => mixinFuncs.showDeleteItemConfirm(record.id)}
                        >
                            <DeleteOutlined style={{ color: '#ff4d4f', fontSize: 16 }} />
                        </Button>
                    </Tooltip>
                );

                return (
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                        {/* Slot 1: Duyệt */}
                        <span style={{ width: 18, display: 'inline-flex', justifyContent: 'center' }}>
                            {slot1}
                        </span>

                        {/* Slot 2: Từ chối */}
                        <span style={{ width: 18, display: 'inline-flex', justifyContent: 'center' }}>
                            {slot2}
                        </span>

                        {/* Slot 3: Xóa */}
                        <span style={{ width: 18, display: 'inline-flex', justifyContent: 'center' }}>
                            {slot3}
                        </span>
                    </div>
                );
            },
        },

    ];

    const searchFields = [
        {
            key: 'state',
            placeholder: 'Tình trạng',
            type: FieldTypes.SELECT,
            options: classroomStudentStateOptions,
            submitOnChanged: true,
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs(classroomName)}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ fields: searchFields, initialValues: queryFilter })}
                actionBar={
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>
                        Thêm học viên
                    </Button>
                }
                baseTable={
                    <BaseTable
                        onChange={mixinFuncs.changePagination}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record.id}
                        pagination={pagination}
                    />
                }
            />

            <ClassroomStudentModal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onSubmit={handleAddStudent}
                loading={submitting}
                classroomId={classroomId}
            />
        </PageWrapper>
    );
};

export default ClassroomStudentListPage;
