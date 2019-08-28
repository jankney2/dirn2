import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert
} from "react-native";
import axios from "axios";
import Property from "./Property";

export default class Properties extends Component {
  state = {
    userProperties: []
  };

  componentDidMount() {
    axios
      .get("https://dropin.business/api/userProperties/14")
      .then(res => {
        this.setState({
          userProperties: res.data
        });
      })
      .catch(err => Alert.alert(err));
  }

  updateUserProperties = () => {};
  render() {
    return (
      <ScrollView>
        <View style={styles.contain}>
          <Text>Properties</Text>

          <FlatList
            data={this.state.userProperties}
            renderItem={({ item }) => {
              return (
                <Property
                  dataUpdater={(obj) => {
                    this.setState({
                      userProperties:obj
                    })
                  }}
                  updateUserProperties={this.updateUserProperties}
                  address={`${item.street}, ${item.city}`}
                  tracking={item.is_tracked}
                  deleteId={item.property_id}
                  style={{ textAlign: "center" }}
                />
              );
            }}
            keyExtractor={item => item.property_id.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
