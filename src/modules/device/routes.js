import apiConfig from '@constants/apiConfig';
import DeviceListPage from '.';
import DeviceSavePage from './DeviceSavePage';
import BrandListPage from './brand';
import BrandSavePage from './brand/BrandSavePage';

const paths = {
    deviceListPage: '/device',
    deviceSavePage: '/device/:id',
    brandListPage: '/device/:deviceId/brand',
    brandSavePage: '/device/:deviceId/brand/:id',
};

export default {
    deviceListPage: {
        path: paths.deviceListPage,
        auth: true,
        component: DeviceListPage,
        permission: [apiConfig.device.getList.permissionCode],
        pageOptions: {
            objectName: 'Thiết bị',
            renderBreadcrumbs: () => {
                return [{ breadcrumbName: 'Thiết bị' }];
            },
        },
    },

    deviceSavePage: {
        path: paths.deviceSavePage,
        auth: true,
        component: DeviceSavePage,
        permission: [apiConfig.device.create.permissionCode, apiConfig.device.update.permissionCode],
        pageOptions: {
            objectName: 'Thiết bị',
            listPageUrl: paths.deviceListPage,
            renderBreadcrumbs: (messages, t, title) => {
                return [
                    { breadcrumbName: 'Thiết bị', path: paths.deviceListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },

    brandListPage: {
        path: paths.brandListPage,
        auth: true,
        component: BrandListPage,
        permission: [apiConfig.device.getList.permissionCode],
        pageOptions: {
            objectName: 'Thương hiệu',
            renderBreadcrumbs: (deviceName) => [
                { breadcrumbName: 'Thiết bị', path: paths.deviceListPage },
                { breadcrumbName: deviceName || 'Thương hiệu' },
            ],
        },
    },

    brandSavePage: {
        path: paths.brandSavePage,
        auth: true,
        component: BrandSavePage,
        permission: [apiConfig.device.create.permissionCode, apiConfig.device.update.permissionCode],
        pageOptions: {
            objectName: 'Thương hiệu',
            renderBreadcrumbs: (deviceName, listUrl, title) => [
                { breadcrumbName: 'Thiết bị', path: paths.deviceListPage },
                { breadcrumbName: deviceName || 'Thương hiệu', path: listUrl },
                { breadcrumbName: title },
            ],
        },
    },

};
