import React, { Component } from 'react'
import { Asset } from 'expo'
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Link } from 'react-router-native'

const facebookLogo = require('./images/FB.png')
const twitterLogo = require('./images/Twit.png')

export default class Footer extends Component {
  async componentWillMount() {
    await Asset.loadAsync([facebookLogo, twitterLogo])
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
    padding: 16,
    paddingTop: 0,
    marginBottom: 80,
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
    marginLeft: 16,
    width: 30,
  },
})
