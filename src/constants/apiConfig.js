import { AppConstants, apiUrl, apiUrlSSO } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    account: {
        checkLoginSso: {
            baseURL: `${apiUrl}sso/check-login-sso`,
            method: 'GET',
            headers: baseHeader,
        },
        loginBasic: {
            baseURL: `${apiUrlSSO}api/token`,
            method: 'POST',
            headers: baseHeader,
        },
        loginSSO: {
            baseURL: `${apiUrl}sso/login`,
            method: 'POST',
            headers: baseHeader,
        },
        tokenSSO: {
            baseURL: `${apiUrl}sso/token`,
            method: 'POST',
            headers: baseHeader,
        },
        checkToken: {
            baseURL: `${apiUrl}sso/check-token`,
            method: "GET",
            headers: baseHeader,
        },
        getProfile: {
            baseURL: `${apiUrl}v1/account/profile`,
            method: 'GET',
            headers: baseHeader,
        },
        updateProfile: {
            baseURL: `${apiUrl}v1/account/update-profile`,
            method: 'PUT',
            headers: baseHeader,
        },
        updateProfileAdmin: {
            baseURL: `${apiUrl}v1/account/update-profile-admin`,
            method: 'PUT',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}v1/account/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'ACC_V',
        },
        logout: {
            baseURL: `${apiUrl}v1/account/logout`,
            method: 'GET',
            headers: baseHeader,
        },
        getList: {
            baseURL: `${apiUrl}v1/account/list`,
            method: `GET`,
            headers: baseHeader,
            permissionCode: 'ACC_L',
        },
        createAdmin: {
            baseURL: `${apiUrl}v1/account/create_admin`,
            method: `POST`,
            headers: baseHeader,
            permissionCode: 'ACC_C_AD',
        },
        updateAdmin: {
            baseURL: `${apiUrl}v1/account/update_admin`,
            method: `PUT`,
            headers: baseHeader,
            permissionCode: 'ACC_U_AD',
        },
        delete: {
            baseURL: `${apiUrl}v1/account/delete/:id`,
            method: `DELETE`,
            headers: baseHeader,
            permissionCode: 'ACC_D',
        },
        exportExcel: {
            baseURL: `${apiUrl}v1/account/export-to-excel-key`,
            method: `GET`,
            headers: baseHeader,
        },
        getMyKey: {
            baseURL: `${apiUrl}v1/account/my-key`,
            method: `GET`,
            headers: baseHeader,
        },
        clearKey: {
            baseURL: `${apiUrl}v1/account/clear-key`,
            method: `GET`,
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/account/auto-complete`,
            method: `GET`,
            headers: baseHeader,
        },
        synchronize: {
            baseURL: `${apiUrl}v1/account/synchronize-admin`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'ACC_S',
        },
        changePassword: {
            baseURL: `${apiUrl}v1/account/change-password`,
            method: `PUT`,
            headers: baseHeader,
            // permissionCode: 'ACC_CP',
        },
    },
    file: {
        download_video_resource: {
            baseURL: `${AppConstants.mediaRootUrl}v1/file/download-video-resource`,
            method: 'GET',
            headers: multipartFormHeader,
        },
        upload_video: {
            baseURL: `${AppConstants.mediaRootUrl}v1/file/upload-video`,
            method: 'POST',
            headers: multipartFormHeader,
            permissionCode: 'FILE_U_V',
        },
        upload: {
            baseURL: `${AppConstants.mediaRootUrl}v1/file/upload`,
            method: 'POST',
            headers: multipartFormHeader,
            permissionCode: 'FILE_U',
        },
        image: {
            baseURL: `${AppConstants.mediaRootUrl}admin/v1/image/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
        video: {
            baseURL: `${AppConstants.mediaRootUrl}admin/v1/video/upload`,
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    settings: {
        getSettingsList: {
            baseURL: `${apiUrl}v1/setting/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'SET_L',
        },
        getList: {
            baseURL: `${apiUrl}v1/setting/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'SET_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/setting/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'SET_V',
        },
        create: {
            baseURL: `${apiUrl}v1/setting/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'SET_C',
        },
        update: {
            baseURL: `${apiUrl}v1/setting/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'SET_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/setting/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/setting/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
        getByKey: {
            baseURL: `${apiUrl}v1/setting/find-by-key`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'SET_V',
        },
    },
    notification: {
        getList: {
            baseURL: `${apiUrl}v1/notification/list`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        getById: {
            baseURL: `${apiUrl}v1/notification/get/:id`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        create: {
            baseURL: `${apiUrl}v1/notification/create`,
            method: 'POST',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        update: {
            baseURL: `${apiUrl}v1/notification/update`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        delete: {
            baseURL: `${apiUrl}v1/notification/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        autocomplete: {
            baseURL: `${apiUrl}v1/notification/auto-complete`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        myNotification: {
            baseURL: `${apiUrl}v1/notification/my-notification`,
            method: 'GET',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        changeState: {
            baseURL: `${apiUrl}v1/notification/read`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        readAll: {
            baseURL: `${apiUrl}v1/notification/read-all`,
            method: 'PUT',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
        deleteAll: {
            baseURL: `${apiUrl}v1/notification/delete-all`,
            method: 'DELETE',
            headers: baseHeader,
            isRequiredTenantId: true,
        },
    },
    groupPermission: {
        getGroupList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'GR_L',
        },
        getList: {
            baseURL: `${apiUrl}v1/group/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'GR_L',
        },
        getPermissionList: {
            baseURL: `${apiUrl}v1/permission/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'PER_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/group/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'GR_V',
        },
        create: {
            baseURL: `${apiUrl}v1/group/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'GR_C',
        },
        update: {
            baseURL: `${apiUrl}v1/group/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'GR_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/group/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'GR_D',
        },
        getGroupListCombobox: {
            baseURL: `${apiUrl}v1/group/list_combobox`,
            method: 'GET',
            headers: baseHeader,
        },
        autoComplete: {
            baseURL: `${apiUrl}v1/group/auto-complete`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    management: {
        reset: {
            baseURL: `${apiUrl}v1/management/reset-data`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'MAG_RES',
        },
    },
    student: {
        getList: {
            baseURL: `${apiUrl}v1/student/list`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "STU_L",
        },
        getById: {
            baseURL: `${apiUrl}v1/student/get/:id`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "STU_V",
        },
        create: {
            baseURL: `${apiUrl}v1/student/create`,
            method: "POST",
            headers: baseHeader,
            permissionCode: "STU_C",
        },
        update: {
            baseURL: `${apiUrl}v1/student/update`,
            method: "PUT",
            headers: baseHeader,
            permissionCode: "STU_U",
        },
        delete: {
            baseURL: `${apiUrl}v1/student/delete/:id`,
            method: "DELETE",
            headers: baseHeader,
            permissionCode: "STU_D",
        },
    },
    mentor: {
        getList: {
            baseURL: `${apiUrl}v1/mentor/list`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "MEN_L",
        },
        getById: {
            baseURL: `${apiUrl}v1/mentor/get/:id`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "MEN_V",
        },
        create: {
            baseURL: `${apiUrl}v1/mentor/create`,
            method: "POST",
            headers: baseHeader,
            permissionCode: "MEN_C",
        },
        update: {
            baseURL: `${apiUrl}v1/mentor/update`,
            method: "PUT",
            headers: baseHeader,
            permissionCode: "MEN_U",
        },
        delete: {
            baseURL: `${apiUrl}v1/mentor/delete/:id`,
            method: "DELETE",
            headers: baseHeader,
            permissionCode: "MEN_D",
        },
    },
    course: {
        getList: {
            baseURL: `${apiUrl}v1/course/list`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "COU_L",
        },
        getById: {
            baseURL: `${apiUrl}v1/course/get/:id`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "COU_V",
        },
        create: {
            baseURL: `${apiUrl}v1/course/create`,
            method: "POST",
            headers: baseHeader,
            permissionCode: "COU_C",
        },
        update: {
            baseURL: `${apiUrl}v1/course/update`,
            method: "PUT",
            headers: baseHeader,
            permissionCode: "COU_U",
        },
        delete: {
            baseURL: `${apiUrl}v1/course/delete/:id`,
            method: "DELETE",
            headers: baseHeader,
            permissionCode: "COR_D",
        },
        autoComplete: {
            baseURL: `${apiUrl}v1/course/auto-complete`,
            method: "GET",
            headers: baseHeader,
        }
    }
};

export default apiConfig;
