import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default class Header extends Component{
    render(){
        return (
                <Image 
                    style={styles.logo}
                    source={require('./Images/logo.png')} />
        )
    }
}

const styles = StyleSheet.create({
  logo: {
      width: 125,
      height: 40
  }
});

