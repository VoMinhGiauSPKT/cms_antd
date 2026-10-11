import React, { useEffect, useState } from 'react';
import { Card, Tooltip } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import BaseTable from '@components/common/table/BaseTable';
import PageWrapper from '@components/common/layout/PageWrapper';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { showErrorMessage } from '@services/notifyService';
import { exportExcelFile } from '@utils/fileHelper';


const TopStudentPage = ({ pageOptions }) => {
    const [dataSource, setDataSource] = useState([]);
    const [exporting, setExporting] = useState(false);
    const { execute: executeGetTopStudent, loading } = useFetch(apiConfig.report.topStudent, { immediate: false });

    useEffect(() => {
        executeGetTopStudent({
            onCompleted: (res) => {
                const list = Array.isArray(res?.data) ? res.data : (res?.data?.content || []);
                setDataSource(list);
            },
            onError: (err) => {
                showErrorMessage(err?.message || 'Không thể tải báo cáo top học viên');
            },
        });
    }, []);

    const handleExportExcel = async () => {
        setExporting(true);
        await exportExcelFile({
            url: apiConfig.report.exportExcelTopStudent.baseURL,
            fileName: `top_hoc_vien_${Date.now()}.xlsx`,
        });
        setExporting(false);
    };

    const columns = [
        {
            title: '#',
            width: 60,
            align: 'center',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Học viên',
            render: (text, record) => record?.fullName
        },
        {
            title: 'Email',
            render: (text, record) => record?.email
        },
        {
            title: 'Số lớp đã đăng ký',
            align: 'right',
            width: 200,
            render: (text, record) => record?.totalEnrolledClasses
        },
    ];

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs()}>
            <Card bordered={false} style={{ borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                    <Tooltip title="Xuất Excel">
                        <FileExcelOutlined
                            style={{
                                color: '#52c41a',
                                fontSize: 24,
                                cursor: exporting ? 'not-allowed' : 'pointer',
                            }}
                            onClick={exporting ? undefined : handleExportExcel}
                        />
                    </Tooltip>
                </div>

                <BaseTable
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    pagination={false}
                    rowKey={(record, index) => record?.id || index}
                />
            </Card>
        </PageWrapper>
    );
};

export default TopStudentPage;
