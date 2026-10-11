import PageNotFound from '@components/common/page/PageNotFound';
import PageNotAllowed from '@components/common/page/PageNotAllowed';
import LoginPage from '@modules/login/index';
import Dashboard from '@modules/entry';
import ProfilePage from '@modules/profile/index';
import adminsRoutes from '@modules/user/routes';
import settingRoutes from '@modules/settings/routes';
import GroupPermissionListPage from '@modules/groupPermission';
import PermissionSavePage from '@modules/groupPermission/PermissionSavePage';
import apiConfig from '@constants/apiConfig';
import studentRoutes from '@modules/student/routes';
import mentorRoutes from '@modules/mentor/routes';
import courseRoutes from '@modules/course/routes';
import classroomRoutes from '@modules/classroom/routes';
import ratingRoutes from '@modules/rating/routes';
import registrationRoutes from '@modules/registration/routes';
import reportRoutes from '@modules/report/routes';
import companyRoutes from '@modules/company/routes';
import tagRoutes from '@modules/tag/routes';
import sliderRoutes from '@modules/slider/routes';
import deviceRoutes from '@modules/device/routes';







/*
    auth
        + null: access login and not login
        + true: access login only
        + false: access not login only
*/
const routes = {
    pageNotAllowed: {
        path: '/not-allowed',
        component: PageNotAllowed,
        auth: null,
        title: 'Page not allowed',
    },
    // homePage: {
    //     path: '/',
    //     component: Dashboard,
    //     auth: false,
    //     title: 'Home',
    // },
    loginPage: {
        path: '/login',
        component: LoginPage,
        auth: false,
        title: 'Login page',
    },
    profilePage: {
        path: '/profile',
        component: ProfilePage,
        auth: true,
        title: 'Profile page',
    },
    groupPermissionPage: {
        path: '/group-permission',
        component: GroupPermissionListPage,
        auth: true,
        title: 'Profile page',
        permission: [apiConfig.groupPermission.getGroupList.permissionCode],
    },
    groupPermissionSavePage: {
        path: '/group-permission/:id',
        component: PermissionSavePage,
        auth: true,
        title: 'Profile page',
        permission: [apiConfig.groupPermission.getById.permissionCode, apiConfig.groupPermission.update.permissionCode],
    },
    ...adminsRoutes,
    ...settingRoutes,
    ...studentRoutes,
    ...mentorRoutes,
    ...courseRoutes,
    ...classroomRoutes,
    ...ratingRoutes,
    ...registrationRoutes,
    ...reportRoutes,
    ...companyRoutes,
    ...tagRoutes,
    ...sliderRoutes,
    ...deviceRoutes,
    // keep this at last
    notFound: {
        component: PageNotFound,
        auth: null,
        title: 'Page not found',
        path: '*',
    },
};

export default routes;
