import React, { Component } from 'react';
import {connect} from 'react-redux'
import {View, Text} from 'react-native'
 class IndividualProperty extends Component {
    state = {  }

    componentDidMount() {
        console.log(this.props.property)
    }
    render() {
        return (
            <View>
                <Text>Property</Text>
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