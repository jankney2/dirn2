import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import IndividualProperty from './IndividualProperty';
import Adder from './Adder';
import Geolocation from '@react-native-community/geolocation';
import CrmList from './CrmList';
import updatePropertyDistances from '../redux/actionsTypes';
import Property from './Property';
import {Button} from 'react-native-elements';

import {connect} from 'react-redux';
import Settings from './Settings';
import Properties from './AllProperties';
import Axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
class HomePage extends Component {
  state = {
    latitude: '',
    longitude: '',
    user: {},
    refreshing:false
  };

  propertyFinder = () => {
    Geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      console.log(this.state.latitude, this.state.longitude, 'coords')
      Axios.post(
        `https://dropin.business/api/userProperties/calcDistance/${this.props.activeUser.user_id}`,
        {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
      ).then(res => {
        let spliced = res.data
          .sort(function(a, b) {
            return +a.distance - +b.distance;
          })
          .splice(0, 3);

        this.setState({
          userProperties: spliced,
        });
      });
    });
  };

  componentDidMount() {
    this.propertyFinder();
    console.log(this.props.activeUser, 'user');
  }

  render() {
    return (
      <View style={styles.hello}>

        <FlatList
        refreshing={this.state.refreshing}
        onRefresh={()=>{
          this.setState({
            refreshing:true
          })
          this.propertyFinder()
      
        }}
          data={this.state.userProperties}
          renderItem={({item}) => {
            return (
              <Property
                viewIndividualToggler={() => {
                  this.viewIndividualToggler();
                }}
                updatePropertyList={newData => {
                  this.setState({
                    userProperties: newData,
                  });
                }}
                distance={item.distance}
                notes={item.user_notes}
                price={item.price}
                bedrooms={item.bedrooms}
                bathrooms={item.bathrooms}
                owner={item.seller}
                searchVal={this.state.inputVal}
                owningUser={this.props.activeUser.user_id}
                updateUserProperties={this.updateUserProperties}
                address={`${item.street}, ${item.city}`}
                tracking={item.is_tracked}
                crmStatus={item.send_to_crm}
                deleteId={item.property_id}
                style={{textAlign: 'center'}}
              />
            );
          }}
          keyExtractor={item => item.property_id.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {activeUser: state.user};
};
// const mapDispatchToProps={
// updatePropertyDistances
// }

export default connect(mapStateToProps)(HomePage);

const styles = StyleSheet.create({
  hello: {
    // height:,
    // width:350,
    // padding: 10,
    flex: 1,
    // justifyContent: 'space-around',
    // alignItems: 'center',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    width: 200,
  },
});
