import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Drawer, Actions } from 'react-native-router-flux';

export default class Comp2 extends Component {
    render() {
        console.log("Comp 2");
        return (
            <View>
                <Text> Comp 2 </Text>
            </View>
        )
    }
}