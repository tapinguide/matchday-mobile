import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class TVVenueDetails extends Component {
  render() {

    var tvVenueDetails;
    var tvDetails = this.props.tvDetails;
    var venue = this.props.venue;

    if(tvDetails != null && venue != null && tvDetails.length > 0 && venue.length > 0)
        {
            tvVenueDetails = (
              <View style={styles.matchDetailContainer}>
                <View style={styles.tvVenue}>
                  <Image source={require('./images/TV.png')} />
                  <Text style={styles.tvText}>{tvDetails.toUpperCase()}</Text>
                </View>
                <View style={styles.tvVenue}>
                  <Image source={require('./images/pitch.png')} />
                  <Text style={styles.tvText}>{venue.toUpperCase()}</Text>
                </View>
              </View>
            )
        }
        else if(tvDetails != null && tvDetails.length > 0){
            tvVenueDetails =  (
              <View style={styles.matchDetailContainer}>
                <View style={styles.tvVenue}>
                  <Image source={require('./images/TV.png')} />
                  <Text style={styles.tvText}>{tvDetails.toUpperCase()}</Text>
                </View>
              </View>
            );
        }
        else if(venue != null && venue.length > 0){
            tvVenueDetails =  (
              <View style={styles.matchDetailContainer}>
                <View style={styles.tvVenue}>
                  <Image source={require('./images/pitch.png')} />
                  <Text style={styles.tvText}>{venue.toUpperCase()}</Text>
                </View>
              </View>
            )
        }
        else{
          tvVenueDetails =  (
            <View></View>
          )
        }
    return (
      tvVenueDetails
    );
  }
}

const styles = StyleSheet.create({
    tvVenue: {
      backgroundColor: 'red',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#F6F6F6',
      padding: 6,
      marginBottom: 8
    },
    tvText: {
      backgroundColor: 'red',
      fontFamily: 'poppins-regular',
      fontSize: 11,
      lineHeight: 18,
      letterSpacing: 1,
      paddingLeft: 8
    },
    matchDetailContainer: {
      backgroundColor: 'blue',
      padding: 8,
    }
  })
