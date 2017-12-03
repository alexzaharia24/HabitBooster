/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
``
import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Router, Scene, Stack, Drawer } from "react-native-router-flux";
import Home from "./app/containers/Home";
import ViewHabits from "./app/containers/ViewHabits";
import SignUp from "./app/containers/SignUp";
import { createStore } from 'redux';
import { Reducer } from './app/reducers';
import Provider from "react-redux/src/components/Provider";
import HabitDetail from "./app/containers/HabitDetail";
import SignIn from './app/containers/SignIn';
import { store as appStore } from './app/store';
import MenuDrawer from './app/containers/MenuDrawer';
import AddHabit from './app/containers/AddHabit';

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
                                key="viewHabits"
                                title="View Habits"
                                component={ViewHabits}
                            />
                            <Scene
                                key="signUp"
                                title="Sign Up"
                                component={SignUp}
                            />
                            <Scene
                                key="habitDetail"
                                title="Habit Detail"
                                component={HabitDetail}
                            />
                            <Scene
                                key="addHabit"
                                title="Add Habit"
                                component={AddHabit}
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
