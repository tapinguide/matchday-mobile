import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView } from 'react-native'
import InProgressMatch from './InProgressMatch'
import ScheduledMatch from './ScheduledMatch'
import CompletedMatch from './CompletedMatch'

export default class Match extends Component {
  render() {
    const { match, matchIndex, handleMatchPress } = this.props
    const status = match.status.description

    var returnMatch
    if (status === 'In Progress' || status === 'HT') {
      returnMatch = (
        <InProgressMatch
          match={match}
          key={match.id}
          matchIndex={matchIndex}
          tvDetails={match.tvDetails}
          venue={match.venue}
          handleMatchPress={handleMatchPress}
        />
      )
    } else if (status === 'Scheduled' || status === 'Post.') {
      returnMatch = (
        <ScheduledMatch
          match={match}
          key={match.id}
          matchIndex={matchIndex}
          tvDetails={match.tvDetails}
          venue={match.venue}
          handleMatchPress={handleMatchPress}
        />
      )
    } else if (
      status === 'FT' ||
      status === 'AET' ||
      status === 'Pen.' ||
      status === 'Awarded' ||
      status === 'Cancl.'
    ) {
      returnMatch = (
        <CompletedMatch
          match={match}
          key={match.id}
          matchIndex={matchIndex}
          tvDetails={match.tvDetails}
          venue={match.venue}
          handleMatchPress={handleMatchPress}
        />
      )
    }

    return <View>{returnMatch}</View>
  }
}

Match.propTypes = {
  handleMatchPress: PropTypes.func,
  matchIndex: PropTypes.number.isRequired,
  match: PropTypes.object.isRequired,
}
Match.defaultProps = {
  handleMatchPress: () => {},
}
