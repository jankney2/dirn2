import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';
// import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux';
import Property from './Property';
import Geolocation from '@react-native-community/geolocation';
import {SafeAreaView} from 'react-navigation';
import IndividualProperty from './IndividualProperty';
import {SearchBar} from 'react-native-elements';

//icons

// const searchBarIcon=<Icon name='search' size={14} color='black'/>


class Properties extends Component {
  constructor() {
    super();
    this.state = {
      userProperties: [],
      inputVal: '',
      viewIndividual: false,
    };
    this.arrayHolder = [];
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        axios
          .post(
            `https://dropin.business/api/userProperties/calcDistance/${this.props.activeUser.user_id}`,
            {
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            },
          )
          .then(res => {
            console.log(res.data, 'data');
            this.setState({
              userProperties: res.data,
            });
            console.log('userPRops', this.state.userProperties);
            this.arrayHolder = res.data;
          })
          .catch(err => Alert.alert(err));
      },
      err => {
        console.log(err);
      },
    );
  }

  viewIndividualToggler = () => {
    this.setState({
      viewIndividual: !this.state.viewIndividual,
    });
  };

  inputChange = text => {
    const newData = this.arrayHolder.filter(el => {
      return (
        el.street.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
        el.city.toLowerCase().indexOf(text.toLowerCase()) > -1
      );
    });

    this.setState({
      userProperties: newData,
    });
  };

  render() {
    if (!this.state.viewIndividual) {
      return (
        <SafeAreaView>
          <View style={styles.headerNav}>
            <TextInput
              placeholder="Search for owner Name/Address"
              style={styles.inputStyles}
              onChangeText={this.inputChange}
            />
          </View>
          <ScrollView>
            <View>
              <FlatList
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
                      latitude={item.latitude}
                      longitude={item.longitude}
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
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <IndividualProperty
          viewIndividualToggler={() => {
            this.viewIndividualToggler();
          }}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyles: {},
  headerNav: {
    display: 'flex',
    height:'12.5%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.05)',

  },
});

const mapStateToProps = state => {
  return {
    activeUser: state.user,
  };
};
export default connect(mapStateToProps)(Properties);

//have second part off of screen and animate it upwards/downwards when it is toggled? sounds good sounds good.
