import React, { Component } from 'react'
import {
  ActivityIndicator,
  ListView,
  Text,
  View,
  StyleSheet,
  Image,
  WebView,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
} from 'react-native'
import HTMLView from 'react-native-htmlview'
import moment from 'moment'
import Event from '../Event/Event'
import Panel from '../Panel/Panel'
import TVVenueDetails from './TVVenueDetails'
import { LinearGradient } from 'expo'

export default class CompletedMatch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panelExpanded: false,
      highlightsUrl: '',
    }
  }

  componentDidMount() {
    this.setState(state => ({
      ...state,
      highlightsUrl: this.props.match.highlightsUrl,
    }))
  }

  _onPressButton = event => {
    this.props.handleMatchPress()

    this.setState(
      state => ({
        ...state,
        panelExpanded: !this.state.panelExpanded,
      }),
      () => {
        this.props.onMatchToggle(this.props.index)
      }
    )
  }

  handleHighlightsPress = () => {
    let { highlightsUrl } = this.state

    Linking.openURL(highlightsUrl).catch(err => console.error('An error occurred', err))
  }

  render() {
    let { match, matchIndex, tvDetails, venue } = this.props
    let { highlightsUrl } = this.state

    var sortedEvents = match.events
      .sort((a, b) => {
        return a.id - b.id
      })
      .reverse()

    var postMatchDetails = match.preMatchDetails
    if (match.inMatchDetails) {
      postMatchDetails = match.inMatchDetails
    } else if (match.postMatchDetails) {
      postMatchDetails = match.postMatchDetails
    }

    var events = []
    match.events.forEach(function(event, index) {
      if (
        event.eventType === 'yellowcard' ||
        event.eventType === 'yellowred' ||
        event.eventType === 'redcard' ||
        event.eventType === 'subst' ||
        event.eventType === 'goal'
      ) {
        if (index > 0) {
          events.push(
            <View key={index + '-' + event.id}>
              <View
                style={{ width: 3, height: 22, marginRight: 'auto', marginLeft: 'auto', backgroundColor: '#bdbdbd' }}
                key={event.id + index}
              />
              <Event event={event} key={event.id} />
            </View>
          )
        } else {
          events.push(<Event event={event} key={event.id} />)
        }
      }
    })

    //For some reason the HTMLView component needs to have the content wrapped otherwise it will add a line break for
    //each tag.
    var htmlContent = '<htmlcontent>' + postMatchDetails + '</htmlcontent>'

    let penaltyKicks = match.homeClubPenalties || match.visitorClubPenalties ? true : false
    let highlights = null
    if (highlightsUrl) {
      highlights = (
        <View style={styles.highlightsColumn}>
          <TouchableOpacity onPress={event => this.handleHighlightsPress(event)} style={styles.highlightsButton}>
            <LinearGradient colors={['#27E8CD', '#23D3EA']} style={styles.highlightsIconContainer}>
              <Image style={{ width: 16, height: 11 }} source={require('./images/video-camera.png')} />
            </LinearGradient>
            <Text style={styles.highlightsButtonText}>Highlights</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      highlights = <View />
    }
    return (
      <TouchableHighlight onPress={() => this._onPressButton()} activeOpacity={1} ref="mycomponent">
        <View
          style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            paddingBottom: 0,
            borderRightWidth: 0,
            borderRightColor: '#e7e7e7',
            borderBottomWidth: 1,
            borderBottomColor: '#e7e7e7',
            borderLeftWidth: 0,
            borderLeftColor: '#e7e7e7',
          }}
        >
          <View style={styles.matchNumberContainer}>
            <Text style={styles.matchNumber}>{matchIndex}</Text>
            <Image source={require('./images/rectangle.png')} style={styles.numberbg} />
          </View>
          <View style={penaltyKicks ? [styles.cardHeader, styles.cardHeaderPenalties] : styles.cardHeader}>
            <Text style={penaltyKicks ? [styles.scorePens, styles.scorePensHome] : styles.scoreFormatting}>
              {match.homeClubScore}
              {penaltyKicks ? '(' + match.homeClubPenalties + ')' : ''}
            </Text>
            <View
              style={{
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Image style={{ width: 40, height: 40 }} source={{ uri: match.homeClub.crest }} />
              <Text style={styles.shortName}>{match.homeClub.shortName}</Text>
            </View>
            <Text style={penaltyKicks ? styles.FTPens : styles.FT}>{penaltyKicks ? 'FT (P)' : 'FT'}</Text>
            <View>
              <Image style={{ width: 40, height: 40 }} source={{ uri: match.visitorClub.crest }} />
              <Text style={styles.shortName}>{match.visitorClub.shortName}</Text>
            </View>
            <Text style={penaltyKicks ? [styles.scorePens, styles.scorePensVisitor] : styles.scoreFormatting}>
              {match.visitorClubScore}
              {penaltyKicks ? '(' + match.visitorClubPenalties + ')' : ''}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <View style={highlightsUrl ? { width: '94%' } : { width: '84%' }}>
              <View style={styles.postMatchSummary}>
                {highlights}
                <HTMLView
                  value={htmlContent}
                  stylesheet={styles}
                  style={highlightsUrl ? styles.postMatchSummaryTextWithHighlights : styles.postMatchSummaryText}
                />
              </View>
              <Panel underlayColor="#f5f5f5" panelExpanded={this.state.panelExpanded}>
                <TVVenueDetails tvDetails={tvDetails} venue={venue} />
                {events}
              </Panel>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 7,
    fontSize: 14,
    lineHeight: 18,
  },
  postMatchSummary: {
    flex: 1,
    flexDirection: 'row',
  },
  highlightsColumn: {
    width: 75,
    marginRight: '5%',
  },
  postMatchSummaryTextWithHighlights: {
    width: '70%',
  },
  postMatchSummaryText: {
    width: '100%',
  },
  highlightsButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginTop: 8,
  },
  highlightsButtonText: {
    fontSize: 10,
    textAlign: 'center',
  },
  highlightsIconContainer: {
    backgroundColor: 'transparent',
    borderRadius: 3,
    padding: 5,
    borderColor: 'transparent',
    width: 30,
    flex: 1,
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 5,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 60,
    paddingLeft: 60,
  },
  cardHeaderPenalties: {
    paddingRight: 40,
    paddingLeft: 40,
  },
  numberbg: {
    height: 48,
    width: 43,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  scorePens: {
    fontSize: 26,
    fontWeight: '700',
    fontFamily: 'poppins-semi-bold',
  },
  scorePensHome: {
    marginRight: 20,
  },
  scorePensVisitor: {
    marginLeft: 20,
  },
  scoreFormatting: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: 'poppins-semi-bold',
  },
  FT: {
    fontFamily: 'poppins-semi-bold',
    fontSize: 14,
  },
  FTPens: {
    fontFamily: 'poppins-semi-bold',
    fontSize: 14,
    marginRight: 20,
    marginLeft: 20,
  },
  matchNumber: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: '#FFFFFF',
    fontWeight: '700',
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
  b: {
    fontFamily: 'poppins-bold',
  },
  strong: {
    fontFamily: 'poppins-bold',
  },
})
