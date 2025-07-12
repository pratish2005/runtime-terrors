import apiCall from "../../utils/apiCall";

export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_FAILURE = "CREATE_ROOM_FAILURE";

export const GET_ROOMS_REQUEST = "GET_ROOMS_REQUEST";
export const GET_ROOMS_SUCCESS = "GET_ROOMS_SUCCESS";
export const GET_ROOMS_FAILURE = "GET_ROOMS_FAILURE";

export const GET_ROOM_MESSAGES_REQUEST = "GET_ROOM_MESSAGES_REQUEST";
export const GET_ROOM_MESSAGES_SUCCESS = "GET_ROOM_MESSAGES_SUCCESS";
export const GET_ROOM_MESSAGES_FAILURE = "GET_ROOM_MESSAGES_FAILURE";

export const GET_ROOM_MESSAGES_REQUEST_APPEND = "GET_ROOM_MESSAGES_REQUEST_APPEND";
export const GET_ROOM_MESSAGES_SUCCESS_APPEND = "GET_ROOM_MESSAGES_SUCCESS_APPEND";

export const ADD_MESSAGE_REQUEST = "ADD_MESSAGE_REQUEST";
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
export const ADD_MESSAGE_FAILURE = "ADD_MESSAGE_FAILURE";

export const NEW_MESSAGE_RECEIVED = "NEW_MESSAGE_RECEIVED";

export const createRoom = (data, successCallback) => {
    return async (dispatch) => {
        const url = `message_room/create`;
        const actionTypes = {
            REQUEST: CREATE_ROOM_REQUEST,
            SUCCESS: CREATE_ROOM_SUCCESS,
            FAILURE: CREATE_ROOM_FAILURE,
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

export const getRooms = (successCallback) => {
    return async (dispatch) => {
        const url = `message_room`;
        const actionTypes = {
            REQUEST: GET_ROOMS_REQUEST,
            SUCCESS: GET_ROOMS_SUCCESS,
            FAILURE: GET_ROOMS_FAILURE,
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

export const getMessages = (data, room_id, successCallback, isAppend) => {
    return async (dispatch) => {
        const url = `message_room/${room_id}/messages`;

        const actionTypes = {
            FAILURE: GET_ROOM_MESSAGES_REQUEST,
        };
        if(isAppend){
            actionTypes.REQUEST =  GET_ROOM_MESSAGES_REQUEST_APPEND;
            actionTypes.SUCCESS = GET_ROOM_MESSAGES_SUCCESS_APPEND;
        }else{
            actionTypes.REQUEST =  GET_ROOM_MESSAGES_REQUEST;
            actionTypes.SUCCESS = GET_ROOM_MESSAGES_SUCCESS;
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

export const addMessage = (data, room_id, successCallback) => {
    return async (dispatch) => {
        const url = `message_room/${room_id}/message`;
        const actionTypes = {
            REQUEST: ADD_MESSAGE_REQUEST,
            SUCCESS: ADD_MESSAGE_SUCCESS,
            FAILURE: ADD_MESSAGE_FAILURE,
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

export const newMessageReceived = (data) => {
    return async (dispatch) => {
        dispatch({ type: NEW_MESSAGE_RECEIVED, payload: data });
    };
}
