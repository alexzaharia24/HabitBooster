import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import ViewCategories from "./ViewCategories";

class AdminHome extends Component {
    render() {
        console.log("home props: ", this.props);
        return (
            <View style={styles.mainView}>
                <ViewCategories/>
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={() => { Actions.addCategory() }}
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
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminHome);