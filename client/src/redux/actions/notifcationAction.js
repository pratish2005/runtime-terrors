import apiCall from "../../utils/apiCall";

export const GET_NOTIFICATION_REQUEST = "GET_NOTIFICATION_REQUEST";
export const GET_NOTIFICATION_SUCCESS = "GET_NOTIFICATION_SUCCESS";
export const GET_NOTIFICATION_FAILURE = "GET_NOTIFICATION_FAILURE";

export const GET_HEADER_NOTIFICATION_REQUEST =
    "GET_HEADER_NOTIFICATION_REQUEST";
export const GET_HEADER_NOTIFICATION_SUCCESS =
    "GET_HEADER_NOTIFICATION_SUCCESS";

export const MARK_NOTIFICATION_REQUEST = "MARK_NOTIFICATION_REQUEST";
export const MARK_NOTIFICATION_SUCCESS = "MARK_NOTIFICATION_SUCCESS";
export const MARK_NOTIFICATION_FAILURE = "MARK_NOTIFICATION_FAILURE";

export const getNotifications = (data, context, successCallback) => {
    return async (dispatch) => {
        const url = `notifications`;

        const actionTypes = {
            FAILURE: GET_NOTIFICATION_FAILURE,
        };
        if (context === "header") {
            actionTypes.REQUEST = GET_HEADER_NOTIFICATION_REQUEST;
            actionTypes.SUCCESS = GET_HEADER_NOTIFICATION_SUCCESS;
        } else {
            actionTypes.REQUEST = GET_NOTIFICATION_REQUEST;
            actionTypes.SUCCESS = GET_NOTIFICATION_SUCCESS;
        }
        const token = localStorage.getItem("access_token");
        const headers = {
            headers: {
                Authorization: `${token}`,
            },
        };

        await apiCall(
            dispatch,
            "POST",
            url,
            data,
            actionTypes,
            successCallback,
            headers
        );
    };
};

export const markNotification = (data, notification_id, successCallback) => {
    return async (dispatch) => {
        const url = `notifications/${notification_id}/mark_read_unread`;
        const actionTypes = {
            REQUEST: MARK_NOTIFICATION_REQUEST,
            SUCCESS: MARK_NOTIFICATION_SUCCESS,
            FAILURE: MARK_NOTIFICATION_FAILURE,
        };

        const token = localStorage.getItem("access_token");
        const headers = {
            headers: {
                Authorization: `${token}`,
            },
        };

        await apiCall(
            dispatch,
            "POST",
            url,
            data,
            actionTypes,
            successCallback,
            headers
        );
    };
};
