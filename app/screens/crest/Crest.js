import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import MatchService from '../../components/lib/matchservice'

export default class Crest extends Component {
  state = {
    crest: null,
  }

  componentDidMount() {
    this.setState({ crest: MatchService.crest }, () => {
      this.updateContent()
    })
  }

  updateContent = () => {
    MatchService.getCrest()
      .then(crest => this.setState({ crest }))
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
      })
  }

  render() {
    const { crest } = this.state

    return (
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>Crest of the Week</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 34,
  },
  heading: {
    fontFamily: 'poppins-bold',
    fontSize: 40,
    fontWeight: '600',
  },
})
