import React, {Component} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import Property from './Property';
import axios from 'axios';
import {connect} from 'react-redux';
import IndividualProperty from './IndividualProperty';

class CrmList extends Component {
  state = {
    userProperties: [],
  };
  componentDidMount() {
    console.log(this.props.activeUser.user_id);
    axios
      .get(`https://dropin.business/CRM/${this.props.activeUser.user_id}`)
      .then(res => {
        console.log('CRM res', res.data);
        this.setState({
          userProperties: res.data,
        });
        this.arrayHolder = res.data;
      })
      .catch(err => console.log(err));
  }
  viewIndividualToggler = () => {
    this.setState({
      viewIndividual: !this.state.viewIndividual,
    });
  };

  render() {
    if (!this.state.viewIndividual) {
      return (
        <View>
          <View>
            <Text>
              The properties below are those that you have chosen to export to
              your CRM. You'll get an email monday morning with them, or you can
              push them now by pressing the "send now" button.
            </Text>
            <Button title="send now!" color="red" />
          </View>

          <FlatList
            data={this.state.userProperties}
            renderItem={({item}) => {
              if (item.send_to_crm) {
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
              }
            }}
            keyExtractor={item => item.property_id.toString()}
          />
        </View>
      );
    } else {
      return (
        <IndividualProperty
          updateUserProperties={this.updateUserProperties}
          viewIndividualToggler={() => {
            this.viewIndividualToggler();
          }}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    activeUser: state.user,
  };
};
export default connect(mapStateToProps)(CrmList);
