import React, { Component } from 'react'
import { View } from 'react-native'
import { Font } from 'expo'

import Matches from '../../components/Match/Matches'

export default class Home extends Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      'poppins-bold': require('../../.././assets/fonts/Poppins-Bold.ttf'),
      'poppins-light': require('../../.././assets/fonts/Poppins-Light.ttf'),
      'poppins-medium': require('../../.././assets/fonts/Poppins-Medium.ttf'),
      'poppins-regular': require('../../.././assets/fonts/Poppins-Regular.ttf'),
      'poppins-semi-bold': require('../../.././assets/fonts/Poppins-SemiBold.ttf'),
    })

    this.setState({ fontLoaded: true })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        {this.state.fontLoaded ? <Matches navigation={this.props.navigation} /> : null}
      </View>
    )
  }
}
