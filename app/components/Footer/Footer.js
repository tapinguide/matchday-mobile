import React, { Component } from 'react'
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'react-router-native'

import facebookLogo from './images/FB.png'
import twitterLogo from './images/Twit.png'

export default class Footer extends Component {
  constructor(props) {
    super(props)
  }

  handlePress = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }

  render() {
    const { closeMenu } = this.props
    return (
      <View style={styles.footerContainer}>
        <Link to="/about" onPress={closeMenu} component={TouchableOpacity}>
          <Text style={styles.footerLink}>About</Text>
        </Link>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => this.handlePress('https://www.facebook.com/tapindesign')}>
            <Image source={facebookLogo} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handlePress('https://twitter.com/tapinguide')}>
            <Image source={twitterLogo} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 0,
  },

  footerLink: {
    fontSize: 16,
    fontFamily: 'poppins-semi-bold',
    fontWeight: '700',
  },

  socialIcons: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },

  socialIcon: {
    height: 30,
    marginLeft: 15,
    width: 30,
  },
})
