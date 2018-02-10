import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Link } from 'react-router-native'

import { isIphoneX } from 'react-native-iphone-x-helper'

import Footer from '../Footer/Footer'
import MatchService from '../lib/matchservice'
import MustReadWatch from '../MustReadWatch/MustReadWatch'
import NewsletterSubscribeForm from '../NewsletterSubscribeForm'

import badgeIcon from './images/badge.png'
import tapinLogo from './images/logo_full.png'
import tableIcon from './images/table.png'
import essentialIcon from './images/top.png'
import aboutIcon from '../../../assets/images/logo.png'

export default class Menu extends Component {
  static propTypes = {
    closeMenu: PropTypes.func,
    isOpen: PropTypes.bool,
  }
  static defaultProps = {
    closeMenu: () => {},
    isOpen: false,
  }

  state = {
    height: 0,
    position: new Animated.Value(0),
    readWatch: [],
  }

  componentDidMount() {
    const { height } = Dimensions.get('window')

    this.setState({ height, readWatch: MatchService.readWatch }, () => {
      this._hide(0)
      this.updateReadWatch()
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      if (nextProps.isOpen) {
        this._show()
      } else {
        this._hide()
      }
    }
  }

  updateReadWatch = () => {
    MatchService.getReadWatch()
      .then(readWatch => this.setState({ readWatch }))
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
      })
  }

  _hide(duration = 300) {
    const { height, position } = this.state

    Animated.timing(position, {
      easing: Easing.exp.out,
      toValue: height,
      duration,
    }).start()
  }

  _show() {
    const { position } = this.state

    Animated.timing(position, {
      easing: Easing.exp.out,
      toValue: isIphoneX() ? 40 : 20,
      duration: 200,
    }).start()
  }

  render() {
    const { closeMenu, isOpen } = this.props
    const { position, readWatch } = this.state
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0

    const readWatchComponent = readWatch.length ? (
      <View>
        <MustReadWatch link={readWatch[0]} />
        <MustReadWatch link={readWatch[1]} />
      </View>
    ) : null

    return (
      <Animated.View style={[styles.container, { top: position }]}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
              <Image source={tapinLogo} style={styles.logo} />
            </View>
            <View style={styles.menuItems}>
              <Link to="/" onPress={closeMenu} style={styles.menuItem} component={TouchableOpacity} activeOpacity={1}>
                <View style={styles.menuImage}>
                  <Image source={essentialIcon} />
                </View>
                <Text style={styles.menuText}>Essential Matches</Text>
              </Link>
              {/* <Link to="/" onPress={closeMenu} style={styles.menuItem} component={TouchableOpacity} activeOpacity={1}>
                <View style={styles.menuImage}>
                  <Image source={tableIcon} />
                </View>
                <Text style={styles.menuText}>League Tables</Text>
              </Link>
              <Link to="/" onPress={closeMenu} style={styles.menuItem} component={TouchableOpacity} activeOpacity={1}>
                <View style={styles.menuImage}>
                  <Image source={badgeIcon} />
                </View>
                <Text style={styles.menuText}>Badge of the Week</Text>
              </Link> */}
              <Link
                to="/about"
                onPress={closeMenu}
                style={styles.menuItem}
                component={TouchableOpacity}
                activeOpacity={1}
              >
                <View style={styles.menuImage}>
                  <Image source={aboutIcon} style={{ width: 80, height: 80 }} />
                </View>
                <Text style={styles.menuText}>about</Text>
              </Link>
            </View>
            <View>
              {readWatchComponent}
              <NewsletterSubscribeForm />
              <Footer />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
    paddingTop: 0,
  },
  menuItem: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    flexBasis: '40%',
    flexDirection: 'column',
    height: 185,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 24,
    paddingHorizontal: 12,
    paddingVertical: 18,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  menuImage: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  menuText: {
    fontSize: 13,
    fontFamily: 'poppins-semi-bold',
  },
})
