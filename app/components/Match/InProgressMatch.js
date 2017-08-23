import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView, TouchableHighlight } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Panel from '../Panel/Panel';
import Event from '../Event/Event';
import moment from 'moment';
import seconds from './images/secs.gif';

export default class InProgressMatch extends Component {
  constructor(props){
      super(props);

      this.state = {
          panelExpanded    : false
      };
  }
  _onPressButton = () => {
    console.log('panel expanded pre update: ', this.state.panelExpanded);
    this.setState(
      {
        panelExpanded: !this.state.panelExpanded
      }
    );
  }

  getTimelineEvents(events)
  {
    if(events.length === 0){
     return (
        <Text style={{
          fontFamily: 'poppins-regular',
          paddingLeft:0,
          fontSize: 12,
          lineHeight: 18,
          fontWeight: '300'
        }}>Live match data to come</Text>
      );
    }
    else{
      return events;
    }
  }
    render() {
    var match = this.props.match;
    var matchIndex = this.props.matchIndex
    var sortedEvents = match.events.sort((a,b) => {
      return a.id - b.id
    }).reverse();

    var secondsStyle = {height: 12, backgroundPosition: "center top", backgroundRepeat: "no-repeat", backgroundImage: "url(" + seconds + ")"};

    var postMatchDetails = match.preMatchDetails;
    if(match.inMatchDetails){
      postMatchDetails = match.inMatchDetails;
    }
    else if(match.postMatchDetails){
      postMatchDetails = match.postMatchDetails
    }

    var events = [];
    match.events.forEach(function(event, index) 
    {
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
    <TouchableHighlight onPress={() => this._onPressButton()}>
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 0,
        borderRightWidth:0,
        borderRightColor: '#e7e7e7',
        borderBottomWidth: 1,
        borderBottomColor: '#e7e7e7',
        borderLeftWidth: 0,
        borderLeftColor: '#e7e7e7',
      }}>
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
            paddingRight: 40,
            paddingLeft:40
          }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '700',
            fontFamily: 'poppins-semi-bold'
          }}>
            {match.homeClubScore}
          </Text>
          <Image
            style={{width: 40, height: 40}}
            source={{uri: match.homeClub.crest.replace("http://", "https://")}} />
          <View style={{
                  flexDirection: 'column',
                  alignItems: 'center'}}>
            <Text style={{fontFamily: 'poppins-regular', fontSize: 14}}>{match.timer}'</Text>
            <Image source={seconds} style={{height:12, width:20}}/>
          </View>
          <Image
            style={{width: 40, height: 40}}
            source={{uri: match.visitorClub.crest.replace("http://", "https://")}} />
          <Text style={{
                fontSize: 20,
                fontWeight: '700',
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
            <Panel title="" underlayColor="#fff" panelExpanded={this.state.panelExpanded}>
              {this.getTimelineEvents(events)}
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
    lineHeight: 18,
    fontWeight: '300'
  },
  matchNumberContainer: {

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
