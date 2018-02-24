import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Asset, LinearGradient } from 'expo'

import Panel from '../../components/Panel/Panel'
import MatchService from '../../components/lib/matchservice'

const tapInLogo = require('./images/logo.png')

export default class Table extends Component {
  static propTypes = {
    competitionId: PropTypes.number.isRequired,
  }

  state = {
    panelExpanded: false,
    table: null,
  }

  async componentWillMount() {
    const { competitionId } = this.props
    console.log(competitionId)
    const table = null //await MatchService.getStoredTables(competitionId)

    await Asset.loadAsync([tapInLogo])

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
    const { panelExpanded, table } = this.state

    if (!table) return <View />
    const { competition, teams } = table

    const topFive = teams.slice(0, 5)
    const rest = teams.slice(5)

    return (
      <TouchableOpacity
        style={styles.table}
        activeOpacity={1}
        onPress={() => this.setState({ panelExpanded: !panelExpanded })}
      >
        <LinearGradient style={{ padding: 5 }} colors={['#18EFC6', '#18D0EF']} start={[0, 0]} end={[1, 0]}>
          <Text style={styles.headerText}>{competition.name}</Text>
        </LinearGradient>
        <View style={styles.row}>
          <Text style={[styles.statText, styles.bold, { textAlign: 'left', width: 40 }]} />
          <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
            <Text style={[styles.clubText, styles.bold, { marginLeft: 0 }]}>Team</Text>
          </View>
          <Text style={[styles.statText, styles.bold]}>GD</Text>
          <Text style={[styles.statText, styles.bold]}>PTS</Text>
        </View>
        {topFive.map((row, index) => <Row key={row.club.id} row={row} index={index} />)}
        <Panel title={''} underlayColor={'#ffffff'} panelExpanded={panelExpanded}>
          {rest.map((row, index) => <Row key={row.club.id} row={row} index={index + 5} />)}
        </Panel>
      </TouchableOpacity>
    )
  }
}

const Row = props => {
  const { row, index } = props
  const crest = row.club.crest ? { uri: row.club.crest } : tapInLogo
  const goalDiff = row.goalDifference === '+0' ? '0' : row.goalDifference
  let goalDiffColor = '#28323F'
  if (goalDiff.indexOf('+') === 0) {
    goalDiffColor = 'green'
  } else if (goalDiff.indexOf('-') === 0) {
    goalDiffColor = 'red'
  }
  return (
    <View style={[styles.row, { backgroundColor: index % 2 === 0 ? '#F5F5F5' : 'transparent' }]}>
      <Text style={[styles.statText, styles.bold, { textAlign: 'left', width: 40 }]}>{row.position}.</Text>
      <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row' }}>
        <Image style={styles.crest} source={crest} />
        <Text style={styles.clubText}>{row.club.name}</Text>
      </View>
      <Text style={[styles.statText, { color: goalDiffColor }]}>{goalDiff}</Text>
      <Text style={[styles.statText, styles.bold]}>{row.points}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  crest: {
    height: 20,
    marginRight: 5,
    width: 20,
  },
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
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  headerText: {
    color: '#ffffff',
    fontFamily: 'poppins-semi-bold',
    fontSize: 17,
    textAlign: 'center',
  },
  clubText: {
    color: '#28323F',
    fontFamily: 'poppins-regular',
    fontSize: 13,
    paddingHorizontal: 5,
  },
  statText: {
    color: '#28323F',
    fontFamily: 'poppins-regular',
    fontSize: 13,
    paddingHorizontal: 10,
    textAlign: 'center',
    width: 50,
  },
  bold: {
    fontFamily: 'poppins-semi-bold',
  },
})
