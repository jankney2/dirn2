import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Axios from 'axios';
class IndividualProperty extends Component {
  state = {
    viewInformation: true,
    newNoteInput: '',
  };

  componentDidMount() {
    console.log(this.props.property);
  }
  render() {

    let {address, is_tracked, send_to_crm}=this.props.property
    if (this.state.viewInformation) {
      return (
        <View>
          <TouchableOpacity onPress={()=>{
              this.props.viewIndividualToggler()
              console.log('fweoaijfowaeijfo')
          }}>
            <Text>X</Text>
          </TouchableOpacity>
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
            <Text>{address}</Text>
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
        <KeyboardAvoidingView behavior="position">
          <TouchableOpacity onPress={()=>{
              this.props.viewIndividualToggler()
              console.log('fweoaijfowaeijfo')
          }}>
            <Text>X</Text>
          </TouchableOpacity>
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

            <TextInput
              multiline={true}
              placeholder="Add note..."
              style={{
                width: '80%',
                marginLeft: '10%',
                borderColor: 'black',
                borderWidth: 1,
                height: '70%',
              }}
              onChangeText={text => {
                this.setState({
                  newNoteInput: text,
                });
              }}
            />
            <Text>
              Characters Left:{this.state.newNoteInput.length}/1000{' '}
              {this.props.property.property_id}
            </Text>

            <Button
              title="save note"
              onPress={() => {
                Axios.put(
                  `https://dropin.business/properties/addNote/${this.props.property.property_id}`,
                  {},
                );
              }}
            />
          </View>
        </KeyboardAvoidingView>
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
