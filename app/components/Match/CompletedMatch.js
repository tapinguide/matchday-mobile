import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView, TouchableHighlight } from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';
import Event from '../Event/Event';
import Panel from '../Panel/Panel';

export default class CompletedMatch extends Component {
  constructor(props){
      super(props);
      this.state = {
          panelExpanded: false
      };
  }

  _onPressButton = (event) => {
    this.props.handleMatchPress();

    // Print component dimensions to console
    this.refs.mycomponent.measure( (fx, fy, width, height, px, py) => {
        // console.log('Component width is: ' + width)
        // console.log('Component height is: ' + height)
        // console.log('X offset to frame: ' + fx)
        console.log('Y offset to frame: ' + fy)
        // console.log('X offset to page: ' + px)
        console.log('Y offset to page: ' + py)
    })


    this.setState(
      {
        panelExpanded: !this.state.panelExpanded
      }
    );
  }

  onLayout = (event) => {
    console.log('on layout: ', event.nativeEvent.layout);
  }

  getTVVenueDetails(tvDetails, venue){

    if(tvDetails != null && venue != null && tvDetails.length > 0 && venue.length > 0)
      {
          return (
              <tv-venue>
                  <View style={styles.tvVenue}>
                      <Image source={require('./images/TV.png')} /><Text style={styles.tvText}>{tvDetails.toUpperCase()}</Text>
                  </View>
                  <View style={styles.tvVenue}>
                      <Image source={require('./images/pitch.png')} /><Text style={styles.tvText}>{venue.toUpperCase()}</Text>
                  </View>
              </tv-venue>
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

    let { match, matchIndex, tvDetails, venue } = this.props;

    var sortedEvents = match.events.sort((a,b) => {
      return a.id - b.id
    }).reverse();

    var postMatchDetails = match.preMatchDetails;
    if(match.inMatchDetails){
      postMatchDetails = match.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = match.postMatchDetails
    }

    var events = [];
    match.events.forEach(function(event, index) {
      if(event.eventType === "yellowcard"
        || event.eventType === "yellowred"
        || event.eventType === "redcard"
        || event.eventType === "subst"
        || event.eventType === "goal")
    {
      if(index > 0){
        events.push(<View key={index + '-' + event.id}><View style={{width: 3,height: 22, marginRight: 'auto', marginLeft: 'auto', backgroundColor: '#bdbdbd'}} key={event.id + index}></View><Event event={event} key={event.id} /></View>);
      }
      else
      {
        events.push(<Event event={event} key={event.id} />);
      }
    }
    });

    //For some reason the HTMLView component needs to have the content wrapped otherwise it will add a line break for
    //each tag.
    var htmlContent = "<htmlcontent>" + postMatchDetails + "</htmlcontent>";
    return (
      <TouchableHighlight
        onPress={() => this._onPressButton()}
        // onPress={(event) => this.props.handleMatchPress(event)}
        activeOpacity={1}
        ref="mycomponent"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#f5f5f5',
            paddingBottom: 0,
            borderRightWidth:0,
            borderRightColor: '#e7e7e7',
            borderBottomWidth: 1,
            borderBottomColor: '#e7e7e7',
            borderLeftWidth: 0,
            borderLeftColor: '#e7e7e7',
          }}
          // onLayout = {this.onLayout}
        >
        <View style={styles.matchNumberContainer}>
          <Text style={styles.matchNumber}>{matchIndex}</Text>
          <Image source={require('./images/rectangle.png')} style={styles.numberbg}>
          </Image>
        </View>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingTop: 20,
          paddingBottom:20,
          paddingRight: 60,
          paddingLeft:60
        }}>
          <Text style={{
            fontSize: 32,
            fontWeight: '700',
            fontFamily: 'poppins-semi-bold'
          }}>{match.homeClubScore}</Text>
          <View style={{
            justifyContent: 'space-around',
          alignItems: 'center',
          }}>
            <Image
              style={{width: 40, height: 40}}
              source={{uri: match.homeClub.crest}} />
              <Text style={styles.shortName}>{match.homeClub.shortName}</Text>
            </View>
          <Text style={{
              fontFamily: 'poppins-semi-bold',
              fontSize: 14
            }}>FT</Text>
            <View>
          <Image
            style={{width: 40, height: 40}}
            source={{uri: match.visitorClub.crest}} />
            <Text style={styles.shortName}>{match.visitorClub.shortName}</Text>
          </View>
          <Text style={{
            fontSize: 32,
            fontFamily: 'poppins-semi-bold'
          }}>{match.visitorClubScore}</Text>
        </View>
        <View
          style={{
          flex:1,
          alignItems:'center'
        }}>
          <View style={{width:'84%'}}>
            <HTMLView
              value={htmlContent}
              stylesheet={styles}
              />
            <Panel underlayColor="#f5f5f5" panelExpanded={this.state.panelExpanded}>
              {this.getTVVenueDetails(tvDetails, venue)}
              {events}
            </Panel>
          </View>
        </View>
      </View>
    </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 7,
    fontSize: 12,
    lineHeight: 18
  },
  numberbg: {
    height: 48,
    width: 43,
    position: "absolute",
    top: 0, 
    left: 0,
    zIndex: 1
  },
  matchNumber: {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    color: '#FFFFFF',
    fontWeight: '700',
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
  tvVenue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F6F6F6',
    padding: 6,
    marginBottom: 8
  },
  tvText: {
    fontFamily: 'poppins-regular',
    fontSize: 11,
    lineHeight: 18,
    letterSpacing: 1,
    paddingLeft: 8
  }
})
