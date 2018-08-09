import React from "react";
import {View, Text, Button, StyleSheet, Image} from "react-native"

class Article extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state ={
        }
    }
    render(){

        const title = this.props.navigation.getParam('title', ''); // получение параметров
        const text = this.props.navigation.getParam('text', '');
        const image = this.props.navigation.getParam('image', '');

        return(
            <View style={{flex: 1,backgroundColor: '#AFF'}}>
                <View style={{flex: 10, flexDirection: 'row'}}>
                    <View style={{flex: 35, padding: 5}} >
                        <Image source={{uri: image}} style={{width: 120, height: 120}}/>
                    </View>
                    <View style={{flex: 65}} >
                        <Text style={{fontSize: 30}}>
                            {title}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 40}}>
                    <Text style={styles.mainText}>{text}</Text>
                    <Button color={'#5A9'}  title={"Back"} onPress={() => this.props.navigation.navigate('News')}/>
                </View>


            </View>
      )
    }
}

const styles = StyleSheet.create({
    mainText : {
        paddingLeft: 5,
        paddingRight: 5,
    }
});

export default Article;