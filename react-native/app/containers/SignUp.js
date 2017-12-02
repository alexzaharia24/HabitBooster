import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, TouchableHighlight} from "react-native";
import {Linking} from 'react-native';
import * as firebase from 'firebase'

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    async _createUser() {
        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password);

            console.log("User created: ", this.state.email);
        } catch (error) {
            console.log(error);
        }
    }

    _sendEmail() {
        let url = "mailto:";
        url += this.state.email;
        url += "?subject=";
        url += "HabitBooster Confirmation";
        url += "&body=";
        url += "This is a confirmation email for account creation of: " + this.state.name + ".";
        console.log("State: ", this.state);
        console.log("URL: ", url);
        Linking.openURL(url);
    }

    render() {
        return (
            <View>
                <View>
                    <TextInput
                        placeholder={'Name: '}
                        onChangeText={(text) => {
                            this.setState({name: text})
                        }}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder={'Email: '}
                        onChangeText={(text) => {
                            this.setState({email: text})
                        }}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder={'Password: '}
                        onChangeText={(text) => {
                            this.setState({password: text})
                        }}
                    />
                </View>
                <View>
                    <TouchableHighlight
                        title={"Create account"}
                        onPress={() => {
                            this._createUser()
                            this._sendEmail()
                        }}
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