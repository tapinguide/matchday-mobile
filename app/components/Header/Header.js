import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Header extends Component{
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
    backgroundColor: '#1B1E2C'
  }
});

export default Header;