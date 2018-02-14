import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import MatchService from '../../components/lib/matchservice'

export default class Tables extends Component {
  state = {
    tables: [],
  }

  componentDidMount() {
    this.setState({ tables: MatchService.tables }, () => {
      this.updateTables()
    })
  }

  updateTables = () => {
    MatchService.getTables()
      .then(tables => this.setState({ tables }))
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
      })
  }

  render() {
    const { tables } = this.state

    return (
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>League Tables</Text>
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
