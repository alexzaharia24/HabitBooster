import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, AsyncStorage, Picker} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import firebase from 'react-native-firebase';

class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
        }
    }

    saveCategory() {
        firebase.database()
            .ref('categories')
            .push({
                name: this.state.category
            });
        Alert.alert("Hooray", "Category added");
        Actions.adminHome();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={"Category name"}
                    placeholderTextColor={'#b6b6b4'}
                    defaultValue={this.state.category}
                    onChangeText={(text) => {
                        this.setState({category: text});
                    }}
                    style={styles.inputText}
                />
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                        this.saveCategory()
                    }}
                >
                    <Text style={{color: '#fff', fontSize: 18}}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddCategory);