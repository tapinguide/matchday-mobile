import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, AsyncStorage, Image, Linking, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { Notifications, Permissions } from 'expo'
import moment from 'moment'

import notificationOn from './images/notification-on.png'
import notificationOff from './images/notification-off.png'

export default class NotificationButton extends Component {
  static propTypes = {
    match: PropTypes.shape({
      id: PropTypes.int,
      matchTime: PropTypes.string,
      homeClub: PropTypes.shape({
        name: PropTypes.string,
      }),
      visitorClub: PropTypes.shape({
        name: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    notificationId: null,
  }

  getStorageKey() {
    return `@MatchReminder:${this.props.match.id}`
  }

  async componentWillMount() {
    const notificationString = await AsyncStorage.getItem(this.getStorageKey())
    if (notificationString && notificationString !== '') {
      this.setState({ notificationId: Platform.OS === 'ios' ? notificationString : notificationString * 1 })
    }
  }

  _onNotificationPress = () => {
    if (this.state.notificationId) {
      this.cancelNotification()
    } else {
      Alert.alert(
        'Match Start',
        'Would you like to be notified when this match starts?',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Notify me',
            onPress: this.scheduleNotification,
            style: 'destructive',
          },
        ],
        { cancelable: false }
      )
    }
  }

  cancelNotification = async () => {
    const { notificationId } = this.state
    if (notificationId) {
      Notifications.cancelScheduledNotificationAsync(notificationId)
      await AsyncStorage.removeItem(this.getStorageKey())
      this.setState({ notificationId: null })
    }
  }

  scheduleNotification = async () => {
    const { match, tvDetails } = this.props
    const matchTime = moment.utc(match.matchTime).subtract(5, 'minutes')
    const localMatchTime = matchTime.local()

    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (status === 'granted') {
      const notificationId = await Notifications.scheduleLocalNotificationAsync(
        {
          title: 'Match Alert',
          body: `${match.homeClub.name} - ${match.visitorClub.name} starts in 5 minutes on ${tvDetails}`,
          data: {
            matchId: match.id,
          },
          ios: {
            sound: true,
          },
          android: {
            sound: true,
          },
        },
        {
          time: localMatchTime.valueOf(),
        }
      )
      await AsyncStorage.setItem(this.getStorageKey(), notificationId.toString())
      this.setState({ notificationId })
    } else if (status === 'denied' || status == 'undetermined') {
      Alert.alert(
        'Uh oh',
        'You need to allow notifications in order to receive the match alert',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Go to Settings',
            onPress: () => {
              Linking.openURL('app-settings:')
            },
          },
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    const { notificationId } = this.state
    return (
      <TouchableOpacity style={styles.button} onPress={this._onNotificationPress} activeOpacity={1}>
        <Image source={notificationId ? notificationOn : notificationOff} style={styles.icon} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 19,
    paddingVertical: 14,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  icon: {
    height: 18,
    width: 24,
  },
})
