import React, { Component } from 'react';

import {View, Text} from 'react-native'
export default class IndividualProperty extends Component {
    state = {  }
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