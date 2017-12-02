/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Router, Scene, Stack, Drawer } from "react-native-router-flux";
import Home from "./app/containers/Home";
import ViewGoals from "./app/containers/ViewGoals";
import SignUp from "./app/containers/SignUp";
import { createStore } from 'redux';
import { Reducer } from './app/reducers';
import Provider from "react-redux/src/components/Provider";
import GoalDetail from "./app/containers/GoalDetail";
import SignIn from './app/containers/SignIn';
import { store as appStore } from './app/store';
import MenuDrawer from './app/containers/MenuDrawer';
import AddGoal from './app/containers/AddGoal';

export default class App extends Component {
    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <Scene key="root">
                        <Scene
                            key="signIn"
                            title="Sign In"
                            component={SignIn}
                            hideNavBar={true}
                        />
                        <Drawer
                            key="sideMenu"
                            title="Side Menu"
                            contentComponent={MenuDrawer}
                            drawerPosition={"left"}
                            hideNavBar
                        >
                            <Scene
                                key="home"
                                title="Home"
                                component={Home}
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
                            <Scene
                                key="addGoal"
                                title="Add Goal"
                                component={AddGoal}
                            />
                        </Drawer>
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
