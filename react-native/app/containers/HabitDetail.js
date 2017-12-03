import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableHighlight, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import { editHabit as editHabitAction} from "../actions/habits";
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firebase from 'react-native-firebase';


class HabitDetail extends Component {
    constructor(props) {
        super(props);
        console.log("Habit: ", this.props.habit);
        this.state = {
            id: this.props.habit.id,
            title: this.props.habit.title,
            startDate: this.parseFromUnixTimestamp(this.props.habit.startDate),
            endDate: this.parseFromUnixTimestamp(this.props.habit.endDate),
            startDateTimestamp: this.props.habit.startDate,
            endDateTimestamp: this.props.habit.endDate,
            isStartDatePickerVisible: false,
            isEndDatePickerVisible: false,
        }

        //TODO: open datepicker at the current startdate and enddate not the current real date
    }

    updateHabit() {
        console.log("Update: ", this.state.id);
        let uid = this.props.user.id;
        let item = {
            id: this.state.id,
            title: this.state.title,
            startDate: this.state.startDateTimestamp,
            endDate: this.state.endDateTimestamp
        }
        this.props.updateHabit(uid, item)
    }

    deleteHabit() {
        //Integrate into redux flow
        let uid = this.props.user.id;
        console.log("Delete: ", this.state.id, 'of user: ', uid);
        firebase.database()
            .ref('/accounts/' + uid + '/habits/' + this.state.id)
            .remove()
            .then(() => {
                console.log("Habit: ", this.state.id, " removed");
            })
    }

    showStartDatePicker = () => {
        console.log("Show start date picker");
        this.setState({
            isStartDatePickerVisible: true
        })
    }

    showEndDatePicker = () => {
        this.setState({
            isEndDatePickerVisible: true
        })
    }

    hideDateTimePicker = () => {
        this.setState({
            isStartDatePickerVisible: false,
            isEndDatePickerVisible: false,
        })
    }

    confirmStartDatePicker = (date) => {
        console.log("S date: ", date);
        console.log("S date string: ", this.parseHumanDate(date));
        console.log("S date timestamp: ", this.parseTimestampDate(date));
        this.setState({
            startDate: this.parseHumanDate(date),
            startDateTimestamp: this.parseTimestampDate(date)
        })
        this.hideDateTimePicker();
    }

    confirmEndDatePicker = (date) => {
        let timpestamp = this.parseTimestampDate(date);
        if (timpestamp < this.state.startDateTimestamp) {
            Alert.alert("End date must be < Start date");
        } else {
            this.setState({
                endDate: this.parseHumanDate(date),
                endDateTimestamp: this.parseTimestampDate(date)
            })
        }
        this.hideDateTimePicker();
    }

    parseHumanDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
    }
    parseTimestampDate = (date) => {
        return moment(date).unix();
    }
    parseFromUnixTimestamp = (date) => {
        return moment.unix(date).format("DD/MM/YYYY");
    }

    render() {
        return (
            <View style={styles.loginBox}>
                <TextInput
                    placeholder={"Title"}
                    placeholderTextColor={'#b6b6b4'}
                    defaultValue={this.state.title}
                    onChangeText={(text) => {
                        this.setState({ title: text });
                    }}
                    style={styles.inputText}
                />
                <TextInput
                    placeholder={"Start date"}
                    placeholderTextColor={'#b6b6b4'}
                    defaultValue={this.state.startDate}
                    onTouchStart={() => {
                        this.showStartDatePicker()
                    }}
                    onChangeText={(text) => {
                        this.setState({ startDate: text });
                    }}
                    style={styles.inputText}
                />
                <TextInput
                    placeholder={"End date"}
                    placeholderTextColor={'#b6b6b4'}
                    defaultValue={this.state.endDate}
                    onTouchStart={() => {
                        this.showEndDatePicker()
                    }}
                    onChangeText={(text) => {
                        this.setState({ endDate: text });
                    }}
                    style={styles.inputText}
                />
                <TouchableHighlight
                    style={styles.saveButton}
                    onPress={() => {
                        this.updateHabit()
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 18 }}>
                        Save
                        </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.deleteButton}
                    onPress={() => {
                        this.deleteHabit()
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 18 }}>
                        Delete
                        </Text>
                </TouchableHighlight>
                <DateTimePicker
                    isVisible={this.state.isStartDatePickerVisible}
                    onConfirm={this.confirmStartDatePicker}
                    onCancel={this.hideDateTimePicker}
                />
                <DateTimePicker
                    isVisible={this.state.isEndDatePickerVisible}
                    onConfirm={this.confirmEndDatePicker}
                    onCancel={this.hideDateTimePicker}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputText: {
        width: '80%',
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 12,
        fontSize: 16
    },
    saveButton: {
        width: '78%',
        backgroundColor: '#4D9DE0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
    },
    deleteButton: {
        width: '78%',
        backgroundColor: '#bc2c12',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
    },
})

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateHabit: (uid, item) => {
            dispatch(editHabitAction(uid, item))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HabitDetail);