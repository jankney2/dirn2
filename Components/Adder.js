import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
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
              placeholder="seller name (John Doe)"
              style={styles.input}
              onChangeText={text => {
                this.setState({
                  seller: text,
                });
              }}
            />
            <TextInput
              placeholder="seller phone"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={text => {
                this.setState({
                  sellerPhone: text,
                });
              }}
            />
            <TextInput
              placeholder="seller email"
              style={styles.input}
              onChangeText={text => {
                this.setState({
                  email: text,
                });
              }}
            />

            <TextInput
              placeholder="street"
              style={styles.input}
              onChangeText={text => {
                this.setState({
                  street: text,
                });
              }}
            />
            <TextInput
              placeholder="city"
              style={styles.input}
              onChangeText={text => {
                this.setState({
                  city: text,
                });
              }}
            />
            <TextInput
              placeholder="state (UT, AZ, VA)"
              style={styles.input}
              onChangeText={text => {
                this.setState({
                  state: text,
                });
              }}
            />
            <TextInput
              placeholder="ZipCode"
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={text => {
                this.setState({
                  zip: text,
                });
              }}
            />
            <TextInput
              placeholder="bedrooms"
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={text => {
                this.setState({
                  bedrooms: text,
                });
              }}
            />
            <TextInput
              placeholder="bathrooms"
              style={styles.input}
              keyboardType="number-pad"
              onChangeText={text => {
                this.setState({
                  bathrooms: text,
                });
              }}
            />
            <TextInput
              placeholder="Price"
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={text => {
                this.setState({
                  price: text,
                });
              }}
            />

            <TouchableOpacity>
              <Button
                buttonStyle={{backgroundColor: 'red'}}
                title="add property!"
                onPress={() => {
                  //UNTESTED

                  Keyboard.dismiss();
                  axios
                    .post('https://dropin.business/api/mobileAdd/14', { 
                      properties:[
                        {
                          seller: this.state.seller,
                          bathrooms: this.state.bathrooms,
                          street: this.state.street,
                          city: this.state.city,
                          zip: this.state.zip,
                          state: this.state.state,
                          bedrooms: this.state.bedrooms,
                          price: this.state.price,
                          phone: this.state.sellerPhone,
                          email: this.state.email,
                        }
                      ]
                    })
                    .then(res => {
                      this.setState({
                        seller: '',
                        bathrooms: '',
                        street: '',
                        city: '',
                        zip: '',
                        state: '',
                        bedrooms: '',
                        price: '',
                        phone: '',
                        email: '',
                      })
                      console.log(res.data, 'dammmmmit')
                      // this.props.navigation.navigate('properties');
                    }).catch(err=>{
                      console.log(err)
                    });
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
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    padding: 5,
  },
});
