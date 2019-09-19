import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import {Button} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Axios from 'axios';
class IndividualProperty extends Component {
  state = {
    viewInformation: true,
    newNoteInput: '',
  };

  render() {
    let {
      address,
      latitude,
      longitude,
      ownerName,
      is_tracked,
      send_to_crm,
      bedrooms,
      bathrooms,
      price,
      distance,
    } = this.props.property;
    if (this.state.viewInformation) {
      return (
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flex: 1,
          }}>
        

          <View style={styles.header}>
            <Button
              title="Information"
              type="clear"
              titleStyle={{color: 'black', fontSize: 14}}
              onPress={() => {
                this.setState({
                  viewInformation: true,
                });
              }}
            />

            <Button
              title="Notes"
              type="clear"
              titleStyle={{color: 'black', fontSize: 14}}
              onPress={() => {
                this.setState({
                  viewInformation: false,
                });
              }}
            />
            <Button
              title="Back to List"
              type="clear"
              titleStyle={{color: 'black', fontSize: 14}}
              onPress={() => {
                this.props.viewIndividualToggler();
              }}
            />
          </View>
          <View style={{flex: 3, width: '95%', marginLeft: '2.5%'}}>
            <Text style={styles.h1}>{ownerName}</Text>
            <View style={styles.trackingHolder}>
              <Button
                buttonStyle={styles.buttonStyle}
                titleStyle={{color: 'black', fontSize: 12, fontWeight: '500'}}
                type="outline"
                title="Delete Property"
              />
              <Button
                title="Send to CRM"
                titleStyle={{color: 'black', fontSize: 12, fontWeight: '500'}}
                buttonStyle={styles.buttonStyle}
                type="outline"
              />
            </View>

            <View style={styles.addressBox}>
              <Text style={styles.lighten}>Address</Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginTop: '1%',
                }}>
                <Text style={{maxWidth: '33%'}}>{address}</Text>
                <Text style={{color: 'blue'}}>({distance} miles away)</Text>
              </View>
            </View>
          </View>

          <View style={styles.mapsView}>
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: +latitude,
                longitude: +longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                title={`${address}`}
                coordinate={{
                  latitude: +latitude,
                  longitude: +longitude,
                }}
              />
            </MapView>
          </View>

          <View style={{width: '95%', marginLeft: '2.5%', flex: 3}}>
            <View style={styles.contactBox}>
              <Text style={styles.lighten}>Owner Contact Info</Text>

              <Text>Phone:</Text>
              <Text>Email:</Text>
            </View>

            <View style={styles.houseDetails}>
              <Text style={styles.lighten}>HouseDetails</Text>
              <Text>Desired Price:{price}</Text>
              <Text>Bedrooms:{bedrooms}</Text>
              <Text>Bathrooms:{bathrooms}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <KeyboardAvoidingView behavior="position">
          <TouchableOpacity
            onPress={() => {
              this.props.viewIndividualToggler();
            }}
            style={{position: 'absolute', top: '3%', left: '1%'}}>
            <Text>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.headerTwo}>
            <Button
              title="Information"
              type="clear"
              titleStyle={{color: 'black', fontSize: 14}}
              onPress={() => {
                this.setState({
                  viewInformation: true,
                });
              }}
            />

            <Button
              title="Notes"
              type="clear"
              titleStyle={{color: 'black', fontSize: 14}}
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
              style={
                {
                  // width: '80%',
                  // marginLeft: '10%',
                  // borderColor: 'black',
                  // borderWidth: 1,
                  // height: '70%',
                }
              }
              onChangeText={text => {
                this.setState({
                  newNoteInput: text,
                });
              }}
            />
            <Text style={{textAlign: 'right', color: 'blue'}}>
              {this.state.newNoteInput.length}/1000{' '}
              {this.props.property.property_id}
            </Text>

            <Button
              title="save note"
              type="clear"
              titleStyle={{color: 'black'}}
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
    backgroundColor: 'rgba(0,0,0,.05)',
    flex: 1,
  },
  h1: {
    fontSize: 36,
    fontWeight: '600',
  },
  trackingHolder: {
    flex: 1,
    // borderColor: 'yellow',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressBox: {
    // borderColor: 'red',
    // borderWidth: 2,
    flex: 1,
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
    flex: 2,
    // borderColor: 'green',
    // borderWidth: 1,
  },
  lighten: {
    opacity: 0.5,
  },
  buttonStyle: {
    borderColor: 'black',
    paddingLeft: 40,
    paddingRight: 40,
  },
  notesView: {
    width: '95%',
    marginLeft: '2.5%',
    display: 'flex',
  },
  headerTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.05)',
  },
});
