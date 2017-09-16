import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

class HeaderBar extends Component{
    render(){
        return (
          <View style={styles.statusBarContainer}>
             <StatusBar barStyle="light-content"/>
          </View>
        )
    }
}

const styles = StyleSheet.create({
  statusBarContainer: {
    height:20,
    backgroundColor: '#08E5E3'
  }
});

export default HeaderBar;