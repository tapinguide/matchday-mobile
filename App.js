import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import Header from './components/Header/Header';
import Matches from './components/Match/Matches';
import { Font } from 'expo';
import { ConnectivityRenderer } from 'react-native-offline';

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
      'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header />  
        <ScrollView>
           <ConnectivityRenderer>
            {isConnected => (isConnected ? (<Matches />) 
            : (<Text>Downloading images is disabled since you are offline</Text>)
            )}
          </ConnectivityRenderer>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'  },

})
