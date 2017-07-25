import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, } from 'react-native';

import tapinLogo from './images/tapin_logo_text.png';
import loadingIndicator from './images/tapin-loading-animation.gif';

export default class Loading extends Component {

  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop:10 }}>

          <Image source={loadingIndicator} style={{width: 100, height: 100}} />
          <Image source={tapinLogo} style={{width:235, height: 91}} />
          <Text style={{
            fontFamily: 'poppins-regular',
            fontSize: 16,
            lineHeight: 25,
            fontWeight: '600'
          }}>
            Loading
          </Text>
      </View>
    );
  }
}