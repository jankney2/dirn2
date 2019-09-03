import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios'

export default class Property extends Component {
    state = { 
        tracking:this.props.tracking
     }

trackingToggler=()=>{
 axios.put(`https://dropin.business/properties/changeMobile/${this.props.deleteId}`, {userId:this.props.owningUser}).then(res=>{
     this.props.updatePropertyList(res.data)
 }).catch(err=>{
     console.log(err, 'error with toggle')
 })

}







    render() {
        return (
            <View style={styles.contain}>
                <Text>{this.props.address}</Text>
                
                <Button title={this.state.tracking?'tracking':'untracked'} 
                buttonStyle={[this.state.tracking?styles.tracking: styles.untracked, styles.button]}
                onPress={()=>{
//put request to toggle, set response 
                }}
                />
  
                <Button title={'send to crm'} 
                buttonStyle={styles.crmToggle}
                onPress={()=>{

axios.post(`https://dropin.business/properties/addToCrmList/${this.props.deleteId}`, {
    userId:this.props.owningUser, 
    currentStatus:this.props.crmStatus
}).then(res=>{
    this.props.updatePropertyList(res.data)
})
                }}
                />
                
            </View>
        );
    }
}

const styles=StyleSheet.create({
    contain: {
        flex:1, 
        justifyContent:'space-around', 
        alignItems:'center', 
        flexDirection:'row',
        padding:20
    },
    
    tracking:{
        backgroundColor:'green'
    }, 
    untracked:{
        backgroundColor:'red'
    }, 
    crmToggle: {
        backgroundColor:'blue'
    }
})