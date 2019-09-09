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

            <Text>{this.state.seller}</Text>

          <TouchableOpacity>
            <Button
              title="add property!"
              onPress={() => {
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

// seller,
//       bathrooms,
//       newListName,
//       street,
//       city,
//       state,
//       zip,
//       bedrooms,
//       price,

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input:{
      borderBottomColor:'black', 
      borderBottomWidth:2
  }
});
