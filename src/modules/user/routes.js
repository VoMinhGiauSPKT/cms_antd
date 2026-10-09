import apiConfig from '@constants/apiConfig';
import { commonMessage } from '@locales/intl';
import UserAdminListPage from '.';
import UserAdminSavePage from './UserAdminSavePage';
const paths = {
    adminsListPage: '/admins',
    adminsSavePage: '/admins/:id',
    adminsLeaderListPage: '/admins-leader',
    adminsLeaderSavePage: '/admins-leader/:id',
    userListPage: '/users',
    userSavePage: '/users/:id',
    addressListPage: '/user/address',
    addressSavePage: '/user/address/:id',
};
export default {
    // /// USERS

    // userListPage: {
    //     path: paths.userListPage,
    //     auth: true,
    //     component: UserAdminListPage,
    //     permission: [apiConfig.account.getList.permissionCode],
    //     pageOptions: {
    //         objectName: commonMessage.users,
    //         renderBreadcrumbs: (messages, t, title, options = {}) => {
    //             return [{ breadcrumbName: t.formatMessage(messages.user) }];
    //         },
    //     },
    // },
    // userSavePage: {
    //     path: paths.userSavePage,
    //     component: UserAdminSavePage,
    //     separateCheck: true,
    //     auth: true,
    //     // permission: [apiConfig.account.createAdmin.permissionCode, apiConfig.account.updateAdmin.permissionCode],
    //     pageOptions: {
    //         objectName: commonMessage.user,
    //         listPageUrl: paths.userListPage,
    //         renderBreadcrumbs: (messages, t, title, options = {}) => {
    //             return [
    //                 { breadcrumbName: t.formatMessage(messages.users), path: paths.userListPage },
    //                 { breadcrumbName: title },
    //             ];
    //         },
    //     },
    // },

    // admin
    adminListPage: {
        path: paths.adminsListPage,
        auth: true,
        component: UserAdminListPage,
        permission: [apiConfig.account.getList.permissionCode],
        pageOptions: {
            kind: 1,
            objectName: commonMessage.admins,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: t.formatMessage(messages.admins) }];
            },
        },
    },

    adminSavePage: {
        path: paths.adminsSavePage,
        component: UserAdminSavePage,
        auth: true,
        pageOptions: {
            objectName: commonMessage.admins,
            listPageUrl: paths.adminsListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: t.formatMessage(messages.admins), path: paths.adminsListPage },
                    { breadcrumbName: title }
                ];
            }
        }
    }
};
