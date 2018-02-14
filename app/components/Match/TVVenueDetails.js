import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, Image } from 'react-native'

import tvIcon from './images/TV.png'
import pitchIcon from './images/pitch.png'

export default class TVVenueDetails extends Component {
  static propTypes = {
    matchTime: PropTypes.string,
    tvDetails: PropTypes.string,
    venue: PropTypes.string,
  }

  render() {
    const { matchTime, tvDetails, venue } = this.props

    return (
      <View style={styles.matchDetailContainer}>
        {!!matchTime && (
          <View style={styles.tvVenue}>
            <Text style={styles.matchText}>{matchTime.toUpperCase()}</Text>
          </View>
        )}
        {!!tvDetails && (
          <View style={styles.tvVenue}>
            <Image source={tvIcon} />
            <Text style={styles.tvText}>{tvDetails.toUpperCase()}</Text>
          </View>
        )}
        {!!venue && (
          <View style={styles.tvVenue}>
            <Image source={pitchIcon} />
            <Text style={styles.tvText}>{venue.toUpperCase()}</Text>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tvVenue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F6F6F6',
    padding: 6,
    marginBottom: 8,
  },
  tvText: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'poppins-regular',
    fontSize: 11,
    lineHeight: 18,
    letterSpacing: 1,
    paddingLeft: 8,
  },
  matchText: {
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'poppins-regular',
    fontSize: 11,
    lineHeight: 18,
    letterSpacing: 1,
  },
  matchDetailContainer: {
    flex: 1,
    padding: 8,
  },
})
