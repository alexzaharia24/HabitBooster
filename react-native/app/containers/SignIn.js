import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {Text, View, TouchableHighlight, StyleSheet, Image, TextInput, Alert, AsyncStorage} from 'react-native';
import firebase from 'react-native-firebase'
import {connect} from 'react-redux';
import {signIn as signInAction, saveUser as saveUserAction} from '../actions/users';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', redirected: false};
    }

    componentDidMount() {
        //check if user is signed in
        this.isSignedIn();
    }

    componentWillReceiveProps() {
        this.isSignedIn();
    }

    isSignedIn() {
        console.log("Verify auth");
        if (this.state.redirected === false) {
            firebase.auth().onAuthStateChanged(
                async (user) => {
                    console.log("Verifying...");
                    if (user) {
                        console.log("Is auth... waiting for user data...");
                        let uid = await user.uid;
                        let email = await user.email;
                        let token = await user.getIdToken();
                        let name = await user.displayName;
                        console.log("User auth ", name);

                        this.isAdmin({uid, email, name, token})
                            .then((isAdmin) => {
                                this.props.saveUser(email, token, uid, name, isAdmin);
                                Actions.common();
                            });
                    } else {
                        console.log("User not auth")
                    }
                });
            this.setState({
                redirected: true
            })
        }
    }

    isAdmin(user) {
        return firebase.database().ref("admins")
            .once('value')
            .then((data) => {
                const values = data.val();
                console.log("User: ", user);
                console.log("Admins: ", values);
                return values[user.uid] !== undefined;
            })
    }

    async saveUserLocal(email, token) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("token", token);
    }

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
        Actions.home({email: this.state.email});
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>
                        Habit Booster
                    </Text>
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
        saveUser: (email, token, id, name, isAdmin) => {
            return dispatch(saveUserAction(email, token, id, name, isAdmin))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);


