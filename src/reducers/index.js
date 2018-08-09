import { combineReducers } from 'redux';
import auth from "./AuthReducer";
import news from "./NewsReducer";

//тут мы соединяем все редюсеры
export default combineReducers({
    auth,
    news,
});