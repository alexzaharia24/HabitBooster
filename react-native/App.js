import React, { Component } from 'react';
import { StyleSheet, BackHandler} from "react-native";
import { Router, Scene, Stack, Drawer } from "react-native-router-flux";
import Home from "./app/containers/Home";
import ViewHabits from "./app/containers/ViewHabits";
import SignUp from "./app/containers/SignUp";
import { createStore } from 'redux';
import { Reducer } from './app/reducers';
import Provider from "react-redux/src/components/Provider";
import HabitDetail from "./app/containers/HabitDetail";
import { store as appStore } from './app/store';
import MenuDrawer from './app/containers/MenuDrawer';
import AddHabit from './app/containers/AddHabit';
import CompletedHabits from "./app/containers/CompletedHabits";
import Stats from "./app/containers/Stats";


export default class App extends Component {

    componentWillMount() {
        // Go to previous screen on back button
        BackHandler.addEventListener('hardwareBackPress', () => true);
    };

    componentWillUnmount() {
        // Go to previous screen on back button
        BackHandler.removeEventListener('hardwareBackPress', () => true);
    }

    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <Scene key="root">
                        <Drawer
                            key="sideMenu"
                            title="Side Menu"
                            contentComponent={MenuDrawer}
                            drawerPosition={"left"}
                            hideNavBar
                        >
                            <Scene
                                key="home"
                                title="My habits"
                                component={Home}
                                hideNavBar={false}
                            />
                            <Scene
                                key="viewHabits"
                                title="View Habits"
                                component={ViewHabits}
                                hideNavBar={false}
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
                                hideNavBar={false}
                            />
                            <Scene
                                key="addHabit"
                                title="Add Habit"
                                component={AddHabit}
                                hideNavBar={false}
                            />
                            <Scene
                                key="completedHabits"
                                title="Completed Habits"
                                component={CompletedHabits}
                                hideNavBar={false}
                            />
                            <Scene
                                key="stats"
                                title="Stats"
                                component={Stats}
                                hideNavBar={false}
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
