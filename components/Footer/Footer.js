import React, { Component } from 'react';
import { Image, View, StyleSheet, Text, TouchableHighlight, Linking } from 'react-native';

import facebookLogo from './images/facebook-logo.png';
import twitterLogo from './images/twitter-logo.png';

class Footer extends Component{
  handlePress(url){
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  render(){

    return (
      <View style={styles.footerContainer}>
        <TouchableHighlight
          onPress={() => this.handlePress('https://facebook.com/')}
          underlayColor='#F0F0F0'
        >
          <Image
            source={facebookLogo}
            style={styles.socialIconFacebook}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => this.handlePress('https://twitter.com/')}
          underlayColor='#F0F0F0'
        >
          <Image
            source={twitterLogo}
            style={styles.socialIconTwitter}
          />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row'
  },

  socialIconFacebook: {
    height: 100,
    width: 100
  },

  socialIconTwitter: {
    height: 100,
    width: 118.42
  }
});

export default Footer;