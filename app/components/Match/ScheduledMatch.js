import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView,TouchableHighlight } from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import Panel from '../Panel/Panel';

export default class ScheduledMatch extends Component {
    constructor(props){
      super(props);

      this.state = {
          panelExpanded    : false
      };
  }
  _onPressButton = () => {

    this.setState(
      {
        panelExpanded: !this.state.panelExpanded
      }
    );
  }
  render() {

    var match = this.props.match;
    var matchIndex = this.props.matchIndex;
    var preMatchDetails = match.preMatchDetails;
    var matchDate = moment.utc(match.matchTime).local().format('ddd M/D h:mma').toUpperCase();

    var htmlContent = "<htmlcontent>" + preMatchDetails + "</htmlcontent>";
    return (
      <TouchableHighlight onPress={() => this._onPressButton()}>
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
                      source={{uri: match.homeClub.crest.replace("http://", "https://") }} />
                  </View>
                  <View>
                      <Text style={styles.vs}>vs</Text>
                  </View>
                  <View styles={styles.awayCrest}>
                    <Image
                      style={{width: 40, height: 40}}
                      source={{uri: match.visitorClub.crest.replace("http://", "https://")}} />
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
                  <Text style={{
                    fontFamily: 'poppins-regular',
                    paddingLeft:35,
                    fontSize: 12,
                    lineHeight: 18,
                    fontWeight: '300'
                  }}>Live match data to come</Text>
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
    height: 48,
    width: 43,
    position: "absolute",
    top: 0, left: 0,
    zIndex: 1
  },
  matchNumber: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: '#FFFFFF',
    fontWeight: '700',
    position: 'absolute',
    top: 6, left: 6,
    zIndex: 2
  }
})
