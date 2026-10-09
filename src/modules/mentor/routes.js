import apiConfig from "@constants/apiConfig";
import MentorListPage from ".";
import MentorSavePage from "./MentorSavePage";

const paths = {
    mentorListPage: "/mentors",
    mentorSavePage: "/mentors/:id",
};

export default {
    mentorListPage: {
        path: paths.mentorListPage,
        auth: true,
        component: MentorListPage,
        permission: [apiConfig.mentor.getList.permissionCode],
        pageOptions: {
            objectName: "Mentor",
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [{ breadcrumbName: "Mentor" }];
            },
        },
    },

    mentorSavePage: {
        path: paths.mentorSavePage,
        auth: true,
        component: MentorSavePage,
        permission: [apiConfig.mentor.create.permissionCode, apiConfig.mentor.update.permissionCode],
        pageOptions: {
            objectName: "Mentor",
            listPageUrl: paths.mentorListPage,
            renderBreadcrumbs: (messages, t, title, options = {}) => {
                return [
                    { breadcrumbName: "Mentor", path: paths.mentorListPage },
                    { breadcrumbName: title }
                ];
            }
        }
    },
}