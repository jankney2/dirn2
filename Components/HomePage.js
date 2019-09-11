import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import IndividualProperty from './IndividualProperty';
import Adder from './Adder';
import Geolocation from '@react-native-community/geolocation'
import CrmList from './CrmList'
import updatePropertyDistances from '../redux/actionsTypes'
import Property from './Property';
import {Button} from 'react-native-elements';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import Settings from './Settings';
import Properties from './Properties';
import Axios from 'axios';

class HomePage extends Component {
  state = {
    latitude: '',
    longitude: '',
    user: {},

  };

propertyFinder=()=>{

  Geolocation.getCurrentPosition(
    position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

    }
  );
console.log( 'state',this.state)

//   Axios.post('https://dropin.business/findClosest', {
//     userId:this.props.activeUser.user_id, 
//     latitude:this.state.latitude,
//     longitude:this.state.longitude

//   }).then(res=>{
//     //response should be properties with distances on them (ordered on backend? )
// let response=res.splice(0, 3)
// this.props.updatePropertyDistances(response)

//   })
}





  render() {
    return (
      <View style={styles.hello}>
        <Button
          buttonStyle={styles.button}
          title="Get Closest Property"
          onPress={() => {
            // this.propertyFinder()
          }}
        />
      </View>
    );
  }
}

const smallNav = createBottomTabNavigator(
  {
    settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: 'Settings',
      },
    },
    homePage: {
      screen: HomePage,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    properties: {
      screen: Properties,
      navigationOptions: {
        tabBarLabel: 'Properties',
      },
    },
    CRM: {
      screen: CrmList,
      navigationOptions: {
        tabBarLabel: 'CRM List',
      },
    },
  },
  {
    initialRouteName: 'homePage',
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: 'blue',
        shadowColor: 'black',
        shadowOffset: {width: 5, height: 3},
        borderTopWidth: 0,
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);

export default createAppContainer(smallNav);

const styles = StyleSheet.create({
  hello: {
    // height:,
    // width:350,
    padding: 10,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    width: 200,
  },
});

const mapStateToProps = state => {
  return {activeUser: state.user};
};
const mapDispatchToProps={
updatePropertyDistances
}

connect(mapStateToProps, mapDispatchToProps)(HomePage);
