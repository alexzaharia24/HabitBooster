import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableHighlight} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {fetchHabits as fetchHabitsAction} from '../actions/habits';
import moment from 'moment';


class ViewHabits extends Component {
    constructor(props) {
        super(props);
        this.itemKey = 0;
    }
    componentDidMount() {
        this.fetchHabits()
    }

    fetchHabits() {
        const uid = this.props.user.id
        console.log("Fetch habits for uid: " , uid);
        this.props.fetchHabits(uid)
            .then((response) => {
                console.log("ViewHabits fetched: ", response);
            })
    }

    _keyExtractor = (item, index) => item.id

    _onSelectItem = (item) => {
        console.log(item);
        console.log("Clicked");
        Actions.habitDetail({habit: item});
    };

    _renderHabitItem = ({item}) => {
        console.log("Rendering flatlist items");
        console.log("item: ", item);
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
        console.log("Props: ", this.props.habits.items);
        return (
            <View style={styles.mainView}>
                <FlatList
                    data={this.props.habits.items}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderHabitItem}
                />
                <TouchableHighlight
                    style={styles.refreshButton}
                    onPress={() => {
                        this.fetchHabits()
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 18 }}>
                        Refresh
                        </Text>
                </TouchableHighlight>

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