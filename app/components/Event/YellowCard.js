import React, { Component } from 'react'
import { Asset } from 'expo'
import { Text, View, StyleSheet, Image } from 'react-native'

const cardIcon = require('./images/card.png')
const yellowRedIcon = require('./images/yellowred.png')

export default class YellowCard extends React.Component {
  async componentWillMount() {
    await Asset.loadAsync([cardIcon, yellowRedIcon])
  }

  render() {
    var event = this.props.event
    var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10)
    var player = event.player
    var clubCrestUrl = event.club.crest
    var homeTeam = event.match.homeClub.name
    var awayTeam = event.match.visitorClub.name
    var homeTeamSubScore = 0
    var awayTeamSubScore = 0
    var cardSide
    var cardType = cardIcon
    var cardText = 'Yellow Card'

    if (event.eventType === 'yellowred') {
      cardType = yellowRedIcon
      cardText = 'Second Yellow Card'
    }

    if (event.eventTeamName === homeTeam) {
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
            <Text style={{ width: 'auto', fontFamily: 'poppins-semi-bold', fontSize: 17, fontWeight: '600' }}>
              {player}
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
            <Text style={{ width: 'auto', fontFamily: 'poppins-semi-bold', fontSize: 17, fontWeight: '600' }}>
              {player}
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
            backgroundColor: '#ffdf1a',
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
              source={cardType}
            />
          </View>
          <View style={{ width: '80%' }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'poppins-semi-bold',
                color: '#fff',
                fontWeight: '700',
              }}
            >
              {cardText}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'poppins-semi-bold',
                color: '#fff',
                fontWeight: '700',
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
