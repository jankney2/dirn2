import React, { Component } from 'react';

import {SafeAreaView, View, Text, StyleSheet} from 'react-native'


export default class Header extends Component {
    state = {  }
    render() {
        return (
            <SafeAreaView style={styles.header}>
<Text style={{
    textAlign:'center', 
    fontSize:24, 
    color:'white', 
    padding:15,
}}>DropIn</Text>
            </SafeAreaView>
        );
    }
}

const styles=StyleSheet.create({
header: {
    backgroundColor:'blue', 
    color:'white', 
    
}
})