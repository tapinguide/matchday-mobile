import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, Modal, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Link } from 'react-router-native'

import tapinLogo from './images/logo_full.png'

export default class Menu extends Component {
  static propTypes = {
    closeMenu: PropTypes.func,
    isOpen: PropTypes.bool,
  }
  static defaultProps = {
    closeMenu: () => {},
    isOpen: false,
  }

  render() {
    const { closeMenu, isOpen } = this.props

    return (
      <Modal visible={isOpen} animationType={'slide'} presentationStyle="fullScreen">
        <StatusBar hidden />
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={tapinLogo} style={styles.logo} />
          </View>
          <View style={styles.menuItems}>
            <Link to="/" onPress={closeMenu} style={styles.menuItem}>
              <Text>home</Text>
            </Link>
            <Link to="/about" onPress={closeMenu} style={styles.menuItem}>
              <Text>about</Text>
            </Link>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 22,
  },
  logo: {
    height: 30,
    width: 94.28571429,
  },
  menuItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    elevation: 5,
    flex: 1,
    height: 185,
    marginHorizontal: 10,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
})
