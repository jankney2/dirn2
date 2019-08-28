import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from './Components/Login';
import HomePage from './Components/HomePage'
import Properties from './Components/Properties';
import {Provider} from 'react-redux'

import {createStore} from 'redux'
import {mobileReducer} from './redux/reducer'
const store=createStore(mobileReducer)


const Nav =createStackNavigator({
  
    login: Login,
    homepage:HomePage, 
    properties:Properties
  
},
{
initialRouteName:'login'
});


const Navigator= createAppContainer(Nav)


function App(){
    return(

<Provider store={store}>
<Navigator />
</Provider>




    )
    
}

export default App