import React, { Component } from 'react';
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Button} from 'react-native'
 class IndividualProperty extends Component {
    state = { 
        selectedView:'information'
     }

    componentDidMount() {
        console.log(this.props.property)
    }
    render() {
        return (
            <View>
<View style={styles.header}>
<Button onPress={()=>{
    this.setState({
        selectedView:'information'
    })
}}>Information</Button>
<Button onPress={()=>{
    this.setState({
        selectedView:'notes'
    })
}}>Notes</Button>
</View>
            </View>
        );
    }
}




const mapStateToProps = state => {
    return {property: state.displayProperty};
  };
  
  export default connect(
    mapStateToProps,
    null,
  )(IndividualProperty);


  const styles=StyleSheet.create({
    header:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-evenly', 
        alignItems:'center', 
        backgroundColor:'green'
    }
  })