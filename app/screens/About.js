import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button } from 'react-native';

import Header from '../components/Header/Header';

// import { Font } from 'expo';

export default class About extends React.Component {
  constructor(props) {
    super(props);

  }
  async componentDidMount() {

  }

  onClickMe = () => {
    console.log('click me (About) was clicked');
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.container}>
      <Text> About Page </Text>
      <Text
        onPress={() => this.onClickMe()}
      > Click to go back home </Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'  },
})
