import React, { Component } from 'react'
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView, TouchableHighlight } from 'react-native'
import { Asset } from 'expo'
import HTMLView from 'react-native-htmlview'
import moment from 'moment'
import Panel from '../Panel/Panel'
import TVVenueDetails from './TVVenueDetails'
import NotificationButton from './NotificationButton'

const rectangleIcon = require('./images/rectangle.png')

export default class ScheduledMatch extends Component {
  state = {
    panelExpanded: false,
  }

  async componentWillMount() {
    await Asset.loadAsync([rectangleIcon])
  }

  _onPressButton = () => {
    this.setState(
      {
        panelExpanded: !this.state.panelExpanded,
      },
      () => {
        this.props.onMatchToggle(this.props.index, this.props.match, this.state.panelExpanded)
      }
    )
  }

  render() {
    var match = this.props.match
    var matchIndex = this.props.matchIndex
    var tvDetails = this.props.tvDetails
    var venue = this.props.venue
    var preMatchDetails = match.preMatchDetails
    var todaysDate = moment().format('MM/DD/YYYY')
    var tomorrowsDate = moment()
      .add(1, 'days')
      .format('MM/DD/YYYY')

    var matchDate = ''
    var localMatchDate = moment.utc(match.matchTime).local()
    if (localMatchDate.format('MM/DD/YYYY') === todaysDate) {
      matchDate = 'TODAY ' + localMatchDate.format('h:mma').toUpperCase()
    } else if (localMatchDate.format('MM/DD/YYYY') === tomorrowsDate) {
      matchDate = 'TOMORROW ' + localMatchDate.format('h:mma').toUpperCase()
    } else {
      matchDate = localMatchDate.format('ddd M/D h:mma').toUpperCase()
    }

    var htmlContent = '<htmlcontent>' + preMatchDetails + '</htmlcontent>'
    return (
      <TouchableHighlight onPress={() => this._onPressButton()} activeOpacity={1}>
        <View style={styles.match}>
          <NotificationButton match={match} tvDetails={tvDetails} />
          <View style={styles.contentContainer}>
            <View style={styles.matchNumberContainer}>
              <Text style={styles.matchNumber}>{matchIndex}</Text>
              <Image source={rectangleIcon} style={styles.numberbg} />
            </View>
            <View style={styles.crestContainer}>
              <View style={styles.homeCrest}>
                <Image style={{ width: 40, height: 40 }} source={{ uri: match.homeClub.crest }} />
                <Text style={styles.shortName}>{match.homeClub.shortName}</Text>
              </View>
              <View>
                <Text style={styles.vs} />
              </View>
              <View styles={styles.awayCrest}>
                <Image style={{ width: 40, height: 40 }} source={{ uri: match.visitorClub.crest }} />
                <Text style={styles.shortName}>{match.visitorClub.shortName}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <View>
                <Text style={styles.time}>{matchDate}</Text>
              </View>
              <HTMLView value={htmlContent} stylesheet={styles} />
            </View>
          </View>
          <View style={styles.panel}>
            <Panel underlayColor="#f5f5f5" panelExpanded={this.state.panelExpanded}>
              <TVVenueDetails tvDetails={tvDetails} venue={venue} />
              <Text style={styles.liveMatchData}>LIVE MATCH DATA TO COME</Text>
            </Panel>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  match: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 0,
    borderRightWidth: 0,
    borderRightColor: '#e7e7e7',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
    borderLeftWidth: 0,
    borderLeftColor: '#e7e7e7',
  },
  contentContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    paddingTop: 20,
    paddingBottom: 0,
  },
  crestContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%',
    marginTop: 34,
  },
  infoContainer: {
    flexDirection: 'column',
    width: '70%',
  },
  time: {
    fontFamily: 'poppins-regular',
    color: '#000',
    fontSize: 10,
    letterSpacing: 2,
    paddingBottom: 7,
  },
  vs: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 7,
    fontSize: 14,
    lineHeight: 18,
  },
  matchNumberContainer: {
    top: -20,
  },
  numberbg: {
    height: 48,
    width: 43,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  matchNumber: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: '#FFFFFF',
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 2,
  },
  shortName: {
    color: '#757575',
    fontFamily: 'poppins-regular',
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 18,
    textAlign: 'center',
    paddingTop: 5,
  },
  panel: {
    width: '80%',
    marginLeft: 35,
  },
  liveMatchData: {
    color: '#868686',
    fontFamily: 'poppins-regular',
    fontSize: 11,
    letterSpacing: 1.5,
    lineHeight: 18,
    textAlign: 'center',
  },
  b: {
    fontFamily: 'poppins-bold',
  },
  strong: {
    fontFamily: 'poppins-bold',
  },
})
