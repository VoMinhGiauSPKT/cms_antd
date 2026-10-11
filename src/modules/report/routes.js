import apiConfig from '@constants/apiConfig';
import TopStudentPage from './topStudent';
import TopCoursePage from './topCourse';

const paths = {
    topStudentPage: '/report/top-student',
    topCoursePage: '/report/top-course',
};

export default {
    topStudentPage: {
        path: paths.topStudentPage,
        auth: true,
        component: TopStudentPage,
        permission: [apiConfig.report.topStudent.permissionCode],
        pageOptions: {
            objectName: 'Top học viên',
            renderBreadcrumbs: () => [
                { breadcrumbName: 'Báo cáo' },
                { breadcrumbName: 'Top học viên' },
            ],
        },
    },
    topCoursePage: {
        path: paths.topCoursePage,
        auth: true,
        component: TopCoursePage,
        permission: [apiConfig.report.topCourse.permissionCode],
        pageOptions: {
            objectName: 'Top khóa học',
            renderBreadcrumbs: () => [
                { breadcrumbName: 'Báo cáo' },
                { breadcrumbName: 'Top khóa học' },
            ],
        },
    },
};
