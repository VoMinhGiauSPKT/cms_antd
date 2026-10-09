import apiConfig from "@constants/apiConfig";
import StudentListPage from ".";
import StudentSavePage from './StudentSavePage';


const paths = {
    studentListPage: "/students",
    studentSavePage: "/students/:id",
}

export default {
    studentListPage: {
        path: paths.studentListPage,
        auth: true,
        component: StudentListPage,
        permission: [apiConfig.student.getList.permissionCode],
        pageOptions: {
            objectName: 'Học Viên',
            renderBreadcrumbs: () => {
                return [{ breadcrumbName: "Học viên" }]
            }
        }
    },

    studentSavePage: {
        path: paths.studentSavePage,
        auth: true,
        component: StudentSavePage,
        pageOptions: {
            objectName: 'Học Viên',
            listPageUrl: paths.studentListPage,
            renderBreadcrumbs: (messages, t, title) => {
                return [
                    { breadcrumbName: 'Học viên', path: paths.studentListPage },
                    { breadcrumbName: title },
                ];
            },
        }
    }
}