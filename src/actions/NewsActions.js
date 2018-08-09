import {AsyncStorage} from "react-native";

export const TOGGLE_PROCESS = "TOGGLE_PROCESS";
export const SET_DATA = "SET_DATA";

const accessTokenKey = 'access_token_key';

const toggleProcess = (state)=> { //для отображения ActivityIndicator
    return {
        type: TOGGLE_PROCESS,
        state
    }
};

export default {

    newsRequest(){
        return async (dispatch, getState)=>{
            dispatch(toggleProcess(true));

            const accessToken = await AsyncStorage.getItem(accessTokenKey);
            try {
                let response = await fetch(
                    'http://u0517642.isp.regruhosting.ru/api/news/',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`

                        },
                    }
                );

                let responseJson = await response.json();
                dispatch(toggleProcess(false));
                dispatch({
                    type: SET_DATA,
                    data: responseJson
                });
            } catch (error) {
                dispatch(toggleProcess(false));
                console.error(error);
            }
        }
    }
}