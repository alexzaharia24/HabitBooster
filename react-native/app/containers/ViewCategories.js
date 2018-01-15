import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, AsyncStorage} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {refreshHabits as refreshHabitsAction, fetchHabits as fetchHabitsAction} from '../actions/habits';
import moment from 'moment';
import firebase from 'react-native-firebase';
import {refreshCategories as refreshCategoriesAction} from "../actions/categories";


class ViewCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.categories
        };
    }

    componentDidMount() {
        this.fetchAndSynchronizeData();
    }

    fetchAndSynchronizeData() {
        firebase.database().ref("categories")
            .on("value", (data) => {
                const categories = [];
                const values = data.val();
                for(let v in values) {
                    let category = values[v];
                    category["id"] = v;
                    categories.push(category);
                }
                console.log("Categories: ", values);
                this.props.refreshCategories(categories);
            });
    }

    _keyExtractor = (item, index) => item.id;

    _onSelectItem = (item) => {
        console.log(item);
        Actions.categoryDetail({category: item});
    };

    _renderCategoryItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.listElement}
                              onPress={() => this._onSelectItem(item)}
            >
                <Text style={styles.habitTitle}>  {item.name} </Text>
            </TouchableOpacity>
        )
    };

    parseHumanDate = (date) => {
        return moment(date).format("DD/MM/YYYY");
    };

    render() {
        return (
            <View style={styles.mainView}>

                <FlatList
                    data={this.props.categories}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderCategoryItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
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
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        refreshCategories: (categories) => {
            return dispatch(refreshCategoriesAction(categories))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewCategories);