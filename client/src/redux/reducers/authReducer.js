import {
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    AUTH_USER_PROFILE_REQUEST,
    AUTH_USER_PROFILE_SUCCESS,
    AUTH_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_PICTURE_REQUEST,
    UPDATE_USER_PROFILE_PICTURE_SUCCESS,
    UPDATE_USER_PROFILE_PICTURE_FAILURE,
    RESEND_VERIFICATION_LINK_REQUEST,
    RESEND_VERIFICATION_LINK_SUCCESS,
    RESEND_VERIFICATION_LINK_FAILURE,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS,
    VERIFY_EMAIL_FAILURE,
} from "../actions/authAction";

const initialState = {
    loading: false,
    isLoggedIn: null,
    successMessage: "",
    user: {},
    errors: {},
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case LOGIN_USER_SUCCESS:
            localStorage.setItem("access_token", action.payload.data.token);
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                successMessage: action.payload.message,
                user: action.payload.data.user,
                errors: {},
            };
        case LOGIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case REGISTER_USER_SUCCESS:
            localStorage.setItem("access_token", action.payload.data.token);
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                successMessage: action.payload.message,
                user: action.payload.data.user,
                errors: {},
            };
        case REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case AUTH_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case AUTH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                successMessage: action.payload.message,
                user: action.payload.data.user,
                errors: {},
            };
        case AUTH_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case UPDATE_USER_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                user: action.payload.data.user,
                errors: {},
            };
        case UPDATE_USER_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case UPDATE_USER_PROFILE_PICTURE_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case UPDATE_USER_PROFILE_PICTURE_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                user: action.payload.data.user,
                errors: {},
            };
        case UPDATE_USER_PROFILE_PICTURE_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case RESEND_VERIFICATION_LINK_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case RESEND_VERIFICATION_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                errors: {},
            };
        case RESEND_VERIFICATION_LINK_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case VERIFY_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case VERIFY_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                errors: {},
            };
        case VERIFY_EMAIL_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        default:
            return state;
    }
};

export default authReducer;
