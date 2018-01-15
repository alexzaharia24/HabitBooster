import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, AsyncStorage} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {refreshHabits as refreshHabitsAction, fetchHabits as fetchHabitsAction} from '../actions/habits';
import moment from 'moment';
import firebase from 'react-native-firebase';


class ViewHabits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habits: this.props.habits.items
        };
        // console.log("PP1: ", this.props);
    }

    componentDidMount() {
        // this.fetchHabits();
        // console.log("Props: ", this.props);
        this.fetchAndSynchronizeData();
    }

    fetchAndSynchronizeData() {
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

    _keyExtractor = (item, index) => item.id;

    _onSelectItem = (item) => {
        console.log(item);
        Actions.habitDetail({habit: item});
    };

    _renderHabitItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.listElement}
                              onPress={() => this._onSelectItem(item)}
            >
                <Text style={styles.habitTitle}>  {item.title} </Text>
                <Text style={styles.habitDate}>  {this.parseHumanDate(item.startDate)} - {this.parseHumanDate(item.endDate)} </Text>
            </TouchableOpacity>
        )
    };

    parseHumanDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
    };

    render() {
        // console.log("ViewHabits");
        // console.log("Habits: ", this.state.habits);

        return (
            <View style={styles.mainView}>

                <FlatList
                    data={this.props.habits.items}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderHabitItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    refreshButton: {
        width: '78%',
        backgroundColor: '#efa913',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
    },
    listElement: {
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#e2e2e2',
    },
    habitTitle: {
        fontSize: 18
    },
    habitDate: {
        fontSize: 14,
        color: "#c4c4c4",

    },
});

const mapStateToProps = (state) => {
    return {
        habits: state.habits,
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshHabits: (habits) => {
            return dispatch(refreshHabitsAction(habits))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewHabits);