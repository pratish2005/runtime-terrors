import {
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAILURE,
    GET_HEADER_NOTIFICATION_REQUEST,
    GET_HEADER_NOTIFICATION_SUCCESS,
    MARK_NOTIFICATION_REQUEST,
    MARK_NOTIFICATION_SUCCESS,
    MARK_NOTIFICATION_FAILURE,
} from "../actions/notifcationAction";

const initialState = {
    loading: false,
    notifications: [],
    header_notifications: [],
    successMessage: "",
    errors: {},
    unread_notification_count: 0,
    pagination: {
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 0,
        total_docs: 0,
        total_pages: 0,
    },
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                notifications: [],
                successMessage: "",
                errors: {},
            };
        case GET_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: action.payload.data.notifications,
                pagination: action.payload.data.pagination,
                successMessage: action.payload.message,
                errors: {},
            };
        case GET_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case GET_HEADER_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                header_notifications: [],
                successMessage: "",
                errors: {},
            };
        case GET_HEADER_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                header_notifications: action.payload.data.notifications,
                unread_notification_count: action.payload.data.pagination.total_docs,
                successMessage: action.payload.message,
                errors: {},
            };
        case MARK_NOTIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case MARK_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                header_notifications: state.header_notifications.map((notification) => {
                    if(notification._id === action.payload.data.notification._id){
                        return action.payload.data.notification;
                    }
                    return action.payload.data.notification;
                }),
                errors: {},
            };
        case MARK_NOTIFICATION_FAILURE:
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

export default notificationReducer;
