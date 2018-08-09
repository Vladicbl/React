import React from "react";
import {createStackNavigator, SafeAreaView} from 'react-navigation';
import {
    SwitchNavigator,
    StackNavigator,
    TabNavigator
} from 'react-navigation';
import {KeyboardAvoidingView, Platform, View, Text} from 'react-native'
import Auth from "../screens/Auth";
import News from "../screens/News";
import Article from "../screens/Article";

//для основной части приложения, той что скрыта от неавторизованного юзера выбираем навигацию типа стек
// тут могут быть и табики и левое меню и д.р
// export const Navigator = StackNavigator({ //createStackNavigator
//     Auth:{
//         screen: Auth
//     },
//     News:{
//         screen: News
//     }
// });



//switcher navigators
//позволяет переключаться между навигаторами, читай документацию
// export const Navigator = TabNavigator({
//     Auth: {
//         screen: Auth
//     },
//     News: {
//         screen: News
//     }
// });



export const Navigator = SwitchNavigator(
    {
        Auth: Auth,
        News: News,
        Article: Article
    },
    {
        initialRouteName: 'Auth',
    }
);


class AppNavigator extends React.PureComponent{
    render(){
        //KeyboardAvoidingView нужен для иммитации поведения клавиатуры как на адройде для иос
        const Container = Platform.OS === 'ios'? KeyboardAvoidingView : View;
        //SafeAreaView нужно для айфонов Х
        return(
            <SafeAreaView style={{flex: 1}} forceInset={{top: 'always', horizontal: 'never'}}>
                <Container style={{flex:1}} behavior="padding" enabled>
                    <Navigator/>
                </Container>
            </SafeAreaView>
        )
    }
}

export default AppNavigator;



