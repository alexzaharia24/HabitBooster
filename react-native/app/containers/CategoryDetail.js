import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, AsyncStorage, Picker} from "react-native";
import {connect} from "react-redux";
import {editHabit as editHabitAction} from "../actions/habits";
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Actions} from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ListPopover from "react-native-list-popover";


class CategoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cid: this.props.category.id,
            name: this.props.category.name,
        }
    }

    updateCategory() {
        firebase.database()
            .ref('categories/' + this.state.cid)
            .update({
                name: this.state.name
            });
        Alert.alert("Hooray", "Category updated");
        Actions.adminHome();
    }

    deleteCategory() {
        firebase.database()
            .ref('categories/' + this.state.cid)
            .remove();
        Alert.alert("Hooray", "Category deleted");
        Actions.adminHome();
    }

    render() {
        return (
            <View style={styles.loginBox}>
                <TextInput
                    placeholder={"Category name"}
                    placeholderTextColor={'#b6b6b4'}
                    defaultValue={this.state.name}
                    onChangeText={(text) => {
                        this.setState({name: text});
                    }}
                    style={styles.inputText}
                />
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        this.updateCategory()
                    }}
                >
                    <Text style={{color: '#fff', fontSize: 18}}>
                        Save
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        this.deleteCategory()
                    }}
                >
                    <Text style={{color: '#fff', fontSize: 18}}>
                        Delete
                    </Text>
                </TouchableOpacity>
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
});

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryDetail);