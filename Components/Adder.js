import React, {Component} from 'react';

import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default class Adder extends Component {
  state = {
    seller: '',
    sellerPhone: '',
    newListName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    bedrooms: '',
    price: '',
  };

  render() {
    return (
      <SafeAreaView>
          <KeyboardAvoidingView>


        <ScrollView>
          <TextInput
          placeholder='seller name (John Doe)'
          style={styles.input}
            onChangeText={text => {
              this.setState({
                seller: text,
              });
            }}
          />
          <TextInput
          placeholder='seller phone'
            keyboardType='number-pad'
            style={styles.input}
            onChangeText={text => {
              this.setState({
                sellerPhone: text,
              });
            }}
          />
          <TextInput
            placeholder='list name'
            style={styles.input}
            onChangeText={text => {
              this.setState({
                newListName: text,
              });
            }}
          />
          <TextInput
            placeholder='street'
            style={styles.input}
            onChangeText={text => {
              this.setState({
                street: text,
              });
            }}
          />
          <TextInput
            placeholder='city'
            style={styles.input}
            onChangeText={text => {
              this.setState({
                city: text,
              });
            }}
          />
          <TextInput
            placeholder='state (UT, AZ, VA)'
            style={styles.input}
            onChangeText={text => {
              this.setState({
                state: text,
              });
            }}
          />
          <TextInput
            placeholder='ZipCode'
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={text => {
              this.setState({
                zip: text,
              });
            }}
          />
          <TextInput
            placeholder='bedrooms'
            style={styles.input}
            keyboardType='number-pad'
            onChangeText={text => {
              this.setState({
                bedrooms: text,
              });
            }}
          />
          <TextInput
            placeholder='Price'
            keyboardType='number-pad'
            style={styles.input}
            onChangeText={text => {
              this.setState({
                price: text,
              });
            }}
          />

          <TouchableOpacity>
            <Button
              title="add property!"
              onPress={() => {
//UNTESTED


                Keyboard.dismiss()
                axios.post('https://dropin.business/api/addListIndividual');
              }}
            />
          </TouchableOpacity>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input:{
      borderBottomColor:'black', 
      borderBottomWidth:2, 
      padding:5
  }
});
