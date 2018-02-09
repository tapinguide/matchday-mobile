import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, TouchableOpacity } from 'react-native'

import icon from '../../../assets/images/logo.png'

export default class FloatingButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  }
  static defaultPropTypes = {
    onPress: () => {},
  }

  render() {
    const { onPress } = this.props

    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: 50,
          borderColor: '#18EFC6',
          borderWidth: 1,
          bottom: 30,
          elevation: 10,
          height: 50,
          justifyContent: 'center',
          position: 'absolute',
          right: 30,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3,
          width: 50,
          zIndex: 1,
        }}
        activeOpacity={1}
      >
        <Image source={icon} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
    )
  }
}
