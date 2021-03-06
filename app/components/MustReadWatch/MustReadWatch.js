import React, { Component } from 'react'
import { Asset } from 'expo'
import { Text, View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import HTMLView from 'react-native-htmlview'

import Analytics from '../lib/analytics'

const sidearrow = require('./images/sidearrow.png')
const mustReadIcon = require('./images/mustread.png')
const mustWatchIcon = require('./images/mustwatch.png')

const getIcon = val => {
  let icon
  switch (val) {
    case 'read':
      icon = mustReadIcon
      break
    case 'watch':
      icon = mustWatchIcon
      break
    case 'wear':
      icon = mustReadIcon
      break
    case 'listen':
      icon = mustWatchIcon
      break
    default:
      icon = mustReadIcon
      break
  }
  return icon
}

export default class MustReadWatch extends Component {
  openWindow = () => {
    const { url } = this.props.link

    Analytics.trackMustClick(this.props.link)
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }

  async componentWillMount() {
    await Asset.loadAsync([sidearrow, mustReadIcon, mustWatchIcon])
  }

  render() {
    const { link } = this.props
    const { header, mustType, text } = link

    const htmlContent = `<htmlcontent>${text}</htmlcontent>`

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.openWindow}
        style={{
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#e7e7e7',
          padding: 18,
        }}
      >
        <View>
          <Text
            style={{
              color: '#18EFC6',
              fontFamily: 'poppins-semi-bold',
              fontSize: 14,
              fontWeight: '700',
              letterSpacing: 2,
              marginBottom: 11,
            }}
          >
            {header}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Image
              source={getIcon(mustType)}
              style={{
                height: 30,
                paddingRight: 14,
                width: 40,
              }}
            />
            <View
              style={{
                flex: 2,
                paddingHorizontal: 10,
              }}
            >
              <HTMLView value={htmlContent} stylesheet={styles} />
            </View>
            <Image source={sidearrow} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 0,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '300',
  },
})
