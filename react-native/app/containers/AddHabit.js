import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, AsyncStorage, Picker} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import firebase from 'react-native-firebase';

class AddHabit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.id,
            title: "",
            category: "",
            startDate: null,
            endDate: null,
            startDateTimestamp: 0,
            endDateTimestamp: 0,
            isStartDatePickerVisible: false,
            isEndDatePickerVisible: false,
        }
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

    async saveHabit() {
        console.log("Save habit: ", this.state);

        // let habit = {
        //     title: this.state.title,
        //     category: this.state.category,
        //     startDate: this.state.startDateTimestamp,
        //     endDate: this.state.endDateTimestamp
        // };
        //
        // let habits = await AsyncStorage.getItem("habits");
        // habits = JSON.parse(habits);
        // if (habits === null) {
        //     habits = [];
        // }
        //
        // if (habits.findIndex((h) => {
        //         return h.title === habit.title
        //     }) === -1) {
        //     // habit does not already exist
        //     habits.push(habit);
        //     AsyncStorage.setItem("habits", JSON.stringify(habits));
        //     Alert.alert("Yeei", "Habit added.");
        //     Actions.home();
        // }
        // else {
        //     Alert.alert("Ooops", "Habit with same title already exits");
        // }

        const uid = this.props.user.id;
        console.log("UID: ", uid);

        firebase.database()
            .ref('accounts/' + uid + '/habits')
            .push({
                title: this.state.title,
                category: this.state.category,
                startDate: this.state.startDateTimestamp,
                endDate: this.state.endDateTimestamp
            });
            // .then(() => {
            //
            // })
        alert("Habit added");
        Actions.home();
    }

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
                    onChangeText={(text) => {
                        this.setState({category: text});
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
                        this.saveHabit()
                    }}
                >
                    <Text style={{color: '#fff', fontSize: 18}}>
                        Save
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
});

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddHabit);