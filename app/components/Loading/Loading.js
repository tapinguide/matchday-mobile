import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';

import tapinLogo from './images/tapin_logo_text.png';
import loadingIndicator from './images/tapin-loading-animation.gif';

export default class Loading extends Component {

  render(){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height(100), marginTop: -50 }}>
          <Image source={loadingIndicator} style={{width: 100, height: 100}} />
          <Image source={tapinLogo} style={{width:235, height: 91}} />
          <Text style={{
            color: '#757575',
            fontFamily: 'poppins-regular',
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 2,
            lineHeight: 25,
            marginLeft: 2,
            marginTop: 30,
            textAlign: 'center'
          }}>
            LOADING
          </Text>
      </View>
    );
  }
}