import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert, 
  TextInput
} from "react-native";
import axios from "axios";
import {connect} from 'react-redux'
import Property from "./Property";
import { SafeAreaView } from "react-navigation";
import {SearchBar} from 'react-native-elements'



class Properties extends Component {
  state = {
    userProperties: [],
    inputVal:''

  };

  componentDidMount() {
    axios
      .get(`https://dropin.business/api/userProperties/${this.props.activeUser.user_id}`)
      .then(res => {
        this.setState({
          userProperties: res.data
        });
      })
      .catch(err => Alert.alert(err));
  }

  inputChange=text=>{
    
    let searchFilter= this.state.userProperties.filter(el=>{
      
      return el.street.toLowerCase().includes(text.toLowerCase()) || el.city.toLowerCase().includes(text.toLowerCase())
    })
    this.setState({
      [text.name]:text, 

    })

  }
  
  
  render() {
    
    
    return (

      <SafeAreaView>

      <TextInput name= 'inputVal' onChangeText={this.inputChange} />

      <ScrollView>
        <View style={styles.contain}>
          <Text>Properties</Text>

          <FlatList
            data={this.state.userProperties}
            renderItem={({ item }) => {
              return (
                <Property
                  updatePropertyList={(newData)=>{
                    this.setState({
                      userProperties:newData
                    })
                  }}
                  owningUser={this.props.activeUser.user_id}
                  updateUserProperties={this.updateUserProperties}
                  address={`${item.street}, ${item.city}`}
                  tracking={item.is_tracked}
                  crmStatus={item.send_to_crm}
                  deleteId={item.property_id}
                  style={{ textAlign: "center" }}
                />
               );
            }}
            keyExtractor={item => item.property_id.toString()}
          />
        </View>
      </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps=state=>{
  return {activeUser:state.user}
}
export default connect(mapStateToProps)(Properties)