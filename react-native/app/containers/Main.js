import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, Linking} from "react-native";
import {Actions} from "react-native-router-flux";
import * as firebase from 'firebase'
import {connect} from 'react-redux';
import {signOut as signOutAction} from '../actions/users';

export class Main extends Component {

    signOut() {
        this.props.signOut()
            .then(() => {
                Actions.signIn();
            })
    }

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
                <TouchableHighlight
                    title={"Sign out"}
                    style={styles.signUpBtn}
                    onPress={() => {
                        this.signOut()
                    }}
                >
                    <Text stlye={styles.text}> Sign out </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
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

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => {
            return dispatch(signOutAction())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);