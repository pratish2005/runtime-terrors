import {
    CREATE_ROOM_REQUEST,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILURE,
    GET_ROOMS_REQUEST,
    GET_ROOMS_SUCCESS,
    GET_ROOMS_FAILURE,
    GET_ROOM_MESSAGES_REQUEST,
    GET_ROOM_MESSAGES_SUCCESS,
    GET_ROOM_MESSAGES_FAILURE,
    GET_ROOM_MESSAGES_REQUEST_APPEND,
    GET_ROOM_MESSAGES_SUCCESS_APPEND,
    ADD_MESSAGE_REQUEST,
    ADD_MESSAGE_SUCCESS,
    ADD_MESSAGE_FAILURE,
    NEW_MESSAGE_RECEIVED,
} from "../actions/messageRoomAction";

const initialState = {
    loading: false,
    successMessage: "",
    messages: [],
    rooms: [],
    errors: {},
    pagination: {
        currentPage: 1,
        hasNextPage: false,
        hasPrevPage: false,
        limit: 0,
        total_docs: 0,
        total_pages: 0,
    },
    active_room: {},
    message_loading: false,
};

const messageRoomReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ROOM_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                errors: {},
            };
        case CREATE_ROOM_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case GET_ROOMS_REQUEST:
            return {
                ...state,
                loading: true,
                rooms: [],
                successMessage: "",
                errors: {},
            };
        case GET_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                rooms: action.payload.data.rooms,
                errors: {},
            };
        case GET_ROOMS_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case GET_ROOM_MESSAGES_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                messages: [],
                errors: {},
            };
        case GET_ROOM_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                messages: action.payload.data.messages,
                active_room: action.payload.data.room,
                pagination: action.payload.data.pagination,
                errors: {},
            };
        case GET_ROOM_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                successMessage: "",
                errors: action.payload.errors,
            };
        case GET_ROOM_MESSAGES_REQUEST_APPEND:
            return {
                ...state,
                message_loading: true,
                successMessage: "",
                errors: {},
            };
        case GET_ROOM_MESSAGES_SUCCESS_APPEND:
            return {
                ...state,
                message_loading: false,
                successMessage: action.payload.message,
                messages: [...action.payload.data.messages, ...state.messages],
                pagination: action.payload.data.pagination,
                errors: {},
            };
        case ADD_MESSAGE_REQUEST:
            return {
                ...state,
                loading: true,
                successMessage: "",
                errors: {},
            };
        case ADD_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                successMessage: action.payload.message,
                errors: {},
            };
        case ADD_MESSAGE_FAILURE:
            return {
                ...state,
                loading: false,
                errors: action.payload.errors,
            };
        case NEW_MESSAGE_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, action.payload.message],
            };
        default:
            return state;
    }
};

export default messageRoomReducer;
