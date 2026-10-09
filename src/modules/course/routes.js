import apiConfig from "@constants/apiConfig";
import CourseListPage from ".";
import CourseSavePage from "./CourseSavePage";

const paths = {
    courseListPage: "/courses",
    courseSavePage: "/courses/:id",
}

export default {
    courseListPage: {
        path: paths.courseListPage,
        auth: true,
        component: CourseListPage,
        permission: [apiConfig.course.getList.permissionCode],
        pageOptions: {
            kind: 1,
            objectName: "Khóa học",
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: "Khóa học" }];
            },
        },
    },

    courseSavePage: {
        path: paths.courseSavePage,
        component: CourseSavePage,
        auth: true,
        pageOptions: {
            objectName: "Khóa học",
            listPageUrl: paths.courseListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: "Khóa học", path: paths.courseListPage },
                    { breadcrumbName: title }
                ];
            }
        }
    }
}