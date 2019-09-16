import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {updateDisplayProperty} from '../redux/actionsTypes';
import {connect} from 'react-redux';
import axios from 'axios';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import IndividualProperty from './IndividualProperty';


class Property extends Component {
  state = {
    tracking: this.props.tracking,
  };

  

  trackingToggler = () => {
    axios
      .put(
        `https://dropin.business/properties/changeMobile/${this.props.deleteId}`,
        {userId: this.props.owningUser},
      )
      .then(res => {
        this.props.updatePropertyList(res.data);
      })
      .catch(err => {
        console.log(err, 'error with toggle');
      });
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.updateDisplayProperty({
            address: this.props.address,
            ownerName: this.props.owner,
            distance: this.props.distance,
            price:this.props.price, 
            bedrooms:this.props.bedrooms, 
            bathrooms:this.props.bathrooms, 
            notes:this.props.notes, 
            latitude: this.props.latitude, 
            longitude: this.props.longitude
          });
          this.props.viewIndividualToggler()
        }}>
        <View style={styles.contain}>

          <Text style={styles.textHeader}>{this.props.owner}</Text>
          <Text style={styles.smallText}>{this.props.address}</Text>
          <Text style={[styles.smallText, styles.blueText]}>({this.props.distance} miles away)</Text>

          {/* <Button
          title={this.state.tracking ? 'tracking' : 'untracked'}
          buttonStyle={[
            this.state.tracking ? styles.tracking : styles.untracked,
            styles.button,
          ]}
          onPress={() => {
            //put request to toggle, set response
          }}
        /> */}

          {/* <Button
          title={'send to crm'}
          buttonStyle={styles.crmToggle}
          onPress={() => {
            axios
              .post(
                `https://dropin.business/properties/addToCrmList/${this.props.deleteId}`,
                {
                  userId: this.props.owningUser,
                  currentStatus: this.props.crmStatus,
                },
              )
              .then(res => {
                this.props.updatePropertyList(res.data);
              });
          }}
        /> */}
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDispatchToProps = {
  updateDisplayProperty,
};

export default connect(
  null,
  mapDispatchToProps,
)(Property);

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom:20,
    borderBottomColor: 'rgba(0,0,0,.15)',
    borderBottomWidth: 2,
    marginLeft:'10%'


  },
  textHeader: {
    fontSize: 24,
    fontWeight: '600',
  },
  smallText: {
    padding: 5,
  },

  tracking: {
    backgroundColor: 'green',
  },
  untracked: {
    backgroundColor: 'red',
  },
  crmToggle: {
    backgroundColor: 'blue',
  },
  blueText:{
    color:'blue'
  }
});
