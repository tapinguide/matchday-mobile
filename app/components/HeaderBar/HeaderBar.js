import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { ifIphoneX, isIphoneX } from 'react-native-iphone-x-helper'

class HeaderBar extends Component{
  render(){
    return (
      <View style={styles.statusBarContainer}>
        <StatusBar barStyle={isIphoneX() ? 'default' : 'light-content'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBarContainer: {
    height:20,
    ...ifIphoneX({
        height: 40,
        backgroundColor: '#F0F0F0'
    }, {
        height: 20,
        backgroundColor: '#08E5E3',
    }),
  }
});

export default HeaderBar;