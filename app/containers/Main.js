import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";

export default class Main extends Component {
    render() {
        return (
            <View style={styles.mainView}>
                <TouchableHighlight
                    title={"View goals"}
                    style={styles.viewGoalsBtn}
                    onPress={() => {
                        Actions.viewGoals()
                    }}
                >
                    <Text stlye={styles.text}> View goals </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    title={"Sign up"}
                    style={styles.signUpBtn}
                    onPress={() => {
                        Actions.signUp()
                    }}
                >
                    <Text stlye={styles.text}> Sign up </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // justifyContent: 'center'
    },
    signUpBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "steelblue",
        padding: 20,
    },
    viewGoalsBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "skyblue",
        padding: 20,
    },
    text: {
        color: '#fff'
    }
});