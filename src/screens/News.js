import React from "react";
import {View, Text, FlatList, Button, ActivityIndicator, Image, TouchableOpacity, StyleSheet} from "react-native";
import NewsActions from "../actions/NewsActions";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import Article from "./Article";

class News extends React.PureComponent{
    componentDidMount(){
        this.props.newsRequest();
    }

    async Update(){
        //await this.props.newsUpdate();
        await this.props.newsRequest();
    }

    render(){
        const {
            news
        } = this.props;

        if(news.loading){
            return(
                <View style={styles.processContainer}>
                    <ActivityIndicator size={'large'}/>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 0.06, flexDirection: 'row'}}>

                    <View style={{flex: 1}}>
                        <Text style={{marginLeft: 50, fontSize: 30}}>News</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Button onPress={() => this.Update()} title={"Refresh"} color={'#D35781'}/>
                    </View>

                </View>

                    <FlatList
                        data={news.data}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => (this.props.navigation.navigate('Article',{
                                title: item.title,
                                text: item.text,
                                image: item.image,
                            }))}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 30}} >
                                    <Image source={{uri: item.image}} style={{width: 100, height: 100}}/>
                                </View>
                                <View style={{flex: 70, backgroundColor: '#AFF'}} >
                                    <Text style={{fontSize: 20}}>
                                        {item.title}
                                    </Text>
                                </View>
                            </View>
                            </TouchableOpacity>
                        )}
                    />
            </View>
        )
    }
}

News.propTypes = {
    news: PropTypes.shape({
        loading: PropTypes.bool,
        data: [{
            title: PropTypes.string,
            text: PropTypes.string,
            image: PropTypes.string
        }]
    })
};

const styles = StyleSheet.create({
    processContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E982A5'
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        news: state.news
    }
};

const actions = {...NewsActions};
//connect() - функция ысшего порядка которая связывает глобальный стейт с компонентом
export default connect(mapStateToProps, actions)(News);