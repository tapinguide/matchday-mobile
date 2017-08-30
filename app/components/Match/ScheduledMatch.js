import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView,TouchableHighlight } from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import Panel from '../Panel/Panel';

export default class ScheduledMatch extends Component {
    constructor(props){
      super(props);

      this.state = {
          panelExpanded: false
      };
  }
  _onPressButton = () => {
    this.setState(
      {
        panelExpanded: !this.state.panelExpanded
      }
    );
  }

  getTVVenueDetails(tvDetails, venue){

    if(tvDetails != null && venue != null && tvDetails.length > 0 && venue.length > 0)
      {
          return (
              <View>
                  <View style={styles.tvVenue}>
                      <Image source={require('./images/TV.png')} /><Text style={styles.tvText}>{tvDetails.toUpperCase()}</Text>
                  </View>
                  <View style={styles.tvVenue}>
                      <Image source={require('./images/pitch.png')} /><Text style={styles.tvText}>{venue.toUpperCase()}</Text>
                  </View>
              </View>
          )
      }
      else if(tvDetails != null && tvDetails.length > 0){
          return (
                  <View style={styles.tvVenue}>
                    <Image source={require('./images/TV.png')} /><Text style={styles.tvText}>{tvDetails.toUpperCase()}</Text>
                  </View>
                );
      }
      else if(venue != null && venue.length > 0){
          return (
                  <View style={styles.tvVenue}>
                      <Image source={require('./images/pitch.png')} /><Text style={styles.tvText}>{venue.toUpperCase()}</Text>
                  </View>
          )
      }
      else{
          return <View></View>
      }


}
  render() {

    var match = this.props.match;
    var matchIndex = this.props.matchIndex;
    var tvDetails = this.props.tvDetails;
    var venue = this.props.venue;
    var preMatchDetails = match.preMatchDetails;
    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();

    var htmlContent = "<htmlcontent>" + preMatchDetails + "</htmlcontent>";
    return (
      <TouchableHighlight
        onPress={() => this._onPressButton()}
        activeOpacity={1}
      >
         <View style={styles.match}>
              <View style={styles.contentContainer}>
                <View style={styles.matchNumberContainer}>
                  <Text style={styles.matchNumber}>{matchIndex}</Text>
                  <Image source={require('./images/rectangle.png')} style={styles.numberbg}>
                  </Image>
                </View>
                <View style={styles.crestContainer}>
                  <View style={styles.homeCrest}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{uri: match.homeClub.crest }} />
                      <Text style={styles.shortName}>{match.homeClub.shortName}</Text>
                  </View>
                  <View>
                      <Text style={styles.vs}></Text>
                  </View>
                  <View styles={styles.awayCrest}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{uri: match.visitorClub.crest}} />
                      <Text style={styles.shortName}>{match.visitorClub.shortName}</Text>
                  </View>
                </View>
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.time}>{matchDate}</Text>
                    </View>
                    <HTMLView
                        value={htmlContent}
                        stylesheet={styles}
                    />
                </View>
              </View>
              <View>
                <Panel underlayColor="#f5f5f5" panelExpanded={this.state.panelExpanded}>
                  {this.getTVVenueDetails(tvDetails, venue)}
                  <Text style={styles.liveMatchData}>Live match data to come</Text>
                </Panel>
              </View>
          </View>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  match: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 0,
    borderRightWidth:0,
    borderRightColor: '#e7e7e7',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
    borderLeftWidth: 0,
    borderLeftColor: '#e7e7e7',
  },
  contentContainer:{
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    paddingTop: 20,
    paddingBottom: 0
  },
  crestContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '30%'
  },
  infoContainer: {
    flexDirection: 'column',
    width:'70%'
  },
  time: {
    fontFamily: 'poppins-regular',
    color: '#000',
    fontSize: 10,
    letterSpacing: 2,
    paddingBottom: 7
  },
  vs: {
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 1
  },
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 7,
    fontSize: 12,
    lineHeight: 18,
  },
  matchNumberContainer: {
    top: -20
  },
  numberbg: {
    height: 48,
    width: 43,
    position: 'absolute',
    top: 0, 
    left: 0,
    zIndex: 1
  },
  matchNumber: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: '#FFFFFF',
    position: 'absolute',
    top: 6, 
    left: 6,
    zIndex: 2
  },
  shortName: {
    color: '#757575',
    fontFamily: 'poppins-regular',
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 18,
    textAlign: 'center',
    paddingTop: 5
  },
  liveMatchData: {
    fontFamily: 'poppins-regular',
    marginLeft:35,
    fontSize: 12,
    lineHeight: 18
  },
  tvVenue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F6F6F6',
    padding: 6,
    marginBottom: 8,
    marginLeft: 35,
    marginRight: 35
  },
  tvText: {
    fontFamily: 'poppins-regular',
    fontSize: 11,
    lineHeight: 18,
    letterSpacing: 1,
    paddingLeft: 8
  }
})
