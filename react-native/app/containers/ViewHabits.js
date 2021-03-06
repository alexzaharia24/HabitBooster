import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, AsyncStorage} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {fetchHabits as fetchHabitsAction} from '../actions/habits';
import moment from 'moment';


class ViewHabits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            habits: []
        }
    }

    componentDidMount() {
        this.fetchHabits()
    }

    async fetchHabits() {
        let habits = await AsyncStorage.getItem("habits");
        habits = JSON.parse(habits);
        if (habits === null) {
            habits = [];
        }
        this.setState({
            habits: habits
        })
    }

    _keyExtractor = (item, index) => item.title;

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
        console.log("ViewHabits");
        return (
            <View style={styles.mainView}>

                <FlatList
                    data={this.state.habits}
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
        fetchHabits: (uid) => {
            return dispatch(fetchHabitsAction(uid))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewHabits);