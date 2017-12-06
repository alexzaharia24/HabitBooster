import { AsyncStorage } from 'react-native';
import {
    SIGN_IN_STARTED, SIGN_IN_SUCCESS, SIGN_IN_FAIL,
    SIGN_UP_STARTED, SIGN_UP_SUCCESS, SIGN_UP_FAIL, SAVE_USER_TOKEN, SAVE_USER,
    SIGN_OUT_STARTED, SIGN_OUT_SUCCESS, SIGN_OUT_FAIL
} from './types'

//import firebase from 'react-native-firebase';

export const signInStarted = (email) => {
    return {
        type: SIGN_IN_STARTED,
        fetching: true,
        email: email
    }
};

export const signInSuccess = () => {
    return {
        type: SIGN_IN_SUCCESS,
        fetching: false,
    }
};

export const signInFail = () => {
    return {
        type: SIGN_IN_FAIL,
        fetching: false,
        token: null
    }
};

export const saveUserToken = (token) => {
    return {
        type: SAVE_USER_TOKEN,
        fetching: false,
        token: token
    }
};

export const saveUser = (email, token, id, name) => {
    return {
        type: SAVE_USER,
        email: email,
        token: token,
        id: id,
        name: name
    }
}

export const signIn = (email, password) => {
    // email = "abc@c.com";
    // password = "123456";
    return (dispatch) => {
        dispatch(signInStarted(email));
        console.log("Email", email, " Pass: ", password);

        return firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(async (response) => {
                dispatch(signInSuccess());
                console.log("R: ", response);
                let token = null;
                console.log("Current user: ", firebase.auth().currentUser);
                await firebase.auth().currentUser.getIdToken()
                    .then((response) => {
                        let promise = new Promise(
                            (resolve, reject) => {
                                dispatch(saveUserToken(response))
                                resolve()
                                reject()    
                            }
                        )
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                    })
            })
            .catch((error) => {
                dispatch(signInFail())
                console.log("E: ", error);
            })
    }
};

//TODO: need to modify sign up to match my routes

export const signUpStarted = () => {
    return {
        type: SIGN_UP_STARTED,
        fetching: true
    }
};

export const signUpSuccess = (email) => {
    return {
        type: SIGN_UP_SUCCESS,
        fetching: false,
        email: email
    }
};

export const signUpFail = () => {
    return {
        type: SIGN_UP_FAIL,
        fetching: false
    }
};

export const signUp = (email, password, name) => {
    //TODO: upgrade to firebase
    console.log("Sign up action");
    return (dispatch) => {
        dispatch(signUpStarted());
        return firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((user) => {
                console.log("New uid: ", user.uid);
                user.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        console.log("New user name: ", user.displayName);
                    })
            })
            .catch((error) => {
                return false;
            })
    }
};

export const signOut = () => {
    return (dispatch) => {
        dispatch(signOutStarted());

        return firebase.auth().signOut()
            .then(() => {
                removeLocalCredentials();
                dispatch(signOutSuccess());
            })
            .catch((error) => {
                dispatch(signOutFail())
                console.log("E: ", error);
            })
    }
}

const removeLocalCredentials = () => {
    AsyncStorage.removeItem("email");
    AsyncStorage.removeItem("token");
}

export const signOutStarted = () => {
    return {
        type: SIGN_OUT_STARTED,
        fetching: true,
        email: null,
        token: null,
    }
};

export const signOutSuccess = () => {
    return {
        type: SIGN_OUT_SUCCESS,
        fetching: false,
    }
};

export const signOutFail = () => {
    return {
        type: SIGN_OUT_FAIL,
        fetching: false
    }
};