import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';
import { signOut as signOutAction } from '../actions/users';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ViewHabits from "./ViewHabits";

export class Home extends Component {
    render() {
        console.log("home props: ", this.props);
        return (
            <View style={styles.mainView}>
                <ViewHabits/>
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