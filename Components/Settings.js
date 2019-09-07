import React, {Component} from 'react';
// import {Button} from 'react-native-elements'
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
export default class Settings extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.heading}>Account</Text>
          <Text>FirstName LastName</Text>
          <Text>Email</Text>
          <Text>Phone Number</Text>
<View style={{
    display:'flex', 
    flexDirection:'row', 

    alignItems:'center'
}}>

    <Text>Password</Text>
          <Button 

          color="black"
          buttonStyle={styles.button}
          title="Change Password" />

</View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Subscription</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Settings</Text>
        </View>

        <Button 

        title="Logout" />
      </View>
    );
  }
}

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
