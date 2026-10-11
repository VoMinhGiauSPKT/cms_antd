import apiConfig from "@constants/apiConfig";
import CourseListPage from ".";
import CourseSavePage from "./CourseSavePage";
import SyllabusListPage from "./syllabus";

const paths = {
    courseListPage: "/courses",
    courseSavePage: "/courses/:id",
    syllabusListPage: "/courses/:courseId/syllabus",
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
            renderBreadcrumbs: (commonMessage, translate, title) => {
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
            renderBreadcrumbs: (commonMessage, translate, title) => {
                return [
                    { breadcrumbName: "Khóa học", path: paths.courseListPage },
                    { breadcrumbName: title }
                ];
            }
        }
    },

    syllabusListPage: {
        path: paths.syllabusListPage,
        component: SyllabusListPage,
        auth: true,
        pageOptions: {
            objectName: "Giáo trình",
            listPageUrl: paths.courseListPage,
            renderBreadcrumbs: (commonMessage, translate, title) => {
                return [
                    { breadcrumbName: "Khóa học", path: paths.courseListPage },
                    { breadcrumbName: "Giáo trình" },
                ];
            }
        }
    }
}