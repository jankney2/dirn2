import React from 'react'

import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Settings from './Settings'
import HomePage from './HomePage'
import 
AllProperties from './AllProperties'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CrmList from './CrmList'
import Adder from './Adder'
const settingsIcon=<Icon name='settings' size={30} color={'black'} />
const nearby=<Icon name='my-location' size={30} color={'black'} />
const listIcon=<Icon name='format-list-bulleted' size={30} color={'black'} />
const addIcon=<Icon name='add-circle-outline' size={30} color={'black'} />

const small = createBottomTabNavigator(
    {
      settings: {
        screen: Settings,
        navigationOptions: {
          tabBarLabel: 'Settings',
          tabBarIcon:settingsIcon
        },
      },
      homePage: {
        screen: HomePage,
        navigationOptions: {
          tabBarLabel: 'Nearby',
          tabBarIcon:nearby
        },
      },
      properties: {
        screen: AllProperties,
        navigationOptions: {
          tabBarLabel: 'Properties',
          tabBarIcon:listIcon
        },
      },
      // CRM: {
      //   screen: CrmList,
      //   navigationOptions: {
      //     tabBarLabel: 'Export List',
      //   },
      // },
      adder: {
        screen:Adder, 
        navigationOptions:{
          tabBarLabel:'Add',
          tabBarIcon:addIcon
        }
      }
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
  
  export const SmallNav=createAppContainer(small);