import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setUser} from '../redux/actionsTypes';
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
              value={this.state.passVal}
              style={styles.inputs}
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
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
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
    backgroundColor:'blue', 

  },
});

const mapDispatchToProps = {
  setUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
