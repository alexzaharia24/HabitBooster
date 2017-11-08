import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";

class ViewGoals extends Component {

    _keyExtractor = (item, index) => item.id;

    _onSelectItem = (item) => {
        console.log(item);
        console.log("Clicked");
        Actions.goalDetail({goal: item});
    };

    _renderGoalItem = ({item}) => {
        return (
            <TouchableHighlight
                onPress={()=>this._onSelectItem(item)}
            >
                <Text> {item.id}. {item.title} </Text>
            </TouchableHighlight>
        )
    };

    render() {
        console.log("ViewGoals");
        console.log("Props: ", this.props);
        return (
            <View style={styles.mainView}>
                <Text> View Goals scene </Text>
                <FlatList
                    data={this.props.goals}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderGoalItem}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        goals: state.goals
    }
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
});

export default connect(
    mapStateToProps,
    {}
)(ViewGoals);