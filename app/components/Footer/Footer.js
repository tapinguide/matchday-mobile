import React, { Component } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import facebookLogo from './images/facebook-logo.png';
import twitterLogo from './images/twitter-logo.png';

class Footer extends Component{
  constructor(props) {
    super(props);
  }
  handlePress(url){
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  handleAboutPress = () => {
    this.props.navigation.navigate('About');
  }
  render(){

    return (
      <View style={styles.footerContainer}>

        <Text
          onPress={() => this.handleAboutPress()}
          style={styles.footerLink}>
          About
        </Text>
        <View style={styles.socialIcons}>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30
  },

  footerLink: {
    fontSize: 16,
    fontFamily: 'poppins-semi-bold',
    fontWeight: '700'
  },

  socialIcons: {
    marginLeft: 'auto',
    flexDirection: 'row'
  },

  socialIconFacebook: {
    height: 35,
    width: 35
  },

  socialIconTwitter: {
    height: 35,
    width: 41.447
  }
});

export default Footer;