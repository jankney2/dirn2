import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
class IndividualProperty extends Component {
  state = {
    viewInformation: true,
    newNoteInput:'', 
    noteLength:newNoteInput.length
  };

  componentDidMount() {
    console.log(this.props.property);
  }
  render() {
    if (this.state.viewInformation) {
      return (
        <View>
          <View style={styles.header}>
            <Button
              title="information"
              onPress={() => {
                this.setState({
                  viewInformation: true,
                });
              }}
            />

            <Button
              title="notes"
              onPress={() => {
                this.setState({
                  viewInformation: false,
                });
              }}
            />
          </View>

          <Text style={styles.h1}>Client Name Off Redux</Text>

          <View style={styles.trackingHolder}>
            <Button title="start Tracking" />
            <Button title="Send to CRM" />
          </View>

          <View style={styles.addressBox}>
            <Text>Address</Text>
            <Text>Disatnce away</Text>
          </View>

          <View style={styles.mapsView}>
            <Text>Google Maps View</Text>
          </View>

          <View style={styles.contactBox}>
            <Text>Owner Contact Info</Text>
            <Text>Name</Text>
            <Text>Phone</Text>
            <Text>Email</Text>
          </View>
          
          
          <View style={styles.houseDetails}>
            <Text>HouseDetails</Text>
            <Text>Desired Price</Text>
            <Text>Bedrooms</Text>
            <Text>Bathrooms</Text>
            <Text>Sq Footage</Text>
          </View>

        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.header}>
            <Button
              title="information"
              onPress={() => {
                this.setState({
                  viewInformation: true,
                });
              }}
            />

            <Button
              title="notes"
              onPress={() => {
                this.setState({
                  viewInformation: false,
                });
              }}
            />
          </View>
              <View style={styles.notesView}>
                  <Text>Owner Name</Text>
              <Text>User Notes from Redux</Text>

                <TextInput placeholder="Add note..."
                onChangeText={(text)=>{
                    this.setState({
                        newNoteInput:text
                    })
                }} />              

              </View>



        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {property: state.displayProperty};
};

export default connect(
  mapStateToProps,
  null,
)(IndividualProperty);

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});
