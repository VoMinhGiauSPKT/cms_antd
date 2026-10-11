import apiConfig from "@constants/apiConfig";
import ClassListPage from ".";
import ClassSavePage from "./ClassSavePage";
import ClassroomStudentListPage from "./student";


const paths = {
    classListPage: "/classes",
    classSavePage: "/classes/:id",
    classroomStudentListPage: "/classes/:classroomId/student",
};

export default {
    classListPage: {
        path: paths.classListPage,
        auth: true,
        component: ClassListPage,
        permission: [apiConfig.classRoom.getList.permissionCode],
        pageOptions: {
            objectName: "Lớp học",
            renderBreadcrumbs: () => {
                return [{ breadcrumbName: "Lớp học" }];
            },
        },
    },

    classSavePage: {
        path: paths.classSavePage,
        auth: true,
        component: ClassSavePage,
        permission: [
            apiConfig.classRoom.create.permissionCode,
            apiConfig.classRoom.update.permissionCode,
        ],
        separateCheck: true,
        pageOptions: {
            objectName: "Lớp học",
            listPageUrl: paths.classListPage,
            renderBreadcrumbs: (messages, t, title) => {
                return [
                    { breadcrumbName: "Lớp học", path: paths.classListPage },
                    { breadcrumbName: title },
                ];
            },
        },
    },

    classroomStudentListPage: {
        path: paths.classroomStudentListPage,
        auth: true,
        component: ClassroomStudentListPage,
        permission: [apiConfig.classroomStudent.getList.permissionCode],
        pageOptions: {
            objectName: "Học viên",
            renderBreadcrumbs: (classroomName) => {
                return [
                    { breadcrumbName: "Lớp học", path: paths.classListPage },
                    { breadcrumbName: classroomName || "Học viên" },
                ];
            },
        },
    },



};
