import axios from "axios";

const apiCall = async (
    dispatch,
    method,
    url,
    data,
    actionTypes,
    successCallback,
    headers,
    errorCallback
) => {
    const { REQUEST, SUCCESS, FAILURE } = actionTypes;

    dispatch({ type: REQUEST });

    try {
        let response;
        if (method === "POST") {
            response = await axios.post(
                `${import.meta.env.VITE_APP_API_URL}${url}`,
                data,
                headers
            );
        } else if (method === "GET") {
            response = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}${url}`,
                { params: data, ...headers }
            );
        } else {
            throw new Error("Invalid HTTP method");
        }

        if (response.data.status === 200) {
            dispatch({ type: SUCCESS, payload: response.data });
            if (successCallback) {
                successCallback(response.data);
            }
        } else if (response.data.errors) {
            dispatch({ type: FAILURE, payload: response.data.errors });
            if (errorCallback) {
                errorCallback(response.data);
            }
        }
    } catch (error) {
        console.log(error);
        if (errorCallback) {
            errorCallback(error.response?.data);
        }
        const errorMessage =
            error.response?.data?.status === 400
                ? error.response.data
                : "An error occurred during the API call.";
        dispatch({ type: FAILURE, payload: errorMessage });
    }
};

export default apiCall;
