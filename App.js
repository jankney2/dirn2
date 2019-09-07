import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {SafeAreaView} from 'react-native'
import Login from './Components/Login';
import HomePage from './Components/HomePage'
import {Provider} from 'react-redux'
import Header from './Components/Header'
import {createStore} from 'redux'
import {mobileReducer} from './redux/reducer'
const store=createStore(mobileReducer)


const Nav =createStackNavigator({
  
    login: {
        screen:Login, 

    },
    homepage:{screen:HomePage}, 
    // properties:Properties
  
},
{
initialRouteName:'login', 
defaultNavigationOptions: {

        title: 'DropIn', 
        headerTintColor:'white', 
        headerStyle: {
          backgroundColor:'blue',
            fontWeight:'bold'
        }, 
        headerLeft:null, 
        gesturesEnabled:false

}
});


const Navigator= createAppContainer(Nav)


function App(){
    return(

<Provider store={store}>
    {/* <Header/> */}
<Navigator />
</Provider>




    )
    
}

export default App