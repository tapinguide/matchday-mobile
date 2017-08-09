import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Button, StatusBar } from 'react-native';

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
      <StatusBar
           backgroundColor="blue"
           barStyle="light-content"
         />
      <Text>
        As football fanatics, we felt overwhelmed trying to keep up with the beautiful game. So, we created the latest version of Tap In, a soccer calendar with context to help fans easily get the scoop on what happened in the world’s biggest matches, what’s coming up, and why it all matters.
      </Text>
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
