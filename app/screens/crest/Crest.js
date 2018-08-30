import { Asset } from 'expo'
import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import HTMLView from 'react-native-htmlview'
import Analytics from '../../components/lib/analytics'
import MatchService from '../../components/lib/matchservice'
import Loading from '../../components/Loading/Loading'

export default class Crest extends Component {
  state = {
    crest: null,
  }

  async componentDidMount() {
    Analytics.trackScreen('Crest of the Week')

    const crest = await MatchService.getStoredCrest()
    this.mounted = true
    this.setState({ crest }, this.updateCrest)
  }

  updateCrest = () => {
    MatchService.getCrest()
      .then(crest => this.setState({ crest }))
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
      })
  }

  render() {
    const { crest } = this.state
    if (!crest) return <Loading />

    const htmlContent = `<htmlcontent>${crest.body}</htmlcontent>`

    return (
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>Crest of the Week</Text>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
          <Image style={{ marginHorizontal: 20, width: 100, height: 100 }} resizeMode="contain" source={{ uri: crest.currentBadge }} />
          <Image style={{ marginHorizontal: 20, width: 100, height: 100 }} resizeMode="contain" source={{ uri: crest.newBadge }} />
        </View>
        <Text style={styles.intro}>{crest.clubName}</Text>
        <HTMLView value={htmlContent} stylesheet={styles} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 7,
    fontSize: 14,
    lineHeight: 18,
    paddingBottom: 160,
  },
  a: {
    textDecorationColor: '#08E5E3',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  i: {
    fontFamily: 'poppins-light',
  },
  em: {
    fontFamily: 'poppins-light',
  },
  b: {
    fontFamily: 'poppins-bold',
  },
  strong: {
    fontFamily: 'poppins-bold',
  },
  content: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    paddingBottom: 80,
  },
  heading: {
    fontFamily: 'poppins-semi-bold',
    fontSize: 32,
  },
  intro: {
    fontFamily: 'poppins-regular',
    fontSize: 20,
    lineHeight: 25,
  },
})
