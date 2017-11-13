/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import {Router, Scene, Stack} from "react-native-router-flux";
import Main from "./app/containers/Main";
import ViewGoals from "./app/containers/ViewGoals";
import SignUp from "./app/containers/SignUp";
import {createStore} from 'redux';
import {Reducer} from './app/reducers';
import Provider from "react-redux/src/components/Provider";
import GoalDetail from "./app/containers/GoalDetail";

let appStore = createStore(Reducer);

export default class App extends Component {
    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <Scene key="root">
                        <Scene
                            key="main"
                            title="Main"
                            component={Main}
                        />
                        <Scene
                            key="viewGoals"
                            title="View Goals"
                            component={ViewGoals}
                        />
                        <Scene
                            key="signUp"
                            title="Sign Up"
                            component={SignUp}
                        />
                        <Scene
                            key="goalDetail"
                            title="Goal Detail"
                            component={GoalDetail}
                        />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: 'brown',
        fontWeight: 'bold'
    },
    imageBox: {
        height: 400
    }
});
