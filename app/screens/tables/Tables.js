import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import Table from './Table'

export default class Tables extends Component {
  state = {
    tables: [{ id: 33 }, { id: 28 }, { id: 30 }, { id: 29 }], //, { id: 34 }],
  }

  render() {
    const { tables } = this.state

    return (
      <FlatList
        style={styles.content}
        data={tables}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Table competitionId={item.id} />}
        ListHeaderComponent={<Text style={styles.heading}>League Tables</Text>}
        ListFooterComponent={<View style={{ height: 30 }} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 80,
  },
  heading: {
    fontFamily: 'poppins-semi-bold',
    fontSize: 32,
    marginBottom: 10,
  },
})
