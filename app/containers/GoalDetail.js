import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight, TextInput} from "react-native";
import {connect} from "react-redux";
import {editGoal} from "../actions/index";

class GoalDetail extends Component {
    constructor(props) {
        super(props);
        console.log("Before mount: ", this.props);
        console.log("Goal: ", this.props.goal);
        this.state = {
            id: this.props.goal.id,
            title: this.props.goal.title,
            startDate: this.props.goal.startDate,
            endDate: this.props.goal.endDate
        }
    }

    _updateGoal() {
        // console.log(this.state);
        console.log("Update: ", this.state.id);
        this.props.updateGoal(
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
                        title={"Save goal"}
                        onPress={() => {this._updateGoal()}}
                        style={styles.saveBtn}
                    >
                        <Text> Save goal </Text>
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
      updateGoal: (id, title, startDate, endDate) => {
          dispatch(editGoal(id, title, startDate, endDate))
      }
  }
};

export default connect(
    () => {return {}},
    mapDispatchToProps
)(GoalDetail);