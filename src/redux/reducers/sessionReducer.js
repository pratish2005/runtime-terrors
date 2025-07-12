import {
    CREATE_SESSION_REQUEST,
    CREATE_SESSION_SUCCESS,
    CREATE_SESSION_FAILURE,
    UDPATE_SESSION_STATUS_REQUEST,
    UDPATE_SESSION_STATUS_SUCCESS,
    UDPATE_SESSION_STATUS_FAILURE,
    GET_SESSION_LIST_REQUEST,
    GET_SESSION_LIST_SUCCESS,
    GET_SESSION_LIST_FAILURE,
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAILURE,
} from "../actions/sessionAction";

const initialState = {
    loading: false,
    successMessage: "",
    upcoming: [],
    previous: [],
    requests: [],
    errors: {},
};

const messageRoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SESSION_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case CREATE_SESSION_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                errors: {},
            };
        case CREATE_SESSION_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case GET_SESSION_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case GET_SESSION_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                [action.payload.data.status]: action.payload.data.sessions,
                errors: {},
            };
        case GET_SESSION_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case ADD_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case ADD_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                errors: {},
            };
        case ADD_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case UDPATE_SESSION_STATUS_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case UDPATE_SESSION_STATUS_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                errors: {},
            };
        case UDPATE_SESSION_STATUS_FAILURE:
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

export default messageRoomReducer;
