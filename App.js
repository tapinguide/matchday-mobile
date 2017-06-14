import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import Header from './Components/Header/Header';
import Matches from './Components/Match/Matches';

export default class App extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <Header />  
        <ScrollView style={styles.container}>
          <Matches />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },

})
