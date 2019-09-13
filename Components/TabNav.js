import {createBottomTabNavigator, createAppContainer} from 'react-navigation'
import Settings from './Settings'
import HomePage from './HomePage'
import 
AllProperties from './AllProperties'
import CrmList from './CrmList'
const small = createBottomTabNavigator(
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
        screen: AllProperties,
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
  
  export const SmallNav=createAppContainer(small);