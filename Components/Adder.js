import React, { Component } from 'react';

import {View, Button, Text, StyleSheet, TextInput, ScrollView, SafeAreaView} from 'react-native'



export default class Adder extends Component {
    state = { 
        seller:'', 
        sellerPhone:'', 
        newListName:'', 
        street:'', 
        city:'', 
        state:'', 
        zip:'', 
        bedrooms:'', 
        price:''
     }
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <TextInput onChangeText={this.textChanger} />
                </ScrollView>
            </SafeAreaView>
        
        );
    }
}

seller,
      bathrooms,
      newListName,
      street,
      city,
      state,
      zip,
      bedrooms,
      price, 

const styles=StyleSheet.create({
    contain: {
        flex:1, 
        justifyContent:'space-evenly',
        alignItems:'center' 

    }
})