import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import IndividualProperty from './IndividualProperty';
import Adder from './Adder';
import {updateDisplayProperty} from '../redux/actionsTypes'
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
        let reduxSplice=res.data[0]
        this.props.updateDisplayProperty({
          address: reduxSplice.address,
          ownerName: reduxSplice.owner,
          distance: reduxSplice.distance,
          price:reduxSplice.price, 
          bedrooms:reduxSplice.bedrooms, 
          bathrooms:reduxSplice.bathrooms, 
          notes:reduxSplice.notes, 
          latitude: reduxSplice.latitude, 
          longitude: reduxSplice.longitude
        })
        
        let spliced = res.data
          .sort(function(a, b) {
            return +a.distance - +b.distance;
          })
          .splice(0, 3);



          console.log('redux', reduxSplice)
         

        this.setState({
          userProperties: spliced,
        });
      });
    });
  };

  componentDidMount() {
    this.propertyFinder();
    console.log(this.props.property, 'active property');
  }

  viewIndividualToggler=()=>{
console.log('fowaijfoewaij')
  }

  render() {
    return (
      <View style={styles.hello}>
                  <View style={styles.headerNav}>
            <Text>Below are the 3 properties that are closest to you. Click on one for details!</Text>
          </View>
<View style={styles.individualWrapper}>

          <IndividualProperty />
</View>


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
  return {activeUser: state.user, 
  property:state.displayProperty};
};
const mapDispatchToProps={
updateDisplayProperty
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
  hello: {
    // height:,
    // width:350,
    // padding: 10,
    // flex: 1,
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

  headerNav:{
    display: 'flex',
    height:'12.5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.05)',

  }, 
  individualWrapper: {
    zIndex:100,
// flex:1,
    height:'100%',
    position:'absolute',
    top:0,
    left:'40%', 
    backgroundColor:'rgba(0,0,0,.5)'
  }
});
