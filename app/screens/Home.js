import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Matches from '../components/Match/Matches';
import NoData from '../components/NoData/NoData';

import { Font } from 'expo';
//import { ConnectivityRenderer } from 'react-native-offline';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'poppins-bold': require('../.././assets/fonts/Poppins-Bold.ttf'),
      'poppins-light': require('../.././assets/fonts/Poppins-Light.ttf'),
      'poppins-medium': require('../.././assets/fonts/Poppins-Medium.ttf'),
      'poppins-regular': require('../.././assets/fonts/Poppins-Regular.ttf'),
      'poppins-semi-bold': require('../.././assets/fonts/Poppins-SemiBold.ttf'),
    });


    this.setState(
      {
        fontLoaded: true
      });
  } // End componentDidMount()

  onClickMe = () => {
    console.log('click me was clicked');
    this.props.navigation.navigate('About');
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.state.fontLoaded ? (
          <View style={styles.container}>
        <Header />
        <ScrollView>
          <Matches />
          <Footer navigation={this.props.navigation}/>
        </ScrollView>
      </View>
        ) : null
      }
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'  },

})
