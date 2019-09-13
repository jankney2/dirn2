import React, {Component} from 'react';
// import {Button} from 'react-native-elements'
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import Axios from 'axios';



class Settings extends Component {
  state = {};
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
<View style={{
    display:'flex', 
    flexDirection:'row', 

    alignItems:'center'
}}>


</View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Subscription</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Settings</Text>
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
