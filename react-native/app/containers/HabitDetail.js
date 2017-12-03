import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight, TextInput} from "react-native";
import {connect} from "react-redux";
import {editHabit} from "../actions/index";

class HabitDetail extends Component {
    constructor(props) {
        super(props);
        console.log("Before mount: ", this.props);
        console.log("Habit: ", this.props.habit);
        this.state = {
            id: this.props.habit.id,
            title: this.props.habit.title,
            startDate: this.props.habit.startDate,
            endDate: this.props.habit.endDate
        }
    }

    _updateHabit() {
        console.log("Update: ", this.state.id);
        this.props.updateHabit(
            this.state.id,
            this.state.title,
            this.state.startDate,
            this.state.endDate
        )
    }

    render() {
        return (
            <View>
                <View>
                    <Text> Id: </Text>
                    <TextInput
                        placeholder={'Id'}
                        value={this.state.id.toString()}
                        editable={false}
                    />
                </View>
                <View>
                    <Text> Title: </Text>
                    <TextInput
                        placeholder={'Title'}
                        value={this.state.title}
                        onChangeText={(text) => {
                            this.setState({title: text})
                        }}
                    />
                </View>
                <View>
                    <Text> Start date: </Text>
                    <TextInput
                        placeholder={'Start date'}
                        value={this.state.startDate}
                        onChangeText={(text) => {
                            this.setState({startDate: text})
                        }}
                    />
                </View>
                <View>
                    <Text> End date: </Text>
                    <TextInput
                        placeholder={'End Date'}
                        value={this.state.endDate}
                        onChangeText={(text) => {
                            this.setState({endDate: text})
                        }}
                    />
                </View>
                <View>
                    <TouchableHighlight
                        title={"Save habit"}
                        onPress={() => {this._updateHabit()}}
                        style={styles.saveBtn}
                    >
                        <Text> Save habit </Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    saveBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "skyblue",
        padding: 20,
    }
});

const mapDispatchToProps = (dispatch) => {
  return {
      updateHabit: (id, title, startDate, endDate) => {
          dispatch(editHabit(id, title, startDate, endDate))
      }
  }
};

export default connect(
    () => {return {}},
    mapDispatchToProps
)(HabitDetail);