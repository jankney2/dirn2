import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button} from 'react-native';
class IndividualProperty extends Component {
  state = {
    viewInformation: true,
  };

  componentDidMount() {
    console.log(this.props.property);
  }
  render() {
    if (this.state.viewInformation) {
      return (
        <View>
          <View style={styles.header}>
            <Button
              title="information"
              onPress={() => {
                this.setState({
                  viewInformation: true,
                });
              }}
            />

            <Button
              title="notes"
              onPress={() => {
                this.setState({
                  viewInformation: false,
                });
              }}
            />
          </View>
<Text>INformation</Text>
       
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.header}>
            <Button
              title="information"
              onPress={() => {
                this.setState({
                  viewInformation: true,
                });
              }}
            />

            <Button
              title="notes"
              onPress={() => {
                this.setState({
                  viewInformation: false,
                });
              }}
            />
          </View>
          <Text>notes</Text>
       
       
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  return {property: state.displayProperty};
};

export default connect(
  mapStateToProps,
  null,
)(IndividualProperty);

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});
