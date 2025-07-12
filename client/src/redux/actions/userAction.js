import apiCall from "../../utils/apiCall";

export const USER_SEARCH_REQUEST = "USER_SEARCH_REQUEST";
export const USER_SEARCH_SUCCESS = "USER_SEARCH_SUCCESS";
export const USER_SEARCH_FAILURE = "USER_SEARCH_FAILURE";

export const USER_SEARCH_REQUEST_APPEND = "USER_SEARCH_REQUEST_APPEND";
export const USER_SEARCH_SUCCESS_APPEND = "USER_SEARCH_SUCCESS_APPEND";

export const USER_PROFILE_REQUEST = "USER_PROFILE_REQUEST";
export const USER_PROFILE_SUCCESS = "USER_PROFILE_SUCCESS";
export const USER_PROFILE_FAILURE = "USER_PROFILE_FAILURE";

export const GET_USER_REVIEW_REQUEST = "GET_USER_REVIEW_REQUEST";
export const GET_USER_REVIEW_SUCCESS = "GET_USER_REVIEW_SUCCESS";
export const GET_USER_REVIEW_FAILURE = "GET_USER_REVIEW_FAILURE";

export const searchUser = (data, successCallback, isAppend) => {
    return async (dispatch) => {
        const url = `user/search`;
        const actionTypes = {
            FAILURE: USER_SEARCH_FAILURE,
        };
        if(isAppend){
            actionTypes.REQUEST =  USER_SEARCH_REQUEST_APPEND;
            actionTypes.SUCCESS = USER_SEARCH_SUCCESS_APPEND;
        }else{
            actionTypes.REQUEST =  USER_SEARCH_REQUEST;
            actionTypes.SUCCESS = USER_SEARCH_SUCCESS;
        }
       
        const token = localStorage.getItem("access_token");
        const headers = {
            headers: {
                Authorization: `${token}`,
            },
        } 

        await apiCall(
            dispatch,
            "POST",
            url,
            data,
            actionTypes,
            successCallback,
            headers,
        );
    };
};

export const getUserProfile = (user_id, successCallback) => {
    return async (dispatch) => {
        const url = `user/${user_id}/profile`;
        const actionTypes = {
            REQUEST: USER_PROFILE_REQUEST,
            SUCCESS: USER_PROFILE_SUCCESS,
            FAILURE: USER_PROFILE_FAILURE,
        };
        const token = localStorage.getItem("access_token");
        const headers = {
            headers: {
                Authorization: `${token}`,
            },
        } 

        await apiCall(dispatch, "GET", url, {}, actionTypes, successCallback, headers);
    };
};

export const getUserReviews = (data, user_id, successCallback) => {
    return async (dispatch) => {
        const url = `user/${user_id}/reviews`;
        const actionTypes = {
            REQUEST: GET_USER_REVIEW_REQUEST,
            SUCCESS: GET_USER_REVIEW_SUCCESS,
            FAILURE: GET_USER_REVIEW_FAILURE,
        };
       
        const token = localStorage.getItem("access_token");
        const headers = {
            headers: {
                Authorization: `${token}`,
            },
        } 

        await apiCall(
            dispatch,
            "POST",
            url,
            data,
            actionTypes,
            successCallback,
            headers,
        );
    };
};