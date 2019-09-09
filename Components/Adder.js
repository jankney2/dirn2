import React, { Component } from 'react';

import {View, Button, Text, StyleSheet} from 'react-native'



export default class Adder extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.contain}>
                <Text>Adder</Text>
            </View>
        );
    }
}



const styles=StyleSheet.create({
    contain: {
        flex:1, 
        justifyContent:'center'
    }
})