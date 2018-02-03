import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert, AsyncStorage, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Constants, Notifications, Permissions } from 'expo'
import moment from 'moment'

export default class NotificationButton extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notificationId: null,
    }
  }

  getStorageKey() {
    return `@MatchReminder:${this.props.match.id}`
  }

  async componentWillMount() {
    const notificationId = await AsyncStorage.getItem(this.getStorageKey())
    this.setState({ notificationId })
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

  cancelNotification = () => {
    const { notificationId } = this.state
    if (notificationId) {
      Notifications.cancelScheduledNotificationAsync(notificationId)
      this.setState({ notificationId: null })
      AsyncStorage.removeItem(this.getStorageKey())
    }
  }

  scheduleNotification = async () => {
    const { match, tvDetails } = this.props
    const matchTime = moment.utc(match.matchTime).subtract(5, 'minutes')
    const localMatchTime = matchTime.local()

    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if (Constants.isDevice && status === 'granted') {
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
      this.setState({ notificationId })
      AsyncStorage.setItem(this.getStorageKey(), notificationId)
    }
  }

  render() {
    const { notificationId } = this.state
    return (
      <TouchableOpacity style={styles.button} onPress={this._onNotificationPress} activeOpacity={1}>
        <Text>{notificationId ? 'unsubscribe' : 'subscribe'}</Text>
      </TouchableOpacity>
    )
  }
}

NotificationButton.propTypes = {
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

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: 0,
  },
})
