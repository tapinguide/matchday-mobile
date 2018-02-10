import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing, Image, StyleSheet, TouchableOpacity } from 'react-native'

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
    position: new Animated.Value(-50),
  }

  componentDidMount() {
    this._show()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.menuIsOpen !== nextProps.menuIsOpen) {
      if (nextProps.menuIsOpen) {
        this._hide()
      } else {
        this._show()
      }
    }
  }

  _hide() {
    Animated.timing(this.state.position, {
      easing: Easing.exp.out,
      toValue: -50,
      duration: 300,
    }).start()
  }

  _show() {
    Animated.timing(this.state.position, {
      delay: 300,
      easing: Easing.exp.out,
      toValue: 30,
      duration: 200,
    }).start()
  }

  render() {
    const { onPress } = this.props
    const { position } = this.state

    return (
      <Animated.View style={[styles.container, { bottom: position }]}>
        <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={1}>
          <Image source={icon} style={{ height: 30, width: 30 }} />
        </TouchableOpacity>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderColor: '#18EFC6',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    width: 50,
    zIndex: 10,
  },
})
