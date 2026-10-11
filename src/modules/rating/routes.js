import RatingListPage from '.';
import apiConfig from '@constants/apiConfig';


const paths = {
    ratingListPage: '/reviews',
};

export default {
    ratingListPage: {
        path: paths.ratingListPage,
        auth: true,
        component: RatingListPage,
        permission: [apiConfig.rating.getList.permissionCode],
        pageOptions: {
            objectName: 'Đánh giá',
            renderBreadcrumbs: () => [{ breadcrumbName: 'Đánh giá' }],
        },
    },
};
