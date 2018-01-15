import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, AsyncStorage, Picker} from "react-native";
import {connect} from "react-redux";
import {editHabit as editHabitAction} from "../actions/habits";
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ListPopover from "react-native-list-popover";


class HabitDetail extends Component {
    constructor(props) {
        super(props);
        console.log("Habit: ", this.props.habit);
        this.state = {
            oldTitle: this.props.habit.title,
            title: this.props.habit.title,
            category: this.props.habit.category,
            startDate: this.parseHumanDate(this.props.habit.startDate),
            endDate: this.parseHumanDate(this.props.habit.endDate),
            startDateTimestamp: this.props.habit.startDate,
            endDateTimestamp: this.props.habit.endDate,
            isStartDatePickerVisible: false,
            isEndDatePickerVisible: false,
            isCategorySelectorVisible: false,
        }

        //TODO: open datepicker at the current startdate and enddate not the current real date
    }

    getCategoryNames() {
        let names = [];
        let categories = this.props.categories;
        console.log("Get category names: ", categories);
        for(let i=0; i<categories.length; i++) {
            names.push(categories[i].name);
            console.log("Category names: ", names);
        }
        return names;
    }

    async updateHabit() {
        console.log("Update: ", this.state.title);

        const uid = this.props.user.id;
        firebase.database().ref('accounts/' + uid + '/habits/' + this.props.habit.id)
            .update({
                title: this.state.title,
                category: this.state.category,
                startDate: this.state.startDateTimestamp,
                endDate: this.state.endDateTimestamp
            });
        alert("Habit updated");
        Actions.home();
    }

    async deleteHabit() {
        //TODO: Integrate into redux flow
        console.log("Delete habit: ", this.state);


        const uid = this.props.user.id;
        firebase.database().ref('accounts/' + uid + '/habits/' + this.props.habit.id)
            .remove();
        alert("Habit deleted");
        Actions.home();
    }

    async completeHabit() {

        const uid = this.props.user.id;
        //Delete from active habits
        firebase.database().ref('accounts/' + uid + '/habits/' + this.props.habit.id)
            .remove();
        //Add to completed habits
        firebase.database()
            .ref('accounts/' + uid + '/habits_completed')
            .push({
                title: this.state.title,
                category: this.state.category,
                startDate: this.state.startDateTimestamp,
                endDate: this.state.endDateTimestamp
            });
        alert("Habit completed");
        Actions.home();


    }

    showStartDatePicker = () => {
        console.log("Show start date picker");
        this.setState({
            isStartDatePickerVisible: true
        })
    };

    showEndDatePicker = () => {
        this.setState({
            isEndDatePickerVisible: true
        })
    };

    hideDateTimePicker = () => {
        this.setState({
            isStartDatePickerVisible: false,
            isEndDatePickerVisible: false,
        })
    };

    confirmStartDatePicker = (date) => {
        console.log("S date: ", date);
        console.log("S date string: ", this.parseHumanDate(date));
        console.log("S date timestamp: ", this.parseTimestampDate(date));
        this.setState({
            startDate: this.parseHumanDate(date),
            startDateTimestamp: this.parseTimestampDate(date)
        });
        this.hideDateTimePicker();
    };

    confirmEndDatePicker = (date) => {
        let timpestamp = this.parseTimestampDate(date);
        if (timpestamp < this.state.startDateTimestamp) {
            Alert.alert("Start date must be < End date");
        } else {
            this.setState({
                endDate: this.parseHumanDate(date),
                endDateTimestamp: this.parseTimestampDate(date)
            })
        }
        this.hideDateTimePicker();
    };

    parseHumanDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
    };
    parseTimestampDate = (date) => {
        return moment(date).valueOf();
    };
    parseFromUnixTimestamp = (date) => {
        return moment.unix(date).format("DD/MM/YYYY");
    };

    render() {
        return (
            <View style={styles.loginBox}>
                <TextInput
                    placeholder={"Title"}
                    placeholderTextColor={'#b6b6b4'}
                    defaultValue={this.state.title}
                    onChangeText={(text) => {
                        this.setState({title: text});
                    }}
                    style={styles.inputText}
                />
                <TextInput
                    placeholder={"Category"}
                    placeholderTextColor={'#b6b6b4'}
                    defaultValue={this.state.category}
                    onFocus={() => this.setState({isCategorySelectorVisible: true})}
                    style={styles.inputText}
                />
                <View style={{justifyContent:"center", alignItems: "center"}}>
                    <ListPopover
                        list={this.getCategoryNames()}
                        isVisible={this.state.isCategorySelectorVisible}
                        onClick={(item) => this.setState({category: item})}
                        onClose={() => this.setState({isCategorySelectorVisible: false})}/>
                </View>
                <TextInput
                    placeholder={"Start date"}
                    placeholderTextColor={'#b6b6b4'}
                    defaultValue={this.state.startDate}
                    onTouchStart={() => {
                        this.showStartDatePicker()
                    }}
                    onChangeText={(text) => {
                        this.setState({startDate: text});
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
                        this.setState({endDate: text});
                    }}
                    style={styles.inputText}
                />
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        this.updateHabit()
                    }}
                >
                    <Text style={{color: '#fff', fontSize: 18}}>
                        Save
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        this.deleteHabit()
                    }}
                >
                    <Text style={{color: '#fff', fontSize: 18}}>
                        Delete
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => {
                        this.completeHabit()
                    }}
                >
                    <Text style={{color: '#fff', fontSize: 18}}>
                        Complete
                    </Text>
                </TouchableOpacity>
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
    container: {
        alignItems: 'center',
        backgroundColor: '#532860',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#b8c',
        borderRadius: 4,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
    },
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
    completeButton: {
        width: '78%',
        backgroundColor: '#41A317',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user,
        categories: state.categories
    }
};

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