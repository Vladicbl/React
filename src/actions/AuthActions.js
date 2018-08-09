import { AsyncStorage } from "react-native";

const accessTokenKey = 'access_token_key';//ключ по которому мы будем сохранять/получать данные в AsyncStore

//далее иду ключи экшенов, по ним редюсеры понимаю как надо изменить глобальный стейт
//смотри файл reducers/AuthReducer.js
export const SET_TOKEN = "SET_TOKEN";
export const TOGGLE_PROCESS = "TOGGLE_PROCESS";

const toggleProcess = (state)=> { //для отображения ActivityIndicator
    return {
        type: TOGGLE_PROCESS,
        state
    }
};



export default {
    checkToken(){
        AsyncStorage.clear();  //очистка AsyncStorage, чтобы опять попасть на форму логина
        //благодаря redux-thunk мы можем выполнять асинхронные действия
        //dispatch() - устанавливает новое соотояние, принимает объект экшена
        //getState() - функция получает текущее состояние приложения
        return async (dispatch, getState) =>{
            dispatch(toggleProcess(true));
            const accessToken = await AsyncStorage.getItem(accessTokenKey);
            if(accessToken){
                dispatch({
                    type: SET_TOKEN,
                    accessToken
                });
                dispatch(toggleProcess(false));
                return true;
            }
            dispatch(toggleProcess(false));
            return false;

        }
    },
    logIn(login, password){
        return async (dispatch, getState)=>{
            dispatch(toggleProcess(true));

            try {
                let response = await fetch(
                    'http://u0517642.isp.regruhosting.ru/api/auth/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',

                        },
                        body: JSON.stringify({
                            login: login,
                            password: password,
                        }),
                    }
                );

                let responseJson = await response.json();
                if(responseJson.access_token){

                    await AsyncStorage.setItem(accessTokenKey, responseJson.access_token);
                    dispatch({
                        type: SET_TOKEN,
                        accessToken: responseJson.access_token
                    });
                    return null;
                }
                return responseJson.msg;
            } catch (error) {
                dispatch(toggleProcess(false));
                console.error(error);
            }
        }
    }
}

