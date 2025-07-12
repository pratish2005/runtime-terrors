import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import messageRoomReducer from "./reducers/messageRoomReducer";
import sessionReducer from "./reducers/sessionReducer";
import notificationReducer from "./reducers/notificationReducer";


const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    messageRoom: messageRoomReducer,
    session: sessionReducer,
    notification: notificationReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;