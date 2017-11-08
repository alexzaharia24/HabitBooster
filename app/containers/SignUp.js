import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";

export default class SignUp extends Component {
    render() {
        return (
            <View style={styles.mainView}>
                <Text> Sign Up scene </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});