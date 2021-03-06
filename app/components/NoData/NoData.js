import React, { Component } from 'react'
import { Asset } from 'expo'
import { Text, View, Image, StyleSheet } from 'react-native'

const noconnection = require('./images/noconnection.png')
const tapinlogo = require('../../../assets/images/logo_full.png')

export default class NoData extends Component {
  async componentWillMount() {
    await Asset.loadAsync([noconnection, tapinlogo])
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
        <View style={{ paddingTop: 50 }}>
          <Image source={tapinlogo} style={{ width: 200, height: 60 }} />
        </View>
        <View style={{ paddingTop: 75 }}>
          <Image source={noconnection} />
        </View>
        <View
          style={{
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: 'poppins-regular',
              fontSize: 16,
              lineHeight: 25,
              fontWeight: '600',
            }}
          >
            No data, yo. Please check your Internet settings and try again.{' '}
          </Text>
        </View>
      </View>
    )
  }
}
