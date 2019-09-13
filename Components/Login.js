import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUser} from '../redux/actionsTypes';
import Geolocation from '@react-native-community/geolocation'
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import {Button, Input} from 'react-native-elements';

import axios from 'axios';

class Login extends Component {
  state = {
    phoneVal: '',
    passVal: '',
    isRegister: false,
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  changeHandler = text => {
    this.setState({
      [text.name]: text,
    });
  };

  loginHandler = () => {
    //axios request
    axios
      .post('https://dropin.business/auth/login', {
        pass: this.state.passVal,
        phone: this.state.phoneVal,
      })
      .then(res => {
        this.props.setUser(res.data.user);

        this.setState({
          phoneVal: '',
          passVal: '',
        });
        Keyboard.dismiss();
        this.props.navigation.navigate('homepage');
      })
      .catch(err => {
        console.error(err, 'login error');
      });
  };

  render() {
    if (!this.state.isRegister) {
      return (
        <SafeAreaView>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.logincont}>
              <TextInput
                name="phoneVal"
                keyboardType="number-pad"
                style={styles.inputs}
                placeholder="Phone"
                value={this.state.phoneVal}
                onChangeText={text => {
                  this.setState({
                    phoneVal: text,
                  });
                }}
              />

              <TextInput
                name="passVal"
                style={styles.inputs}
                value={this.state.passVal}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => {
                  this.setState({
                    passVal: text,
                  });
                }}
              />

              <Button
                title="login"
                buttonStyle={styles.buttonStyle}
                onPress={this.loginHandler}
              />
              <Button
                onPress={() => {
                  this.setState({
                    isRegister: !this.state.isRegister,
                  });
                }}
                title="Not a member? Register Here"
              />


            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      );
    } else {
      return (
        <View>
          <TextInput
            style={styles.inputs}
            autoCorrect={false}
            placeholder="First Name"
            onChangeText={text => {
              this.setState({
                firstName: text,
              });
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Last Name"
            autoCorrect={false}
            onChangeText={text => {
              this.setState({
                lastName: text,
              });
            }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="phone number"
            keyboardType="number-pad"
            onChangeText={text => {
              this.setState({
                phone: text,
              });
            }}
          />
          <TextInput
            style={styles.inputs}
            autoCorrect={false}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={text => {
              this.setState({
                email: text,
              });
            }}
          />
          <TextInput
            style={styles.inputs}
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({
                password: text,
              });
            }}
          />

          <Button title="register!"
          onPress={()=>{
             let {phone, firstName, email, password, lastName}=this.state
            axios.post('https://dropin.business/auth/register', {
              phone: phone,
              firstName: firstName,
              lastName: lastName,
              email: email,
              pass: password
            }).then(res=>{

              this.props.navigation.navigate('homePage')
            })
          }}
          />

          <Button title="cancel" onPress={()=>{
            this.setState({
              isRegister:!this.state.isRegister
            })
          }}/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  inputs: {
    fontSize: 24,
    textAlign: 'left',
    backgroundColor: 'white',
    padding: 15,
    width: 250,
    margin: 10,
    borderRadius: 30,
    zIndex: 2,
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 50,
  },
  logincont: {
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonStyle: {
    marginTop: 50,
    backgroundColor: 'blue',
  },
});

const mapDispatchToProps = {
  setUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);



