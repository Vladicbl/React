/*редюсер представляет собой кусок состояния приложения
потом все части объеденяются в один большой глобальный стейт в файле reducers/index.js
редюсеры разбиваются по функциональному назначению, данный редюсер отвечает за авторизацию*/

import {TOGGLE_PROCESS,SET_DATA} from "../actions/NewsActions";//импортируем типы экшенов

//SET_TOKEN,
//начальное состояние для этого редюсера

const initialState = {
    loading: true,
    data: [{}]
};
//собственно сам редюсер - это чистая функция которая не мутирует данные, она просто перезаписывает их в состояние
const newsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case TOGGLE_PROCESS:
            //новое состояние = старое состяние  + поменяли свойство
            // конструкция аналогичная newState = Object.assign({}, state, {loading: action.state});
            newState = {...state, loading: action.state };
            break;
        case SET_DATA:
            newState = {...state, data: action.data };
            break;
    }
    return newState || state;//если есть новое состояние то оно будет отправлено в глобальный стейт, иначе отправим предыдущее (не поменяем состояние)
};

export default newsReducer;