import React, { Component } from 'react'
import { View } from 'react-native'

import HeaderBar from '../../components/HeaderBar/HeaderBar'
import Matches from '../../components/Match/Matches'

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
        <HeaderBar />
        <Matches navigation={this.props.navigation} />
      </View>
    )
  }
}
