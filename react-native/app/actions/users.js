import {
    SIGN_IN_STARTED, SIGN_IN_SUCCESS, SIGN_IN_FAIL,
    SIGN_UP_STARTED, SIGN_UP_SUCCESS, SIGN_UP_FAIL, SAVE_USER_TOKEN,
    SIGN_OUT_STARTED, SIGN_OUT_SUCCESS, SIGN_OUT_FAIL
} from './types'

import * as firebase from 'firebase';

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

export const signIn = (email, password) => {
    email = "abc@c.com";
    password = "123456";
    return (dispatch) => {
        dispatch(signInStarted(email));
        console.log("Email" , email, " Pass: ", password);

        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => {
                dispatch(signInSuccess());
                console.log("R: ", response);
                let token = null;
                firebase.auth().currentUser.getIdToken()
                    .then((response) => {
                        dispatch(saveUserToken(response));
                        console.log("Token: ", response);
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

export const signUp = (email, password) => {
    return (dispatch) => {
        dispatch(signUpStarted());
        return fetch("https://damp-refuge-96622.herokuapp.com/user", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: email,
                    password: password,
                },
            })
        })
            .then((response) => {
                if (response.status == 200) {
                    dispatch(signUpSuccess(email));
                    console.log("User created");
                    return true;
                } else {
                    dispatch(signUpFail());
                    return false
                }
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
                dispatch(signOutSuccess());
            })
            .catch((error) => {
                dispatch(signOutFail())
                console.log("E: ", error);
            })
    }
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