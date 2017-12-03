import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";

class ViewHabits extends Component {

    _keyExtractor = (item, index) => item.id;

    _onSelectItem = (item) => {
        console.log(item);
        console.log("Clicked");
        Actions.habitDetail({habit: item});
    };

    _renderHabitItem = ({item}) => {
        return (
            <TouchableHighlight
                onPress={() => this._onSelectItem(item)}
            >
                <Text> {item.id}. {item.title} </Text>
            </TouchableHighlight>
        )
    };

    render() {
        console.log("ViewHabits");
        console.log("Props: ", this.props);
        return (
            <View style={styles.mainView}>
                <Text> View Habits scene </Text>
                <FlatList
                    data={this.props.habits}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderHabitItem}
                />

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        habits: state.habits
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
)(ViewHabits);