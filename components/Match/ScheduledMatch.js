import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';

export default class ScheduledMatch extends Component {
  render() {

    var match = this.props.match;
    var matchIndex = this.props.matchIndex;
    var preMatchDetails = match.preMatchDetails;
    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();

    var htmlContent = "<htmlcontent>" + preMatchDetails + "</htmlcontent>";
    return (
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
                  </View>
                  <View>
                      <Text style={styles.vs}>vs</Text>
                  </View>
                  <View styles={styles.awayCrest}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{uri: match.visitorClub.crest}} />
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
          </View>
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
    paddingBottom: 20
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
    fontWeight: '500',
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
    fontWeight: '300'
  },
  matchNumberContainer: {
    top: -20
  },
  numberbg: {
    height: 35,
    width:32,
    position: "absolute",
    top: 0, left: 0,
    zIndex: 1
  },
  matchNumber: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: '#FFFFFF',
    fontWeight: '700',
    position: 'absolute',
    top: 3, left: 4,
    zIndex: 2
  }
})
