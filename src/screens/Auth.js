import React from "react";
import {connect} from "react-redux";
import AuthActions from "../actions/AuthActions";
import PropTypes from "prop-types";
import {ActivityIndicator, View, Text, TextInput, Button, StyleSheet} from "react-native"
import {Form, Field} from 'react-final-form'


const TextField = (inputProps) => {
    return (props) => {
        const {input} = props;
        console.log(props);
        return (
            <View>
                <Text {...inputProps} style={{fontSize: 25, fontWeight: 'bold'}}>{inputProps.text}</Text>
                <TextInput
                    {...inputProps}
                    style={styles.input}
                    onChangeText={input.onChange}
                    value={input.value}
                />
            </View>
        )
    }
};

const LoginField = TextField({placeholder: "Enter your login", text: "Login"});
const PasswordField = TextField({placeholder: "Enter your password", text: "Password", secureTextEntry: true});

class Auth extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            login: "", // состояния для хранения логина и пароля
            password: ""
        }
    }

    componentDidMount() { // после отрисовки компонента идет проверка токена
        this.checkLogged();
    }

    async checkLogged() {
        if (await this.props.checkToken()) {
            //если авторизован то перенаправим пользователя в основную часть приложения
            this.props.navigation.navigate('News');
        }

    }

    async login(login, password) {
        const result = await this.props.logIn(login, password);
        if (result) {
            //выводим сообщение об ошибке
            alert(result);
        } else {
            //авторизация прошла успешно
            this.props.navigation.navigate('News');
        }
    }

    render() {
        const {
            auth
        } = this.props;

        if (auth.loading) {
            return (
                <View style={styles.processContainer}>
                    <ActivityIndicator size={'large'}/>

                </View>
            )
        }
        console.log();
        return (
            <Form onSubmit={(values) => this.login(values.login,values.password)}
                  render={
                      ({handleSubmit}) => { // форма авторизации
                          return (
                              <View style={styles.view}>
                                  <Field
                                      component={LoginField}
                                      name={'login'}
                                  />
                                  <Field
                                      component={PasswordField}
                                      name={'password'}
                                  />
                                  <View style={{marginTop: 20}}>
                                      <Button title="Enter" onPress={() => {
                                          handleSubmit();
                                      }} color={'#D35781'}/>
                                  </View>
                              </View>
                          )
                      }}
            >
            </Form>
        )
    }
}

const styles = StyleSheet.create({
    processContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E982A5'
    },
    view: {
        backgroundColor: '#E982A5',
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
    }

});

// свойства компонента необходимо типизировать, чтобы было меньше ошибок
Auth.propTypes = {
    auth: PropTypes.shape({
        loading: PropTypes.bool,
        accessToken: PropTypes.string
    })
};
// так задаются свойства по-умолчанию
Auth.defaultProps = {
    auth: {
        loading: true,
        accessToken: 'example'
    }
};


//функция получает на вход глобальный стейт и собственные свойства компонента
//auth - свойство глобального стейта описано в фалйе reducers/index.js
const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
};

//тут все экшены которые будт доступны в компоненте
const actions = {...AuthActions};
//connect() - функция ысшего порядка которая связывает глобальный стейт с компонентом
export default connect(mapStateToProps, actions)(Auth);