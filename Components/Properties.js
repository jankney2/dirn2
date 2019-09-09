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
import {connect} from 'react-redux';
import Property from './Property';
import {SafeAreaView} from 'react-navigation';
import IndividualProperty from './IndividualProperty';
import {SearchBar} from 'react-native-elements';

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
    axios
      .get(
        `https://dropin.business/api/userProperties/${this.props.activeUser.user_id}`,
      )
      .then(res => {
        this.setState({
          userProperties: res.data,
        });
        this.arrayHolder = res.data;
      })
      .catch(err => Alert.alert(err));
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
          {/* 
  <SearchBar name= 'inputVal'
  
    // value={this.state.inputVal}
     lightTheme 
     inputStyle={{
       color:'red'
     }}
     placeholder='Owner Name/Address'
     containerStyle={{
    backgroundColor:'white'
  }} 
  inputContainerStyle={{backgroundColor:'white'}}
  
  /> */}
          <TextInput
            placeholder="Search for owner Name/Address"
            style={styles.inputStyles}
            onChangeText={this.inputChange}
          />

          <ScrollView>
            <View style={styles.contain}>
              <Text>Properties</Text>

              <FlatList

                data={this.state.userProperties}
                renderItem={({item}) => {
                  return (
                    <Property
                    viewIndividualToggler={()=>{this.viewIndividualToggler()}}
                      updatePropertyList={newData => {
                        this.setState({
                          userProperties: newData,
                        });
                      }}
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
          </ScrollView>
        </SafeAreaView>
      );
    } else {
      return (
        <View>
          <IndividualProperty 
          viewIndividualToggler={this.viewIndividualToggler}
          />
        </View>
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
  inputStyles: {
    padding: 20,
  },
});

const mapStateToProps = state => {
  return {
    activeUser: state.user,
  };
};
export default connect(mapStateToProps)(Properties);

//have second part off of screen and animate on when it is toggled?
