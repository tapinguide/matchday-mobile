import React, { Component } from 'react'
import { Text, TouchableHighlight, Image, StyleSheet, View } from 'react-native'
import { Asset, DangerZone } from 'expo'
import { width, height, totalSize } from 'react-native-dimension'

const tapinLogo = require('./images/tapin_logo_text.png')
const loadingIndicator = require('./images/tapin-loading-animation.gif')

const { Lottie } = DangerZone

import animationData from '../../../assets/animations/loading.json'

export default class Loading extends Component {
  async componentWillMount() {
    await Asset.loadAsync([tapinLogo, loadingIndicator])
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: height(100), marginTop: -50 }}>
        {/* <Lottie
          ref={animation => {
            this.animation = animation
          }}
          loop={true}
          source={animationData}
        />
        <TouchableHighlight
          onPress={() => {
            this.animation.reset()
            this.animation.play()
            console.log('play')
          }}
        >
          <Text>reset</Text>
        </TouchableHighlight> */}
        <Image source={loadingIndicator} style={{ width: 100, height: 100 }} />
        <Image source={tapinLogo} style={{ width: 235, height: 91 }} />
        <Text
          style={{
            color: '#757575',
            fontFamily: 'poppins-regular',
            fontSize: 16,
            fontWeight: '600',
            letterSpacing: 2,
            lineHeight: 25,
            marginLeft: 2,
            marginTop: 30,
            textAlign: 'center',
          }}
        >
          LOADING
        </Text>
      </View>
    )
  }
}
