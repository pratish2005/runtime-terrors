import apiCall from "../../utils/apiCall";

export const CREATE_SESSION_REQUEST = "CREATE_SESSION_REQUEST";
export const CREATE_SESSION_SUCCESS = "CREATE_SESSION_SUCCESS";
export const CREATE_SESSION_FAILURE = "CREATE_SESSION_FAILURE";

export const UDPATE_SESSION_STATUS_REQUEST = "UDPATE_SESSION_STATUS_REQUEST";
export const UDPATE_SESSION_STATUS_SUCCESS = "UDPATE_SESSION_STATUS_SUCCESS";
export const UDPATE_SESSION_STATUS_FAILURE = "UDPATE_SESSION_STATUS_FAILURE";

export const GET_SESSION_LIST_REQUEST = "GET_SESSION_LIST_REQUEST";
export const GET_SESSION_LIST_SUCCESS = "GET_SESSION_LIST_SUCCESS";
export const GET_SESSION_LIST_FAILURE = "GET_SESSION_LIST_FAILURE";

export const ADD_REVIEW_REQUEST = "ADD_REVIEW_REQUEST";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_FAILURE = "ADD_REVIEW_FAILURE";

export const createSession = (data, successCallback) => {
    return async (dispatch) => {
        const url = `sessions/create`;
        const actionTypes = {
            REQUEST: CREATE_SESSION_REQUEST,
            SUCCESS: CREATE_SESSION_SUCCESS,
            FAILURE: CREATE_SESSION_FAILURE,
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

export const getSessions = (data, successCallback) => {
    return async (dispatch) => {
        const url = `sessions/list`;
        const actionTypes = {
            REQUEST: GET_SESSION_LIST_REQUEST,
            SUCCESS: GET_SESSION_LIST_SUCCESS,
            FAILURE: GET_SESSION_LIST_FAILURE,
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

export const addReview = (data, session_id, successCallback) => {
    return async (dispatch) => {
        const url = `sessions/${session_id}/add_review`;

        const actionTypes = {
            REQUEST: ADD_REVIEW_REQUEST,
            SUCCESS: ADD_REVIEW_SUCCESS,
            FAILURE: ADD_REVIEW_FAILURE,
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

export const updateStatus = (data, session_id, successCallback) => {
    return async (dispatch) => {
        const url = `sessions/${session_id}/update_status`;
        const actionTypes = {
            REQUEST: UDPATE_SESSION_STATUS_REQUEST,
            SUCCESS: UDPATE_SESSION_STATUS_SUCCESS,
            FAILURE: UDPATE_SESSION_STATUS_FAILURE,
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
