import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios'

export default class Property extends Component {
    state = { 
        tracking:this.props.tracking
     }

trackingToggler=()=>{
    this.setState({
        tracking:!this.state.tracking
    })
    let trueFalse=this.state.tracking

    Alert.alert(this.state.tracking)
    axios.put(`https://dropin.business/properties/${this.props.deleteId}`, {
    userId:14, 
        trackingStatus:trueFalse
    })
    .then((res)=>{
        
      this.props.dataUpdater(res.data)  
    }).catch(err=>Alert.alert(err))
}







    render() {
        return (
            <View style={styles.contain}>
                <Text>{this.props.address}</Text>
                
                <Button title={this.state.tracking?'tracking':'untracked'} 
                buttonStyle={[this.state.tracking?styles.tracking: styles.untracked, styles.button]}
                onPress={this.trackingToggler}
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
    }
})