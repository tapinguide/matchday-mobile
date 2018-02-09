import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { ifIphoneX } from 'react-native-iphone-x-helper'

// Assets
import tapinLogo from './images/logo_full.png'

class MatchesHeader extends Component {
  render() {
    return (
      <View style={styles.matchesHeaderContainer}>
        <View style={styles.matchesHeaderInnerContent}>
          <Image source={tapinLogo} style={styles.headerLogo} />
          <View style={styles.matchesHeaderTextContainer}>
            <Text style={styles.bigText}>Essential Matches</Text>
            <Text style={styles.dateRangeText}>{this.props.dateRange}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  matchesHeaderContainer: {
    paddingTop: 15,
    paddingBottom: 8,
    paddingRight: 10,
    paddingLeft: 10,
  },
  matchesHeaderInnerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerLogo: {
    height: 30,
    width: 94.28571429,
    marginTop: 3,
  },
  matchesHeaderTextContainer: {
    marginLeft: 'auto',
  },
  bigText: {
    textAlign: 'right',
    fontFamily: 'poppins-bold',
    letterSpacing: 0,
    marginBottom: 0,
    height: 18,
  },
  dateRangeText: {
    fontFamily: 'poppins-regular',
    fontSize: 11,
    textAlign: 'right',
    letterSpacing: 1,
  },
})

export default MatchesHeader
