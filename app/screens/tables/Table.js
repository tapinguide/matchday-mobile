import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo'
import { forEach, groupBy } from 'lodash'

import MatchService from '../../components/lib/matchservice'
import Group from './Group'

export default class Table extends Component {
  static propTypes = {
    competitionId: PropTypes.number.isRequired,
  }

  state = {
    panelExpanded: false,
    table: null,
  }

  componentWillMount() {
    const { competitionId } = this.props
    const table = null //await MatchService.getStoredTables(competitionId)

    this.setState({ table }, this.updateTable)
  }

  updateTable = () => {
    const { competitionId } = this.props

    MatchService.getTables(competitionId)
      .then(table => this.setState({ table }))
      .catch(error => {
        console.log('There has been a problem with your fetch operation: ' + error.message)
        throw error
      })
  }

  render() {
    const { table } = this.state

    if (!table) return <View />
    const { competition, teams } = table
    const groups = groupBy(teams, 'compGroup')
    const groupMarkup = []
    forEach(groups, (teams, key) => {
      let group = key !== 'null' ? key : ''
      group = group.replace(' Conference', '')
      groupMarkup.push(<Group teams={teams} group={group} key={groupMarkup.length} />)
    })
    return (
      <View style={styles.table}>
        <LinearGradient style={{ padding: 5 }} colors={['#18EFC6', '#18D0EF']} start={[0, 0]} end={[1, 0]}>
          <Text style={styles.headerText}>{competition.name}</Text>
        </LinearGradient>
        {groupMarkup}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  table: {
    backgroundColor: '#ffffff',
    marginBottom: 20,
    elevation: 16,
    shadowColor: 'rgba(0, 0, 0, 0.08)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  headerText: {
    color: '#ffffff',
    fontFamily: 'poppins-semi-bold',
    fontSize: 17,
    textAlign: 'center',
  },
})
