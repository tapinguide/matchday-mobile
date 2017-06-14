import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image } from 'react-native';
import moment from 'moment';

import seconds from './images/seconds.svg';

export default class InProgressMatch extends Component {
  render() {
    var match = this.props.match;
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
    return (
         <View style={styles.match}>
              <View style={styles.contentContainer}>
                <View style={styles.scoreLine}>
                  <View>
                    <Text style={styles.score}>{match.homeClubScore}</Text>
                  </View>
                  <View>
                    <Image 
                      style={{width: 40, height: 40}}
                      source={{uri: 'http://matchday.tapinguide.com/media/crests/ars.png'}} />
                  </View>
                  <View>
                    <Text style={styles.score}>{match.timer}'</Text>
                  </View>
                  <View>
                    <Image 
                      style={{width: 40, height: 40}}
                      source={{uri: 'http://matchday.tapinguide.com/media/crests/che.png'}} />
                  </View>
                  <View>
                    <Text style={styles.score}>{match.visitorClubScore}</Text>
                  </View>
                </View>
              </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  match: {
    flex: 1,
    height: 200,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%'
  },
  score: {
    fontSize: 20,
    fontWeight: '700'
  }
  
})
