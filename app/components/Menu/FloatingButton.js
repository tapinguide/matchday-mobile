import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing, Image, TouchableOpacity } from 'react-native'

import icon from '../../../assets/images/logo.png'

export default class FloatingButton extends Component {
  static propTypes = {
    menuIsOpen: PropTypes.bool,
    onPress: PropTypes.func,
  }
  static defaultPropTypes = {
    menuIsOpen: false,
    onPress: () => {},
  }

  state = {
    positionAnimation: new Animated.Value(-50),
  }

  componentDidMount() {
    this._showButton()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.menuIsOpen !== nextProps.menuIsOpen) {
      if (nextProps.menuIsOpen) {
        this._hideButton()
      } else {
        this._showButton()
      }
    }
  }

  _hideButton() {
    Animated.timing(this.state.positionAnimation, {
      easing: Easing.exp.in,
      toValue: -50,
      duration: 500,
    }).start()
  }

  _showButton() {
    Animated.timing(this.state.positionAnimation, {
      delay: 500,
      easing: Easing.exp.out,
      toValue: 30,
      duration: 300,
    }).start()
  }

  render() {
    const { onPress } = this.props
    const { positionAnimation } = this.state

    return (
      <Animated.View
        style={{
          bottom: positionAnimation,
          position: 'absolute',
          right: 30,
        }}
      >
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 50,
            borderColor: '#18EFC6',
            borderWidth: 1,
            elevation: 10,
            height: 50,
            justifyContent: 'center',
            shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            width: 50,
            zIndex: 10,
          }}
          activeOpacity={1}
        >
          <Image source={icon} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}
