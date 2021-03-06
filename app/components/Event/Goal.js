import React, { Component } from 'react'
import { Asset } from 'expo'
import { Text, View, StyleSheet, Image } from 'react-native'

const goalIcon = require('./images/goal.png')

export default class Goal extends React.Component {
  async componentWillMount() {
    await Asset.loadAsync([goalIcon])
  }

  render() {
    var event = this.props.event
    var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10)
    var player = event.player
    var clubCrestUrl = event.club.crest

    var homeTeamShortName = event.match.homeClub.shortName
    var awayTeamShortName = event.match.visitorClub.shortName
    var homeTeamSubScore = 0
    var awayTeamSubScore = 0
    var result
    result = event.result
      .replace('[', '')
      .replace(']', '')
      .split('-')
    homeTeamSubScore = result[0]
    awayTeamSubScore = result[1]

    var cardSide
    if (event.eventTeamName === event.match.homeClub.name) {
      cardSide = (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch', height: 70 }}>
          <View
            style={{ marginBottom: 1, marginLeft: 10, paddingTop: 0, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image style={{ width: 40, height: 40 }} source={{ uri: clubCrestUrl }} />
          </View>
          <View
            style={{
              marginBottom: 1,
              marginLeft: 15,
              marginRight: 'auto',
              paddingTop: 0,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{ width: 'auto', fontFamily: 'poppins-semi-bold', fontSize: 17 }}>{player}</Text>
            <Text>
              {homeTeamShortName} ({homeTeamSubScore}) {awayTeamShortName} ({awayTeamSubScore})
            </Text>
          </View>
        </View>
      )
    } else {
      cardSide = (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch', height: 70 }}>
          <View
            style={{
              marginBottom: 1,
              marginLeft: 'auto',
              marginRight: 15,
              paddingTop: 0,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <Text style={{ width: 'auto', fontFamily: 'poppins-semi-bold', fontSize: 17 }}>{player}</Text>
            <Text>
              {homeTeamShortName} ({homeTeamSubScore}) {awayTeamShortName} ({awayTeamSubScore})
            </Text>
          </View>
          <View
            style={{ marginBottom: 1, marginRight: 10, paddingTop: 0, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image style={{ width: 40, height: 40 }} source={{ uri: clubCrestUrl }} />
          </View>
        </View>
      )
    }
    return (
      <View style={styles.card}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#18efc6',
            height: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={{ width: '10%' }}>
            <Image
              style={{
                height: 20,
              }}
              source={goalIcon}
            />
          </View>
          <View style={{ width: '80%' }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'poppins-semi-bold',
                color: '#fff',
              }}
            >
              Goal
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'poppins-semi-bold',
                color: '#fff',
              }}
            >
              {minute}'
            </Text>
          </View>
        </View>
        {cardSide}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    height: 'auto',
    marginBottom: -1,
    paddingBottom: 0,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: '#e1e1e1',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 22,
    backgroundColor: '#fff',
  },
})
