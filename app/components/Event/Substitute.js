import React, { Component } from 'react'
import { Asset } from 'expo'
import { Text, View, StyleSheet, Image } from 'react-native'

const subIcon = require('./images/sub.png')
const subonIcon = require('./images/subon.png')
const suboffIcon = require('./images/suboff.png')

export default class Substitute extends React.Component {
  async componentWillMount() {
    await Asset.loadAsync([subIcon, subonIcon, suboffIcon])
  }
  render() {
    var event = this.props.event
    var minute = parseInt(event.minute, 10) + parseInt(event.extraMinute, 10)
    var player = event.player
    var assist = event.assist
    var clubCrestUrl = event.club.crest
    var homeTeam = event.match.homeClub.name
    var awayTeam = event.match.visitorClub.name
    var homeTeamSubScore = 0
    var awayTeamSubScore = 0

    var cardSide
    if (event.eventTeamName === homeTeam) {
      cardSide = (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'stretch', height: 70 }}>
          <View
            style={{ marginBottom: 1, marginLeft: 10, paddingTop: 0, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image style={{ width: 40, height: 40 }} source={{ uri: clubCrestUrl }} />
          </View>
          <View style={{ marginBottom: 1, marginLeft: 10, padding: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image style={{ margin: 5 }} source={subonIcon} />
            <Image style={{ margin: 5 }} source={suboffIcon} />
          </View>
          <View
            style={{
              marginBottom: 1,
              marginLeft: 15,
              marginRight: 'auto',
              padding: 0,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <Text style={{ margin: 0, width: 'auto', fontFamily: 'poppins-semi-bold', fontSize: 17 }}>{player}</Text>
            <Text style={{ margin: 0, width: 'auto', fontFamily: 'poppins-semi-bold', fontSize: 17 }}>{assist}</Text>
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
            <Text style={{ margin: 0, width: 'auto', fontFamily: 'poppins-semi-bold', fontSize: 17 }}>{player}</Text>
            <Text style={{ margin: 0, width: 'auto', fontFamily: 'poppins-semi-bold', fontSize: 17 }}>{assist}</Text>
          </View>
          <View
            style={{ marginBottom: 1, marginRight: 0, paddingTop: 0, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image style={{ margin: 5 }} source={subonIcon} />
            <Image style={{ margin: 5 }} source={suboffIcon} />
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
            backgroundColor: '#9d9d9d',
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
              source={subIcon}
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
              Substitute
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
