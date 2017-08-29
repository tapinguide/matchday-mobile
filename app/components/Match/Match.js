import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView } from 'react-native';
import InProgressMatch from './InProgressMatch';
import ScheduledMatch from './ScheduledMatch';
import CompletedMatch from './CompletedMatch';

export default class Match extends Component {
  render() {
    let matchObject = this.props.match;
    let status = matchObject.status.description;
    let index = this.props.matchIndex;
    let blob = this.props.handleMatchPress;

    var returnMatch;
    if(status === 'In Progress' || status === 'HT'){
        returnMatch = <InProgressMatch match={matchObject} key={matchObject.id} matchIndex={index} tvDetails={matchObject.tvDetails} venue={matchObject.venue} handleMatchPress={blob}/>
    }
    else if(status === 'Scheduled' || status === 'Post.'){
        returnMatch = <ScheduledMatch match={matchObject} key={matchObject.id} matchIndex={index} tvDetails={matchObject.tvDetails} venue={matchObject.venue} handleMatchPress={blob}/>
    }
    else if(status === 'FT'
        || status === "AET"
        || status === "Pen."
        || status === "Awarded"
        || status === "Cancl."){
        returnMatch = <CompletedMatch match={matchObject} key={matchObject.id} matchIndex={index} tvDetails={matchObject.tvDetails} venue={matchObject.venue} handleMatchPress={blob}/>
    }

    return (
        <View>
         {returnMatch}
         </View>
    );
  }
}