import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, View, TouchableHighlight, StyleSheet, Image, TextInput, Alert, AsyncStorage } from 'react-native';
import * as firebase from 'firebase'
import { connect } from 'react-redux';
import { signIn as signInAction, saveUser as saveUserAction } from '../actions/users';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', redirected: false };
    }

    componentDidMount() {
        //check if user is signed in
        this.isSignedIn();
    }

    componentWillReceiveProps() {
        // console.log("Redirected: ", this.state.redirected);
        // this.redirectIfSignedIn();
        this.isSignedIn();
    }

    isSignedIn() {
        console.log("Verify auth");
        if(this.state.redirected === false) {
            firebase.auth().onAuthStateChanged(
                async (user) => {
                    console.log("Verifying...")
                    if (user) {
                        console.log("Is auth... waiting for user data...");
                        let uid = await user.uid;
                        let email = await user.email;
                        let token = await user.getIdToken();
                        let name = await user.displayName;
                        console.log("User auth ", name);
    
                        this.props.saveUser(email, token, uid, name);
                        Actions.home();
    
                    } else {
                        console.log("User not auth")
                    }
                })
            this.setState({
                redirected: true
            })
        }
    }

    // async isSignedIn() {
    //     //should delete this
    //     //(fixed) could use firebase.auth().onAuthStateChanged but it fires multiple times
    //     let localToken = await AsyncStorage.getItem("token");
    //     let localEmail = await AsyncStorage.getItem("email");
    //     console.log('Local token: ', localToken);
    //     console.log('Local email: ', localEmail);
    //     console.log('Store user: ', this.props.user);

    //     let storeToken = this.props.user.token;
    //     let storeEmail = this.props.user.email;
    //     try {
    //         if (localToken !== null && localToken !== undefined && localEmail !== null && localEmail !== undefined) {
    //             // if (email !== this.props.user.email) {
    //             //     throw Error("Local email is outdated.");
    //             // }
    //             // if (token !== this.props.user.token) {
    //             //     throw Error("Local token is outdated.");
    //             // }
    //             console.log("User already signed in");
    //             const user = await firebase.auth().currentUser;
    //             console.log("Current user: ", user);
    //             this.props.saveUser(localEmail, localToken);
    //             return true;
    //         }
    //         if (storeToken !== null && storeToken !== undefined && storeEmail !== null && storeEmail !== undefined) {
    //             console.log("User recently signed in");
    //             return true;
    //         }
    //         console.log("Token or email null");
    //     } catch (error) {
    //         console.log(error);
    //         return false;
    //     }

    //     console.log("User not signed in");
    //     return false;
    // }

    async saveUserLocal(email, token) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("token", token);
    }

    // async redirectIfSignedIn() {
    //     if (this.state.redirected === false) {
    //         let authenticated = await this.isSignedIn()
    //         if (authenticated === true) {
    //             console.log("Story usery: ", this.props.user);
    //             this.setState({ redirected: true });
    //             Actions.home();
    //         }
    //     }
    // }

    signIn() {
        // Here make request to server to verify if user exists
        try {
            console.log("Try log in firebase");
            this.props.signIn(this.state.email, this.state.password)
                .then(async () => {
                    console.log("Store user: ", this.props.user);
                    await this.saveUserLocal(this.props.user.email, this.props.user.token);
                })
        } catch (error) {
            console.log("Could not sign in user: ");
            console.log(error);
        }
    }

    goToMain() {
        Actions.home({ email: this.state.email });
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
                            this.setState({ email: text });
                        }}
                        keyboardType={'email-address'}
                        style={styles.inputEmail}
                    />
                    <TextInput
                        placeholder={"Password"}
                        placeholderTextColor={'#b6b6b4'}
                        defaultValue={this.state.password}
                        onChangeText={(text) => {
                            this.setState({ password: text });
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
                        <Text style={{ color: '#fff', fontSize: 18 }}>
                            Sign in
                        </Text>
                    </TouchableHighlight>
                    <Text style={{ marginTop: 12, fontSize: 14, color: "#b6b6b4" }}>
                        <Text> Don't have an account? </Text>
                        <Text style={{ fontWeight: 'bold' }}
                            onPress={() => {
                                Actions.signUp();
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
        },
        saveUser: (email, token, id, name) => {
            return dispatch(saveUserAction(email, token, id, name))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);


