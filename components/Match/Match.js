import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView } from 'react-native';
import InProgressMatch from './InProgressMatch';
import ScheduledMatch from './ScheduledMatch';
import CompletedMatch from './CompletedMatch';

export default class Match extends Component {
  render() {
    var matchObject = this.props.match;
    var status = matchObject.status.description;
    var index = this.props.matchIndex;

    var returnMatch;
    if(status === 'In Progress'){
        returnMatch = <InProgressMatch match={matchObject} key={matchObject.id} matchIndex={index} />
    }
    else if(status === 'Scheduled'){
        returnMatch = <ScheduledMatch match={matchObject} key={matchObject.id} matchIndex={index} />
    }
    else if(status === 'FT'){
        returnMatch = <CompletedMatch match={matchObject} key={matchObject.id} matchIndex={index} />
    }

    return (
        <View>
         {returnMatch}
         </View>
    );
  }
}