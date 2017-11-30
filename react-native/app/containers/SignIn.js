import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Text, View, TouchableHighlight, StyleSheet, Image, TextInput, Alert, AsyncStorage} from 'react-native';
import * as firebase from 'firebase';

import {connect} from 'react-redux';
import {signIn as signInAction} from '../actions/users';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
    }
    componentDidMount() {
        this.isSignedIn();
    }

    isSignedIn() {
        // let email, token;
        // AsyncStorage.getItem("email")
        //     .then((response) => {
        //         email = response;
        //         console.log("Local email: ", email);
        //         return AsyncStorage.getItem("token");
        //     })
        //     .then((response) => {
        //         token = response;
        //         console.log("Local token: ", token);

        //         if(email !== null && email !== undefined && token !== null && token !== undefined) {
        //             console.log("Local signing");
        //             const user = {
        //                 email: email,
        //                 token: token,
        //                 fetching: false
        //             }
        //             Actions.homeView({user: user});
        //         }
        //     })
        firebase.auth().onAuthStateChanged(
            (user) => {
                if(user) {
                    console.log("User is already signed in.");
                    return true;
                } {
                    console.log("User is not signed in.");
                    return false;
                }
            }
        )
    }

    signIn() {
        // Here make request to server to verify if user exists
        try {
            console.log("Try log in firebase");
            this.props.signIn(this.state.email, this.state.password)
                .then((response) => {
                    if(this.isSignedIn) {
                        Actions.main();
                    }
                })
        } catch (error) {
            console.log("Could not sign in user: ");
            console.log(error);
        }
    }

    goToMain() {
        Actions.main({email: this.state.email, password: this.state.password});
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>
                        Habit Booster
                    </Text>
                    {/* <Image
                        source={require('../img/logo.png')}
                        style={styles.logo}
                    /> */}
                    <Text style={styles.subtitle}>
                        You do it, we track it
                    </Text>
                </View>
                <View style={styles.loginBox}>
                    <TextInput
                        placeholder={"Email"}
                        placeholderTextColor={'#b6b6b4'}
                        defaultValue={this.state.email}
                        onChangeText={(text) => {
                            this.setState({email: text});
                        }}
                        keyboardType={'email-address'}
                        style={styles.inputEmail}
                    />
                    <TextInput
                        placeholder={"Password"}
                        placeholderTextColor={'#b6b6b4'}
                        defaultValue={this.state.password}
                        onChangeText={(text) => {
                            this.setState({password: text});
                        }}
                        secureTextEntry={true}
                        style={styles.inputPassword}
                    />
                    <TouchableHighlight
                        style={styles.buttonSignIn}
                        onPress={() => {
                            this.signIn()
                        }}
                    >
                        <Text style={{color: '#fff', fontSize: 18}}>
                            Sign in
                        </Text>
                    </TouchableHighlight>
                    <Text style={{marginTop: 12, fontSize: 14, color: "#b6b6b4"}}>
                        <Text> Don't have an account? </Text>
                        <Text style={{fontWeight: 'bold'}}
                              onPress={() => {
                                  this.goToMain();
                              }}
                        > SIGN UP </Text>
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    titleBox: {
        flex: 1.2,
        backgroundColor: '#3C91E6',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        color: '#fff',
        fontSize: 24,
    },
    subtitle: {
        color: '#fff',
        fontSize: 16,
    },
    logo: {
        height: 90,
        resizeMode: 'contain',
        marginTop: 30,
        marginBottom: 30
        // aspectRatio: 1
    },
    loginBox: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
    },
    inputEmail: {
        width: '80%',
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 12,
        fontSize: 16
    },
    inputPassword: {
        width: '80%',
        paddingTop: 20,
        paddingBottom: 12,
        fontSize: 16
    },
    buttonSignIn: {
        width: '78%',
        backgroundColor: '#4D9DE0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 14,
        paddingBottom: 14,
    },
    signUpText: {
        fontSize: 14,
    }
});


const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => {
            return dispatch(signInAction(email, password))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);

