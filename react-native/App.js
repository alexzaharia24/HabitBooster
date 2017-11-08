/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });
//
// export default class App extends Component<{}> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js. It will be fun.
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

import React, {Component} from 'react';
import {StyleSheet} from "react-native";
import {Router, Scene, Stack} from "react-native-router-flux";
import Main from "./app/containers/Main";
import ViewGoals from "./app/containers/ViewGoals";
import SignUp from "./app/containers/SignUp";
import {createStore} from 'redux';
import {Reducer} from './app/reducers';
import {editGoal} from "./app/actions/index";
import Provider from "react-redux/src/components/Provider";
import GoalDetail from "./app/containers/GoalDetail";

// class ImageBox extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             uri: 'http://www.cravebits.com/wp-content/uploads/2014/07/1382336544-avocado.jpg',
//         }
//     }
//
//     render() {
//         return (
//             <ScrollView>
//                 <View style={{flex: 1}}>
//                     <Text style={styles.title}> Hello, {this.props.name} </Text>
//                     <Image source={{uri: this.state.uri}} style={styles.imageBox}/>
//                     <View style={{
//                         flex: 1,
//                         justifyContent: 'center',
//                         alignItems: 'center'
//                     }}>
//                         {/*<Text style={styles.title}> Hello, {this.props.name} </Text>*/}
//                         <View style={{flex: 0.2, backgroundColor: 'powderblue'}}>
//                             <Text> Hello </Text>
//                             <Text> Dude </Text>
//                         </View>
//                         <View style={{flex: .2, backgroundColor: 'skyblue'}}>
//                             <Text> Hello </Text>
//                             <Text> Dude </Text>
//                         </View>
//                         <View style={{flex: .3, backgroundColor: 'steelblue'}}>
//                             <Text> Hello </Text>
//                             <Text> Dude </Text>
//                         </View>
//                     </View>
//                     <Button
//                         onPress={() => {
//                             // this.setState({uri: 'http://bunkblog.net/wp-content/uploads/2013/01/can-dogs-eat-mangoes.jpg'});
//                             console.log(this.state);
//                         }}
//                         title={"Press me"}
//                     />
//                     <TextInput
//                         placeholder={this.state.text}
//                         onChangeText={(text) => {
//                             alert("Old: " + this.state.text + "New text: " + text);
//                             console.log("Hello");
//                             this.setState({text: text})
//                         }}
//                     />
//                 </View>
//             </ScrollView>
//         );
//     }
// }


let appStore = createStore(Reducer);

console.log(appStore.getState());

let unsubscribe = appStore.subscribe(() => {
    console.log("Modified: ", appStore.getState());
});

// appStore.dispatch(editGoal(2, "A", "Start", "End"));


export default class App extends Component {

    render() {
        return (
            <Provider store={appStore}>
                <Router>
                    <Scene key="root">
                        <Scene
                            key="main"
                            title="Main"
                            component={Main}
                        />
                        <Scene
                            key="viewGoals"
                            title="View Goals"
                            component={ViewGoals}
                        />
                        <Scene
                            key="signUp"
                            title="Sign Up"
                            component={SignUp}
                        />
                        <Scene
                            key="goalDetail"
                            title="Goal Detail"
                            component={GoalDetail}
                        />
                    </Scene>
                </Router>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: 'brown',
        fontWeight: 'bold'
    },
    imageBox: {
        height: 400
    }
});
