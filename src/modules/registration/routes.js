import apiConfig from '@constants/apiConfig';
import RegistrationListPage from '.';
import RegistrationSavePage from './RegistrationSavePage';

const paths = {
    registrationListPage: '/registrations',
    registrationSavePage: '/registrations/:id',
};

export default {
    registrationListPage: {
        path: paths.registrationListPage,
        auth: true,
        component: RegistrationListPage,
        permission: [apiConfig.registration.getList.permissionCode],
        pageOptions: {
            objectName: 'Đăng ký',
            renderBreadcrumbs: () => [{ breadcrumbName: 'Đăng ký' }],
        },
    },
    registrationSavePage: {
        path: paths.registrationSavePage,
        auth: true,
        component: RegistrationSavePage,
        permission: [apiConfig.registration.getList.permissionCode],
        pageOptions: {
            objectName: 'Đăng ký',
            listPageUrl: paths.registrationListPage,
            renderBreadcrumbs: (commonMessage, translate, title) => [
                { breadcrumbName: 'Đăng ký', path: paths.registrationListPage },
                { breadcrumbName: title },
            ],
        },
    },
};
