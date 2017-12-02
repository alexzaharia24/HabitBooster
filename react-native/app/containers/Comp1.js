import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Drawer, Actions } from 'react-native-router-flux';

export default class Comp1 extends Component {
    render() {
        console.log("Comp 1");
        return (
            <View>
                <Text> Comp 1 </Text>
            </View>
        )
    }
}