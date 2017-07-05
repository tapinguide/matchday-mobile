import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, StyleSheet, Image, WebView } from 'react-native';
import HTMLView from 'react-native-htmlview';
import moment from 'moment';


export default class CompletedMatch extends Component {
  render() {
    
    var match = this.props.match;
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

    //For some reason the HTMLView component needs to have the content wrapped otherwise it will add a line break for
    //each tag.
    var htmlContent = "<htmlcontent>" + postMatchDetails + "</htmlcontent>";
    return (
         <View style={{
           flex: 1,
          backgroundColor: '#f5f5f5',
          paddingBottom: 0,
          borderRightWidth:0,
          borderRightColor: '#e7e7e7',
          borderBottomWidth: 1,
          borderBottomColor: '#e7e7e7',
          borderLeftWidth: 0,
          borderLeftColor: '#e7e7e7',
         }}>
                <Image 
                  source={require('./images/rectangle.png')} 
                  style={{
                    height: 35,
                    width:32,
                    position: "absolute", 
                    top: 0, left: 0
                  }}/>
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
                  }}>{match.homeClubScore}</Text>
                  <Image 
                    style={{width: 40, height: 40}}
                    source={{uri: 'http://matchday.tapinguide.com/media/crests/ars.png'}} />
                    <Text style={{
                        fontFamily: 'poppins-semi-bold', 
                        fontWeight: '600',
                        fontSize: 14
                      }}>FT</Text>
                  <Image 
                    style={{width: 40, height: 40}}
                    source={{uri: 'http://matchday.tapinguide.com/media/crests/che.png'}} />
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
                  <View style={{width:'84%', marginBottom:30}}>
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
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 7,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '300'
  }
})
