import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import AppNavigator from './navigators/AppNavigator';
import {middleware} from './utils/redux';
import Reducers from './reducers';

//сосдаем глобальный стейт и коннектим мидлверы(расширение функционала)

const store = createStore( // стор, он всегда один, предназначен для хранения состояний приложения
    Reducers,
    applyMiddleware(...middleware),
);

type Props = {};
export default class App extends Component<Props> {
    render() {
        //Provider обеспечивает связь со глобальным стейтом
        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}

