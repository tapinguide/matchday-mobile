import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import { AppLoading, Font, Notifications } from 'expo'

import { NativeRouter, Route, Link } from 'react-router-native'

import About from './app/screens/about/About'
import Crest from './app/screens/crest/Crest'
import Home from './app/screens/home/Home'
import Tables from './app/screens/tables/Tables'

import FloatingButton from './app/components/Menu/FloatingButton'
import HeaderBar from './app/components/HeaderBar/HeaderBar'
import Menu from './app/components/Menu/Menu'

export default class App extends Component {
  state = {
    isReady: false,
    menuIsOpen: false,
    navigator: null,
  }

  componentDidMount() {
    Notifications.addListener(({ origin, data, remote }) => {
      if (!remote && origin === 'received') {
        Alert.alert(data.title, data.body, { cancelable: false })
      }
    })
  }

  async _cacheResourcesAsync() {
    await Font.loadAsync({
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
      'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    })

    return true
  }

  closeMenu = () => {
    this.setState({ menuIsOpen: false })
  }

  toggleMenu = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  render() {
    const { isReady, menuIsOpen } = this.state

    if (!isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }
    return (
      <NativeRouter>
        <View style={{ flex: 1 }}>
          <HeaderBar />
          <Route path="/" exact component={Home} />
          <Route path="/crest" component={Crest} />
          <Route path="/tables" component={Tables} />
          <Route path="/about" component={About} />

          <Menu isOpen={menuIsOpen} closeMenu={this.closeMenu} />
          <FloatingButton menuIsOpen={menuIsOpen} onPress={this.toggleMenu} />
        </View>
      </NativeRouter>
    )
  }
}
