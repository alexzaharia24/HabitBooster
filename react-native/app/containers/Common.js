import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, AsyncStorage, Picker} from "react-native";
import {connect} from "react-redux";
import {editHabit as editHabitAction, refreshHabits as refreshHabitsAction} from "../actions/habits";
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ListPopover from "react-native-list-popover";
import {saveUser as saveUserAction, signIn as signInAction} from "../actions/users";
import {refreshCategories as refreshCategoriesAction} from "../actions/categories";


class CommonView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        if(this.props.user.isAdmin) {
            this.fetchAndSyncCategories();
            Actions.adminHome();
        }
        else {
            this.fetchAndSyncCategories();
            this.fetchAndSyncHabits();
            Actions.home();
        }

    }

    fetchAndSyncCategories() {
        firebase.database().ref("categories")
            .on("value", (data) => {
                const categories = [];
                const values = data.val();
                for(let v in values) {
                    let category = values[v];
                    category["id"] = v;
                    categories.push(category);
                }
                console.log("Categories: ", categories);
                this.props.refreshCategories(categories);
            });
    }

    fetchAndSyncHabits() {
        const uid = this.props.user.id;
        firebase.database().ref("accounts/"+ uid +"/habits")
            .on("value", (data) => {
                const habits = [];
                const values = data.val();
                // console.log("Habits changed from server: ", values);
                for(let h in values) {
                    let habit = values[h];
                    habit["id"] = h;
                    habits.push(habit);
                }
                // console.log("To be processed: ", habits);
                this.props.refreshHabits(habits);
            });
    }

    render() {
        return (
            <View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshCategories: (categories) => {
            return dispatch(refreshCategoriesAction(categories))
        },
        refreshHabits: (habits) => {
            return dispatch(refreshHabitsAction(habits))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommonView);

