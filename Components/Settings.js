import React, {Component} from 'react';
// import {Button} from 'react-native-elements'
import {View, Text, StyleSheet, Button, Linking} from 'react-native';
import {connect} from 'react-redux';
import Axios from 'axios';



class Settings extends Component {
  state = {};

  componentDidMount() {
    console.log(Linking, 'linking')
  }
  

  render() {

    phoneSplitter=(str)=>{
      let newStr=str.split('')
    }
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.heading}>Account</Text>
          <Text>{this.props.activeUser.first_name} {this.props.activeUser.last_name}</Text>
          <Text>Email: {this.props.activeUser.user_email}</Text>
          <Text>Phone: {this.props.activeUser.user_phone}</Text>

        </View>

        {/* <View style={styles.section}>
          <Text style={styles.heading}>Subscription</Text>
        </View> */}

        <View style={styles.section}>
          <Text style={styles.heading}>About</Text>
          <Text>DropIn is an app

            We are in an early version of dropin! if you run into an issue, please reach out to us! 
          </Text>
          <Button onPress={() => Linking.openURL('mailto:jhankney@gmail.com').catch(err=>{
            console.log(err, 'link error')
          }) }
      title="email us!" />
        </View>

        <Button 
        onPress={()=>{
          Axios.get('http://dropin.business/auth/logout').then(res=>{
            this.props.navigation.navigate('login')
          })
        }}
        title="Logout" />
      </View>
    );
  }
}


const mapStateToProps=(state)=> {
  return {activeUser:state.user}
}

export default connect(mapStateToProps)(Settings)

const styles = StyleSheet.create({
  section: {
display: 'flex', 
justifyContent:'space-evenly',
borderBottomWidth:1, 
borderBottomColor:'black'
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flex: 1,
    width:'90%',
    marginLeft: '5%'
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom:20,
  },
  button: {
    borderColor:'black',
    borderWidth:2,
    borderRadius:20,
    backgroundColor:'white'

  }
});
