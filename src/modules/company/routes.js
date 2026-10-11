import apiConfig from '@constants/apiConfig';
import CompanyListPage from '.';
import CompanySavePage from './CompanySavePage';

const paths = {
    companyListPage: '/company',
    companySavePage: '/company/:id',
};

export default {
    companyListPage: {
        path: paths.companyListPage,
        auth: true,
        component: CompanyListPage,
        permission: [apiConfig.company.getList.permissionCode],
        pageOptions: {
            objectName: 'Công ty',
            renderBreadcrumbs: () => {
                return [{ breadcrumbName: 'Công ty' }];
            },
        },
    },

    companySavePage: {
        path: paths.companySavePage,
        auth: true,
        component: CompanySavePage,
        permission: [apiConfig.company.create.permissionCode, apiConfig.company.update.permissionCode],
        pageOptions: {
            objectName: 'Công ty',
            listPageUrl: paths.companyListPage,
            renderBreadcrumbs: (messages, t, title) => {
                return [
                    { breadcrumbName: 'Công ty', path: paths.companyListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
