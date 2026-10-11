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
        autoComplete: {
            baseURL: `${apiUrl}v1/student/auto-complete`,
            method: "GET",
            headers: baseHeader,
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
    },
    syllabus: {
        getList: {
            baseURL: `${apiUrl}v1/syllabus/list`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "SYL_L",
        },
        getById: {
            baseURL: `${apiUrl}v1/syllabus/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: "SYL_V",
        },
        create: {
            baseURL: `${apiUrl}v1/syllabus/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: "SYL_C",
        },
        update: {
            baseURL: `${apiUrl}v1/syllabus/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: "SYL_U",
        },
        delete: {
            baseURL: `${apiUrl}v1/syllabus/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: "SYL_D",
        },
        updateOrdering: {
            baseURL: `${apiUrl}v1/syllabus/update-ordering`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: "SYL_U",
        },
    },

    classRoom: {
        getList: {
            baseURL: `${apiUrl}v1/class-room/list`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "CLR_L",
        },
        getById: {
            baseURL: `${apiUrl}v1/class-room/get/:id`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "CLR_V",
        },
        create: {
            baseURL: `${apiUrl}v1/class-room/create`,
            method: "POST",
            headers: baseHeader,
            permissionCode: "CLR_C",
        },
        update: {
            baseURL: `${apiUrl}v1/class-room/update`,
            method: "PUT",
            headers: baseHeader,
            permissionCode: "CLR_U",
        },
        delete: {
            baseURL: `${apiUrl}v1/class-room/delete/:id`,
            method: "DELETE",
            headers: baseHeader,
            permissionCode: "CLR_D",
        },
        changeState: {
            baseURL: `${apiUrl}v1/class-room/change-state`,
            method: "PUT",
            headers: baseHeader,
            permissionCode: "CLR_U",
        },
    },

    classroomStudent: {
        getList: {
            baseURL: `${apiUrl}v1/classroom-student/list`,
            method: "GET",
            headers: baseHeader,
            permissionCode: "CLS_L",
        },
        registerFromRegistration: {
            baseURL: `${apiUrl}v1/classroom-student/register-from-registration`,
            method: "POST",
            headers: baseHeader,
            permissionCode: "CLS_C",
        },
        registerByStudent: {
            baseURL: `${apiUrl}v1/classroom-student/register-by-student`,
            method: "POST",
            headers: baseHeader,
            permissionCode: "CLS_C",
        },
        changeState: {
            baseURL: `${apiUrl}v1/classroom-student/change-state`,
            method: "PUT",
            headers: baseHeader,
            permissionCode: "CLS_U",
        },
        delete: {
            baseURL: `${apiUrl}v1/classroom-student/delete/:id`,
            method: "DELETE",
            headers: baseHeader,
            permissionCode: "CLS_D",
        },
    },
    rating: {
        getList: {
            baseURL: `${apiUrl}v1/rating/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'RAT_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/rating/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'RAT_V',
        },
        create: {
            baseURL: `${apiUrl}v1/rating/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'RAT_C',
        },
        update: {
            baseURL: `${apiUrl}v1/rating/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'RAT_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/rating/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'RAT_D',
        },
    },
    registration: {
        getList: {
            baseURL: `${apiUrl}v1/registration/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'REG_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/registration/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'REG_V',
        },
        delete: {
            baseURL: `${apiUrl}v1/registration/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'REG_D',
        },
        create: {
            baseURL: `${apiUrl}v1/registration/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'REG_L',
        },

    },

    report: {
        topStudent: {
            baseURL: `${apiUrl}v1/report/top-student`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'RPT_L',
        },
        topCourse: {
            baseURL: `${apiUrl}v1/report/top-course`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'RPT_L',
        },
        exportExcelTopStudent: {
            baseURL: `${apiUrl}v1/report/export-excel-top-student`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'RPT_L',
        },
        exportExcelTopCourse: {
            baseURL: `${apiUrl}v1/report/export-excel-top-course`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'RPT_L',
        },
    },

    company: {
        getList: {
            baseURL: `${apiUrl}v1/company/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'COM_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/company/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'COM_V',
        },
        create: {
            baseURL: `${apiUrl}v1/company/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'COM_C',
        },
        update: {
            baseURL: `${apiUrl}v1/company/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'COM_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/company/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'COM_D',
        },
    },
    tag: {
        getList: {
            baseURL: `${apiUrl}v1/tags/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'TAG_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/tags/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'TAG_V',
        },
        create: {
            baseURL: `${apiUrl}v1/tags/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'TAG_C',
        },
        update: {
            baseURL: `${apiUrl}v1/tags/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'TAG_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/tags/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'TAG_D',
        },
    },
    slider: {
        getList: {
            baseURL: `${apiUrl}v1/category/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CAT_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/category/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CAT_V',
        },
        create: {
            baseURL: `${apiUrl}v1/category/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'CAT_C',
        },
        update: {
            baseURL: `${apiUrl}v1/category/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'CAT_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/category/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'CAT_D',
        },
        updateOrdering: {
            baseURL: `${apiUrl}v1/category/update-ordering`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'CAT_U',
        },
    },
    device: {
        getList: {
            baseURL: `${apiUrl}v1/category/list`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CAT_L',
        },
        getById: {
            baseURL: `${apiUrl}v1/category/get/:id`,
            method: 'GET',
            headers: baseHeader,
            permissionCode: 'CAT_V',
        },
        create: {
            baseURL: `${apiUrl}v1/category/create`,
            method: 'POST',
            headers: baseHeader,
            permissionCode: 'CAT_C',
        },
        update: {
            baseURL: `${apiUrl}v1/category/update`,
            method: 'PUT',
            headers: baseHeader,
            permissionCode: 'CAT_U',
        },
        delete: {
            baseURL: `${apiUrl}v1/category/delete/:id`,
            method: 'DELETE',
            headers: baseHeader,
            permissionCode: 'CAT_D',
        },
    },

};

export default apiConfig;
