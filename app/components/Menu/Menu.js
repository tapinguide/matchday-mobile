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
import { Asset } from 'expo'
import { Link } from 'react-router-native'

import { isIphoneX } from 'react-native-iphone-x-helper'

import Footer from '../Footer/Footer'
import MatchService from '../lib/matchservice'
import MustReadWatch from '../MustReadWatch/MustReadWatch'
import NewsletterSubscribeForm from '../NewsletterSubscribeForm'

const crestIcon = require('./images/crest.png')
const tapinLogo = require('./images/logo_full.png')
const tableIcon = require('./images/tables.png')
const topMatchesIcon = require('./images/top.png')
const aboutIcon = require('./images/logo.png')

const { height } = Dimensions.get('window')

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
    position: new Animated.Value(0),
    readWatch: [],
  }

  async componentWillMount() {
    const readWatch = await MatchService.getStoredReadWatch()

    await Asset.loadAsync([crestIcon, tapinLogo, tableIcon, topMatchesIcon, aboutIcon])

    this.setState({ readWatch }, () => {
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
    const { position } = this.state

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

    return (
      <Animated.View style={[styles.container, { transform: [{ translateY: position }] }]}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.header}>
              <Image source={tapinLogo} style={styles.logo} />
            </View>
            <View style={styles.menuItems}>
              <Link to="/" onPress={closeMenu} style={styles.menuItem} component={TouchableOpacity} activeOpacity={1}>
                <View style={styles.menuImage}>
                  <Image source={topMatchesIcon} />
                </View>
                <Text style={styles.menuText}>Top Matches</Text>
              </Link>
              <Link
                to="/tables"
                onPress={closeMenu}
                style={styles.menuItem}
                component={TouchableOpacity}
                activeOpacity={1}
              >
                <View style={styles.menuImage}>
                  <Image source={tableIcon} />
                </View>
                <Text style={styles.menuText}>League Tables</Text>
              </Link>
              <Link
                to="/crest"
                onPress={closeMenu}
                style={styles.menuItem}
                component={TouchableOpacity}
                activeOpacity={1}
              >
                <View style={styles.menuImage}>
                  <Image source={crestIcon} />
                </View>
                <Text style={styles.menuText}>Crest of the Week</Text>
              </Link>
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
                <Text style={styles.menuText}>About</Text>
              </Link>
            </View>
            <View>
              {!!readWatch.length && (
                <View style={styles.shadow}>
                  {readWatch.map((item, index) => <MustReadWatch key={index} link={item} />)}
                </View>
              )}
              <NewsletterSubscribeForm />
              <Footer closeMenu={closeMenu} />
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
    borderColor: '#C5C5C5',
    borderWidth: 1,
    flex: 1,
    flexBasis: '40%',
    flexDirection: 'column',
    height: 185,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 24,
    paddingHorizontal: 12,
    paddingVertical: 18,
    elevation: 16,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  menuImage: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  menuText: {
    fontSize: 13,
    fontFamily: 'poppins-semi-bold',
  },
  shadow: {
    elevation: 16,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
})
