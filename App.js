import React, { Component } from 'react'
import { Alert, View } from 'react-native'
import { Font, Notifications } from 'expo'

import { NativeRouter as Router, Route, Link } from 'react-router-native'

import Home from './app/screens/home/Home'
import About from './app/screens/about/About'
import Menu from './app/components/Menu/Menu'
import FloatingButton from './app/components/Menu/FloatingButton'

export default class App extends Component {
  state = {
    fontLoaded: false,
    menuIsOpen: false,
    navigator: null,
  }

  async componentDidMount() {
    Notifications.addListener(({ origin, data, remote }) => {
      if (!remote && origin === 'received') {
        Alert.alert(data.title, data.body, { cancelable: false })
      }
    })
    await Font.loadAsync({
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
      'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-semi-bold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    })

    this.setState({ fontLoaded: true })
  }

  closeMenu = () => {
    this.setState({ menuIsOpen: false })
  }

  toggleMenu = () => {
    this.setState({ menuIsOpen: !this.state.menuIsOpen })
  }

  render() {
    const { fontLoaded, menuIsOpen } = this.state

    if (!fontLoaded) {
      return <View />
    }
    return (
      <Router>
        <View style={{ flex: 1 }}>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />

          <Menu isOpen={menuIsOpen} closeMenu={this.closeMenu} />
          <FloatingButton menuIsOpen={menuIsOpen} onPress={this.toggleMenu} />
        </View>
      </Router>
    )
  }
}
