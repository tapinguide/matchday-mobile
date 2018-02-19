import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Asset } from 'expo'
import { Animated, Easing, Image, StyleSheet, TouchableOpacity, View } from 'react-native'

const menuIcon = require('./images/button.png')
const closeIcon = require('./images/closeIcon.png')

export default class FloatingButton extends Component {
  static propTypes = {
    menuIsOpen: PropTypes.bool,
    onPress: PropTypes.func,
  }
  static defaultPropTypes = {
    menuIsOpen: false,
    onPress: () => {},
  }

  animatedValue = new Animated.Value(0)
  value = 0

  frontInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })
  frontOpacity = this.animatedValue.interpolate({ inputRange: [89, 90], outputRange: [1, 0] })
  backInterpolate = this.animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  })
  backOpacity = this.animatedValue.interpolate({ inputRange: [89, 90], outputRange: [0, 1] })

  async componentWillMount() {
    await Asset.loadAsync([menuIcon, closeIcon])

    this.animatedValue.addListener(({ value }) => {
      this.value = value
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.menuIsOpen !== nextProps.menuIsOpen) {
      if (nextProps.menuIsOpen) {
        this._show()
      } else {
        this._hide()
      }
    }
  }

  _hide() {
    Animated.spring(this.animatedValue, {
      toValue: 0,
      friction: 8,
      tension: 10,
      duration: 300,
      easing: Easing.exp.out,
    }).start()
  }

  _show() {
    Animated.spring(this.animatedValue, {
      toValue: 180,
      friction: 8,
      tension: 10,
      duration: 200,
      easing: Easing.exp.out,
    }).start()
  }

  render() {
    const { onPress } = this.props
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
    }
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
    }

    return (
      <View style={styles.container}>
        <Animated.View style={[frontAnimatedStyle, styles.button, { opacity: this.frontOpacity }]}>
          <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <Image source={menuIcon} style={{ height: 42, width: 42 }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.button, { opacity: this.backOpacity }]}>
          <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <Image source={closeIcon} style={{ height: 42, width: 42 }} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    bottom: 20,
    position: 'absolute',
    right: 20,
  },
  button: {
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    bottom: 0,
    elevation: 15,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    width: 50,
    zIndex: 10,
  },
})
