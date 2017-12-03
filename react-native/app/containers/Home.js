import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Linking } from "react-native";
import { Actions } from "react-native-router-flux";
import * as firebase from 'firebase'
import { connect } from 'react-redux';
import { signOut as signOutAction } from '../actions/users';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

export class Home extends Component {

    signOut() {
        this.props.signOut()
            .then(() => {
                Actions.signIn();
            })
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text> Welcome, {this.props.user.name}! </Text>
                <TouchableHighlight
                    title={"Sign out"}
                    style={styles.viewHabitsBtn}
                    onPress={() => {
                        this.signOut()
                    }}
                >
                    <Text stlye={styles.text}> Sign out </Text>
                </TouchableHighlight>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { Actions.addHabit() }}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    viewHabitsBtn: {
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
)(Home);