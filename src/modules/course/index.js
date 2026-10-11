import React from 'react';
import BaseTable from '@components/common/table/BaseTable';
import ListPage from '@components/common/layout/ListPage';
import PageWrapper from '@components/common/layout/PageWrapper';
import AvatarField from '@components/common/form/AvatarField';
import { BookOutlined } from '@ant-design/icons';
import useTranslate from '@hooks/useTranslate';
import useListBase from '@hooks/useListBase';
import apiConfig from '@constants/apiConfig';
import { AppConstants, DEFAULT_TABLE_ITEM_SIZE } from '@constants';
import { FieldTypes } from '@constants/formConfig';
import { statusUserOptions } from '@constants/masterData';
import { formatMoneyValue } from '@utils';
import { Link } from "react-router-dom";

const CourseListPage = ({ pageOptions }) => {
    const translate = useTranslate();
    const statusValue = translate.formatKeys(statusUserOptions, ["label"]);
    const { data, mixinFuncs, queryFilter, loading, pagination } = useListBase({
        apiConfig: apiConfig.course,
        options: {
            pageSize: DEFAULT_TABLE_ITEM_SIZE,
            objectName: pageOptions.objectName
        }
    })

    const columns = [
        {
            title: "#",
            align: "center",
            width: 60,
            render: (text, record, index) => {
                const { current = 1, pageSize = 10 } = pagination;
                return (current - 1) * pageSize + index + 1;
            }
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            algin: "center",
            width: 80,
            render: (avatar) => (
                <AvatarField
                    size={"large"}
                    icon={<BookOutlined />}
                    src={avatar ? `${AppConstants.avatarRootUrl}${avatar}` : null}
                />
            )
        },
        {
            title: "Tên khóa học",
            dataIndex: "name",
            width: 800,
            render: (name, record) => (
                <Link
                    to={`/courses/${record.id}/syllabus`}
                >
                    {name}
                </Link>
            )

        },
        {
            title: "Tổng thời lượng",
            dataIndex: "totalTimeline",
            align: "right",
        },
        {
            title: "Giá",
            dataIndex: "price",
            align: "right",
            width: 140,
            render: (price) => formatMoneyValue(price),
        },
        mixinFuncs.renderStatusColumn({ width: 120 }),
        mixinFuncs.renderActionColumn(
            {
                edit: true,
                delete: true,
            },
            { width: "130px" },
        ),

    ]

    const searchFields = [
        {
            key: "name",
            placeholder: "Tên khóa học",
        },
        {
            key: "status",
            placeholder: "Trạng thái",
            type: FieldTypes.SELECT,
            options: statusValue,
            submitOnChanged: true,
        }
    ]

    return (
        <PageWrapper routes={pageOptions.renderBreadcrumbs()}>
            <ListPage
                searchForm={mixinFuncs.renderSearchForm({ field: searchFields, initialValues: queryFilter })}
                actionBar={mixinFuncs.renderActionBar()}
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

        </PageWrapper>
    )
}

export default CourseListPage;