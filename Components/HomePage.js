import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import IndividualProperty from './IndividualProperty';
import Adder from './Adder'


import Property from './Property';
import {Button} from 'react-native-elements';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
import Settings from './Settings';
import Properties from './Properties';

class HomePage extends Component {
  state = {
    latitude: '',
    longitude: '',
    user: {},
    counter: 0,
  };

  render() {
    return (
      <View style={styles.hello}>
        <Text style={styles.header}>Begin location tracking</Text>
        <Text>{`Coords:${this.state.latitude} ${this.state.longitude}`}</Text>
        <Button
          buttonStyle={styles.button}
          title="click for location"
          onPress={() => {
            navigator.geolocation.getCurrentPosition(
              position => {
                this.setState({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });

                // axios.post(`https://dropin.business/api/test/${this.props.activeUser.user_id}`, {
                //   userLat:this.state.latitude,
                //   userLong:this.state.longitude
                // })
              },
              err => {
                console.log(err);
              },
            );
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
    add: {
      screen: Adder,
      navigationOptions:{
        tabBarLabel:'ADD'
      }
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
connect(mapStateToProps)(HomePage);
