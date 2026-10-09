import { UsergroupAddOutlined, BookOutlined } from '@ant-design/icons';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import apiConfig from './apiConfig';

export const navMenuConfig = [
    {
        label: <FormattedMessage defaultMessage="Quản lý người dùng" />,
        key: 'user-management',
        icon: <UsergroupAddOutlined />,
        // permission: [
        //     apiConfig.account.getList.permissionCode,
        // ],
        children: [
            // {
            //     label: <FormattedMessage defaultMessage="Học viên" />,
            //     key: 'hoc-vien',
            //     path: '/users',
            //     permission: [apiConfig.account.getList.permissionCode],
            // },
            {
                label: <FormattedMessage defaultMessage="Học viên" />,
                key: 'hoc-vien',
                path: '/students',
                permission: [apiConfig.student.getList.permissionCode],
            },
            {
                label: <FormattedMessage defaultMessage="Quản trị viên" />,
                key: "quan-tri-vien",
                path: '/admins',
                permission: [apiConfig.account.getList.permissionCode]
            },
            {
                label: <FormattedMessage defaultMessage="Mentor" />,
                key: "mentor",
                path: '/mentors',
                permission: [apiConfig.account.getList.permissionCode]
            }
        ],
    },
    {
        label: <FormattedMessage defaultMessage="Quản lý khóa học" />,
        key: 'course-management',
        icon: <BookOutlined />,
        // permission: [
        //     apiConfig.mentor.getList.permissionCode,
        // ],
        children: [
            {
                label: <FormattedMessage defaultMessage="Khóa học" />,
                key: 'khoa-hoc',
                path: '/courses',
                permission: [apiConfig.course.getList.permissionCode],
            },
            // {
            //     label: <FormattedMessage defaultMessage="Lớp học" />,
            //     key: "lop-hoc",
            //     path: '/classes',
            //     permission: [apiConfig.course.getList.permissionCode]
            // },
            // {
            //     label: <FormattedMessage defaultMessage="Đánh giá" />,
            //     key: "danh-gia",
            //     path: '/reviews',
            //     permission: [apiConfig.course.getList.permissionCode]
            // },
            // {
            //     label: <FormattedMessage defaultMessage="Đăng ký" />,
            //     key: "dang-ky",
            //     path: '/registrations',
            //     permission: [apiConfig.course.getList.permissionCode]
            // }
        ],
    }
    // {
    //     label: <FormattedMessage defaultMessage="Quản lý hệ thống" />,
    //     key: 'system-management',
    //     icon: <SettingOutlined />,
    //     permission: [apiConfig.settings.getList.permissionCode, apiConfig.groupPermission.getGroupList.permissionCode],
    //     children: [
    //         !getData(storageKeys.LOGIN_SSO) && {
    //             label: <FormattedMessage defaultMessage="Quyền" />,
    //             key: 'group-permission',
    //             path: '/group-permission',
    //             permission: [apiConfig.groupPermission.getGroupList.permissionCode],
    //             isSuperAdmin: true,
    //         },
    //         {
    //             label: <FormattedMessage defaultMessage="Cài đặt" />,
    //             key: 'settings',
    //             path: '/settings',
    //             permission: [apiConfig.settings.getList.permissionCode],
    //         },
    //     ].filter(Boolean),
    // },
];

