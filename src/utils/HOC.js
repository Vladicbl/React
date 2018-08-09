import React from 'react'
import {Text, TextInput, View} from "react-native";

const log = (WrappedComp) => {
    class WrapperComp extends  React.Component{

        TextField = (inputProps) => {
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

        render(){
            return(
                <WrappedComp
                    {...this.props}
                />
            )
        }
    }
    return WrapperComp;
}