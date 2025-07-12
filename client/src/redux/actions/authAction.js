import apiCall from "../../utils/apiCall";

export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS";
export const REGISTER_USER_FAILURE = "REGISTER_USER_FAILURE";

export const AUTH_USER_PROFILE_REQUEST = "AUTH_USER_PROFILE_REQUEST";
export const AUTH_USER_PROFILE_SUCCESS = "AUTH_USER_PROFILE_SUCCESS";
export const AUTH_USER_PROFILE_FAILURE = "AUTH_USER_PROFILE_FAILURE";

export const UPDATE_USER_PROFILE_REQUEST = "UPDATE_USER_PROFILE_REQUEST";
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS";
export const UPDATE_USER_PROFILE_FAILURE = "UPDATE_USER_PROFILE_FAILURE";

export const UPDATE_USER_PROFILE_PICTURE_REQUEST =
    "UPDATE_USER_PROFILE_PICTURE_REQUEST";
export const UPDATE_USER_PROFILE_PICTURE_SUCCESS =
    "UPDATE_USER_PROFILE_PICTURE_SUCCESS";
export const UPDATE_USER_PROFILE_PICTURE_FAILURE =
    "UPDATE_USER_PROFILE_PICTURE_FAILURE";

export const RESEND_VERIFICATION_LINK_REQUEST =
    "RESEND_VERIFICATION_LINK_REQUEST";
export const RESEND_VERIFICATION_LINK_SUCCESS =
    "RESEND_VERIFICATION_LINK_SUCCESS";
export const RESEND_VERIFICATION_LINK_FAILURE =
    "RESEND_VERIFICATION_LINK_FAILURE";

export const VERIFY_EMAIL_REQUEST = "VERIFY_EMAIL_REQUEST";
export const VERIFY_EMAIL_SUCCESS = "VERIFY_EMAIL_SUCCESS";
export const VERIFY_EMAIL_FAILURE = "VERIFY_EMAIL_FAILURE";

export const loginUser = (data, successCallback, errorCallback) => {
    return async (dispatch) => {
        const url = `auth/login`;
        const actionTypes = {
            REQUEST: LOGIN_USER_REQUEST,
            SUCCESS: LOGIN_USER_SUCCESS,
            FAILURE: LOGIN_USER_FAILURE,
        };

        await apiCall(
            dispatch,
            "POST",
            url,
            data,
            actionTypes,
            successCallback,
            {},
            errorCallback
        );
    };
};

export const registerUser = (data, successCallback) => {
    return async (dispatch) => {
        const url = `auth/register`;
        const actionTypes = {
            REQUEST: REGISTER_USER_REQUEST,
            SUCCESS: REGISTER_USER_SUCCESS,
            FAILURE: REGISTER_USER_FAILURE,
        };

        await apiCall(
            dispatch,
            "POST",
            url,
            data,
            actionTypes,
            successCallback
        );
    };
};

export const getAuthUserProfile = (successCallback) => {
    return async (dispatch) => {
        const url = `user/profile`;
        const actionTypes = {
            REQUEST: AUTH_USER_PROFILE_REQUEST,
            SUCCESS: AUTH_USER_PROFILE_SUCCESS,
            FAILURE: AUTH_USER_PROFILE_FAILURE,
        };
        const token = localStorage.getItem("access_token");
        const headers = {
            headers: {
                Authorization: `${token}`,
            },
        };

        await apiCall(
            dispatch,
            "GET",
            url,
            {},
            actionTypes,
            successCallback,
            headers
        );
    };
};

export const updateUserProfile = (data, successCallback) => {
    return async (dispatch) => {
        const url = `user/profile`;
        const actionTypes = {
            REQUEST: UPDATE_USER_PROFILE_REQUEST,
            SUCCESS: UPDATE_USER_PROFILE_SUCCESS,
            FAILURE: UPDATE_USER_PROFILE_FAILURE,
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

export const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem("access_token");
        window.location.href = "/login";
    };
};

export const updateUserProfilePicture = (data, successCallback) => {
    return async (dispatch) => {
        const url = `user/profile_picture`;
        const actionTypes = {
            REQUEST: UPDATE_USER_PROFILE_PICTURE_REQUEST,
            SUCCESS: UPDATE_USER_PROFILE_PICTURE_SUCCESS,
            FAILURE: UPDATE_USER_PROFILE_PICTURE_FAILURE,
        };
        const token = localStorage.getItem("access_token");
        const headers = {
            headers: {
                Authorization: `${token}`,
                "Content-Type": "multipart/form-data",
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

export const resendVerificationLink = (data, successCallback) => {
    return async (dispatch) => {
        const url = `auth/resend-verification-link`;
        const actionTypes = {
            REQUEST: RESEND_VERIFICATION_LINK_REQUEST,
            SUCCESS: RESEND_VERIFICATION_LINK_SUCCESS,
            FAILURE: RESEND_VERIFICATION_LINK_FAILURE,
        };

        await apiCall(
            dispatch,
            "POST",
            url,
            data,
            actionTypes,
            successCallback
        );
    };
};

export const verifyEmail = (data, successCallback) => {
    return async (dispatch) => {
        const url = `auth/verify-email`;
        const actionTypes = {
            REQUEST: VERIFY_EMAIL_REQUEST,
            SUCCESS: VERIFY_EMAIL_SUCCESS,
            FAILURE: VERIFY_EMAIL_FAILURE,
        };

        await apiCall(
            dispatch,
            "POST",
            url,
            data,
            actionTypes,
            successCallback
        );
    };
};
