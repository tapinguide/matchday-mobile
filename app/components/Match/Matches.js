import React, { Component } from 'react'
import { FlatList, StatusBar, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import moment from 'moment'

import Match from './Match'
import MustReadWatch from '../MustReadWatch/MustReadWatch'
import Loading from '../Loading/Loading'
import HeaderBar from '../HeaderBar/HeaderBar'
import MatchesHeader from '../MatchesHeader/MatchesHeader'
import NewsletterSubscribeForm from '../NewsletterSubscribeForm'
import Footer from '../Footer/Footer'

import MatchService from '../lib/matchservice'

export default class Matches extends Component {
  state = {
    matches: [],
    matchIndex: 1,
    readWatch: [],
  }
  flatList = null
  timerID = null

  componentDidMount() {
    this.updateMatches()
  }

  componentWillUnmount() {
    clearTimeout(this.timerID)
  }

  setMatchDateRange = () => {
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
    Promise.all([
      MatchService.getMatches().then(matches => this.setState({ matches }, this.setMatchDateRange)),
      MatchService.getReadWatch().then(readWatch => this.setState({ readWatch })),
    ])
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
      })
      .finally(() => {
        this.timerID = setTimeout(this.updateMatches, 5000)
      })
  }

  _onMatchCollapse = (index = -1) => {
    if (this.flatList && index > -1) {
      this.flatList.scrollToIndex({ index })
    }
  }

  render() {
    const { matchDateRange, matches, readWatch } = this.state
    const { navigation } = this.props

    const readWatchComponent = readWatch.length ? (
      <View>
        <MustReadWatch link={readWatch[0]} />
        <MustReadWatch link={readWatch[1]} />
      </View>
    ) : null

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <HeaderBar />
        <FlatList
          ref={component => (this.flatList = component)}
          style={{ flex: 1 }}
          data={matches}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <Match match={item} matchIndex={index} onMatchCollapse={this._onMatchCollapse} />
          )}
          ListEmptyComponent={<Loading />}
          ListHeaderComponent={matches.length ? <MatchesHeader dateRange={matchDateRange} /> : null}
          ListFooterComponent={
            matches.length ? (
              <View>
                {readWatchComponent}
                <NewsletterSubscribeForm />
                <Footer navigation={navigation} />
              </View>
            ) : null
          }
        />
      </KeyboardAvoidingView>
    )
  }
}
