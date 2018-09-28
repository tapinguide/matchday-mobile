import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import InProgressMatch from './InProgressMatch'
import ScheduledMatch from './ScheduledMatch'
import CompletedMatch from './CompletedMatch'

export default class Match extends Component {
  render() {
    const { match, matchIndex, handleMatchPress, onMatchToggle } = this.props
    const status = match.status.description

    var returnMatch
    if (status === 'In Progress' || status === 'HT') {
      returnMatch = (
        <InProgressMatch
          match={match}
          key={match.id}
          index={matchIndex}
          matchIndex={matchIndex + 1}
          tvDetails={match.tvDetails}
          venue={match.venue}
          onMatchToggle={onMatchToggle}
          handleMatchPress={handleMatchPress}
        />
      )
    } else if (status === 'Scheduled' || status === 'Post.') {
      returnMatch = (
        <ScheduledMatch
          match={match}
          key={match.id}
          index={matchIndex}
          matchIndex={matchIndex + 1}
          tvDetails={match.tvDetails}
          venue={match.venue}
          onMatchToggle={onMatchToggle}
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
          index={matchIndex}
          matchIndex={matchIndex + 1}
          tvDetails={match.tvDetails}
          venue={match.venue}
          onMatchToggle={onMatchToggle}
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
  onMatchToggle: PropTypes.func,
}
Match.defaultProps = {
  handleMatchPress: () => {},
  onMatchToggle: () => {},
}
