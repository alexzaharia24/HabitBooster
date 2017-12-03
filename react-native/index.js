import firebase from 'react-native-firebase'
import { AppRegistry } from 'react-native';
import App from './App';

// firebase.initializeApp({
//     apiKey: "AIzaSyCNXll1AZYcAUwWI-79g7lBVKTO29VdOss",
//     authDomain: "habitbooster-2f6e9.firebaseapp.com",
//     databaseURL: "https://habitbooster-2f6e9.firebaseio.com",
//     storageBucket: "habitbooster-2f6e9.appspot.com"
// });

AppRegistry.registerComponent('HabitBooster', () => App);
