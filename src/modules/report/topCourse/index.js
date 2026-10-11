import React, { useEffect, useState } from 'react';
import { Card, Tooltip } from 'antd';
import { FileExcelOutlined, BookOutlined } from '@ant-design/icons';
import BaseTable from '@components/common/table/BaseTable';
import PageWrapper from '@components/common/layout/PageWrapper';
import AvatarField from '@components/common/form/AvatarField';
import useFetch from '@hooks/useFetch';
import apiConfig from '@constants/apiConfig';
import { AppConstants } from '@constants';
import { showErrorMessage } from '@services/notifyService';
import TextClamp from '@components/common/form/TextClamp';
import { exportExcelFile } from '@utils/fileHelper';

const TopCoursePage = ({ pageOptions }) => {
    const [dataSource, setDataSource] = useState([]);
    const [exporting, setExporting] = useState(false);
    const { execute: executeGetTopCourse, loading } = useFetch(apiConfig.report.topCourse, { immediate: false });

    useEffect(() => {
        executeGetTopCourse({
            onCompleted: (res) => {
                const list = Array.isArray(res?.data) ? res.data : (res?.data?.content || []);
                setDataSource(list);
            },
            onError: (err) => {
                showErrorMessage(err?.message || 'Không thể tải báo cáo top khóa học');
            },
        });
    }, []);

    const handleExportExcel = async () => {
        setExporting(true);
        await exportExcelFile({
            url: apiConfig.report.exportExcelTopCourse.baseURL,
            fileName: `top_khoa_hoc_${Date.now()}.xlsx`,
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
            title: 'Avatar',
            width: 80,
            align: 'center',
            render: (text, record) => {
                const avatar = record?.avatar
                return (
                    <AvatarField
                        size="large"
                        icon={<BookOutlined />}
                        src={avatar ? `${AppConstants.avatarRootUrl}${avatar}` : null}
                    />
                );
            },
        },
        {
            title: 'Tên khóa học',
            width: 1000,
            render: (text, record) => {
                return (
                    <Tooltip title={name}>
                        <TextClamp lineClamp={2}>
                            {record?.name}
                        </TextClamp>
                    </Tooltip>
                );
            },
        },
        {
            title: 'Số học viên',
            align: 'right',
            width: 200,
            render: (text, record) => record?.totalStudents
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

export default TopCoursePage;
