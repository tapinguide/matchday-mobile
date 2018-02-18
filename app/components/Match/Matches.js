import React, { Component } from 'react'
import { FlatList, Image, StatusBar, StyleSheet, View } from 'react-native'
import moment from 'moment'

import Match from './Match'
import Loading from '../Loading/Loading'
import MatchesHeader from '../MatchesHeader/MatchesHeader'

import MatchService from '../lib/matchservice'

export default class Matches extends Component {
  state = {
    matches: [],
    matchDateRange: '_',
    matchIndex: 1,
  }

  flatList = null
  mounted = false
  timerID = null

  async componentWillMount() {
    const matches = await MatchService.getStoredMatches()

    this.mounted = true
    this.setState({ matches }, this.updateMatches)
  }

  componentWillUnmount() {
    this.mounted = false
    clearTimeout(this.timerID)
  }

  setMatchDateRange = () => {
    if (!this.mounted) return
    const { matches } = this.state
    const matchDates = matches.map(match => match.matchTime)

    matchDates.sort((a, b) => new Date(a) - new Date(b))

    const firstMatchDate = moment.utc(matchDates[0]).local()
    const lastMatchDate = moment.utc(matchDates[matchDates.length - 1]).local()

    //check if the matches are in the same month; else display different months
    const format = firstMatchDate.format('M') === lastMatchDate.format('M') ? 'D, YYYY' : 'MMMM D, YYYY'

    this.setState({
      matchDateRange: `${firstMatchDate.format('MMMM D').toUpperCase()}-${lastMatchDate
        .local()
        .format(format)
        .toUpperCase()}`,
    })
  }

  updateMatches = () => {
    clearTimeout(this.timerID)
    if (!this.mounted) return
    MatchService.getMatches()
      .then(matches => {
        return this.mounted ? this.setState({ matches }, this.setMatchDateRange) : false
      })
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
      })
      .finally(() => {
        this.timerID = setTimeout(this.updateMatches, 5000)
      })
  }

  _onMatchToggle = (index = -1) => {
    if (this.flatList && index > -1) {
      this.flatList.scrollToIndex({ index })
    }
  }

  render() {
    const { matchDateRange, matches } = this.state
    const { navigation } = this.props

    return (
      <FlatList
        ref={component => (this.flatList = component)}
        style={{ flex: 1 }}
        data={matches}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <Match match={item} matchIndex={index} onMatchToggle={this._onMatchToggle} />}
        ListEmptyComponent={<Loading />}
        ListHeaderComponent={matches.length ? <MatchesHeader dateRange={matchDateRange} /> : null}
      />
    )
  }
}
