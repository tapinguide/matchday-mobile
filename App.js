import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Notifications } from 'expo'

import { Root } from './app/config/router'

export default class App extends Component {
  componentDidMount() {
    Notifications.addListener(({ origin, data, remote }) => {
      if (!remote && origin === 'received') {
        Alert.alert(data.title, data.body, { cancelable: false })
      }
    })
  }

  render() {
    return <Root />
  }
}
