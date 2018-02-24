import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import Table from './Table'

export default class Tables extends Component {
  state = {
    tables: [{ id: 33 }, { id: 34 }],
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
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 34,
  },
  heading: {
    fontFamily: 'poppins-semi-bold',
    fontSize: 32,
    marginBottom: 10,
  },
})
