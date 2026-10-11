import apiConfig from '@constants/apiConfig';
import TagListPage from '.';

const paths = {
    tagListPage: '/tags',
};

export default {
    tagListPage: {
        path: paths.tagListPage,
        auth: true,
        component: TagListPage,
        permission: [apiConfig.tag.getList.permissionCode],
        pageOptions: {
            objectName: 'Thẻ',
            renderBreadcrumbs: () => {
                return [{ breadcrumbName: 'Thẻ' }];
            },
        },
    },
};
