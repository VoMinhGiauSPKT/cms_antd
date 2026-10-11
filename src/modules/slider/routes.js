import apiConfig from '@constants/apiConfig';
import SliderListPage from '.';
import SliderSavePage from './SliderSavePage';

const paths = {
    sliderListPage: '/sliders',
    sliderSavePage: '/sliders/:id',
};

export default {
    sliderListPage: {
        path: paths.sliderListPage,
        auth: true,
        component: SliderListPage,
        permission: [apiConfig.slider.getList.permissionCode],
        pageOptions: {
            objectName: 'Slider',
            renderBreadcrumbs: () => {
                return [{ breadcrumbName: 'Slider' }];
            },
        },
    },

    sliderSavePage: {
        path: paths.sliderSavePage,
        auth: true,
        component: SliderSavePage,
        permission: [apiConfig.slider.create.permissionCode, apiConfig.slider.update.permissionCode],
        pageOptions: {
            objectName: 'Slider',
            listPageUrl: paths.sliderListPage,
            renderBreadcrumbs: (messages, t, title) => {
                return [
                    { breadcrumbName: 'Slider', path: paths.sliderListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },
};
