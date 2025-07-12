import { generatePath } from "react-router-dom";

export const routes = {
    landing_page: "/",
    dashboard: "/search",
    login: "/login",
    verify_mail: "/verify-email",
    register: "/register",
    profile: "/profile",
    user_profile: "/profile/:user_id",
    messages: "/messages/:room_id?",
    sessions: "/sessions",
    notifications: "/notifications",
};

const generateUrl = (routeName, params = {}) => {
    if (!routes[routeName]) {
        throw new Error(`Route not found: ${routeName}`);
    }

    return generatePath(routes[routeName], params);
};

export default generateUrl;
