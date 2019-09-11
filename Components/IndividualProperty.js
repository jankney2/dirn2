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
    let {address,ownerName, is_tracked, send_to_crm, bedrooms, bathrooms, price, distance} = this.props.property;
    if (this.state.viewInformation) {
      return (
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.viewIndividualToggler();
              console.log('fweoaijfowaeijfo');
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

          <Text style={styles.h1}>{ownerName}</Text>
          <View style={styles.trackingHolder}>
            <Button title="start Tracking" />
            <Button title="Send to CRM" />
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.lighten}>Address</Text>
            <Text>{address}</Text>
            <Text>{distance}</Text>
          </View>

          <View style={styles.mapsView}>
            <Text>Google Maps View</Text>
          </View>

          <View style={styles.contactBox}>
            <Text style={styles.lighten}>Owner Contact Info</Text>

            <Text>Phone</Text>
            <Text>Email</Text>
          </View>

          <View style={styles.houseDetails}>
            <Text style={styles.lighten}>HouseDetails</Text>
            <Text>Desired Price:{price}</Text>
            <Text>Bedrooms:{bedrooms}</Text>
            <Text>Bathrooms:{bathrooms}</Text>
            <Text>Sq Footage</Text>
          </View>
        </View>
      );
    } else {
      return (
        <KeyboardAvoidingView behavior="position">
          <TouchableOpacity
            onPress={() => {
              this.props.viewIndividualToggler();
              console.log('fweoaijfowaeijfo');
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
            <Text style={styles.h1}>{ownerName}</Text>
            <Text>Notes:{this.props.property.notes}</Text>

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
    flex: 1,
  },
  h1: {
    fontSize: 20,
    fontWeight: '600',
  },
  trackingHolder: {
    flex: 2,
    borderColor: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  addressBox: {
    borderColor: 'red',
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  contactBox: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flex: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  houseDetails: {
    flex: 2,
  },
  mapsView: {
    flex: 3,
    borderColor: 'green',
    borderWidth: 1,
  },
  lighten: {
    opacity: 0.5,
  },
});
