import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import {Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import {signOut as signOutAction} from '../actions/users';

class MenuDrawer extends Component {
    signOut() {
        this.props.signOut()
            .then(() => {
                Actions.signIn();
            })
    }

    render() {
        console.log("render");
        return (
            <View>
                <Button
                    title="Home"
                    onPress={() => Actions.home()}
                />
                <Button
                    title="Completed habits"
                    onPress={() => Actions.completedHabits()}
                />
                <Button
                    title="Stats"
                    onPress={() => Actions.stats()}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
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
)(MenuDrawer);