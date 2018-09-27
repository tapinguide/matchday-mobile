import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Asset, LinearGradient } from 'expo'
import { Table as DataTable, Row } from 'react-native-table-component'
import Panel from '../../components/Panel/Panel'

const tapInLogo = require('./images/logo.png')

export default class Group extends Component {
  static propTypes = {
    teams: PropTypes.array.isRequired,
    group: PropTypes.string,
  }
  static defaultProps = {
    group: '',
  }

  state = {
    panelExpanded: false,
  }

  async componentWillMount() {
    await Asset.loadAsync([tapInLogo])
  }

  render() {
    const { panelExpanded } = this.state
    const { group, teams } = this.props
    const topFive = teams.slice(0, 5)
    const rest = teams.slice(5)

    const topFiveRows = getItems(topFive)
    const restRows = getItems(rest)

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.setState({ panelExpanded: !panelExpanded })}>
        <DataTable borderStyle={{ borderWidth: 0 }}>
          <Row
            style={styles.row}
            data={['#', getLeft(group || 'Team'), 'GP', 'W', 'D', 'L', 'GD', 'PTS']}
            textStyle={[styles.statText, styles.bold]}
            flexArr={[1, 3, 1, 1, 1, 1, 1, 1]}
          />
          {topFiveRows.map((data, i) => (
            <Row
              key={i}
              data={data}
              style={[styles.row, i % 2 === 0 && { backgroundColor: '#F5F5F5' }]}
              borderStyle={{ borderWidth: 0 }}
              flexArr={[1, 3, 1, 1, 1, 1, 1, 1]}
              textStyle={styles.statText}
            />
          ))}

          <Panel title={''} underlayColor={'#ffffff'} panelExpanded={panelExpanded}>
            {restRows.map((data, i) => (
              <Row
                key={i}
                data={data}
                style={[styles.row, (i + 5) % 2 === 0 && { backgroundColor: '#F5F5F5' }]}
                borderStyle={{ borderWidth: 0 }}
                flexArr={[1, 3, 1, 1, 1, 1, 1, 1]}
                textStyle={styles.statText}
              />
            ))}
          </Panel>
        </DataTable>
      </TouchableOpacity>
    )
  }
}

const getLeft = team => <Text style={[styles.statText, styles.bold, { textAlign: 'left' }]}>{team}</Text>
const getItems = items =>
  items.map((item, index) => {
    const crest = item.club.crest ? { uri: item.club.crest } : tapInLogo
    const shortName = item.club.shortName || item.club.clubName.substring(0,3).toUpperCase()
    const goalDiff = item.goalDifference === '+0' ? '0' : item.goalDifference
    let goalDiffColor = '#28323F'
    if (goalDiff.indexOf('+') === 0) {
      goalDiffColor = 'green'
    } else if (goalDiff.indexOf('-') === 0) {
      goalDiffColor = 'red'
    }
    return [
      getPosition(`${item.position}.`),
      imageCell(crest, shortName),
      item.matchesPlayed,
      item.matchesWon,
      item.matchesDrew,
      item.matchesLost,
      getGoalDiff(goalDiff, goalDiffColor),
      getPoints(item.points),
    ]
  })
const getPosition = position => (
  <Text style={[styles.statText, styles.bold, { paddingRight: 8, textAlign: 'right' }]}>{position}</Text>
)
const getGoalDiff = (goalDiff, goalDiffColor) => (
  <Text style={[styles.statText, { color: goalDiffColor }]}>{goalDiff}</Text>
)
const getPoints = points => <Text style={[styles.statText, styles.bold]}>{points}</Text>
const imageCell = (crest, name) => (
  <View style={{ alignItems: 'center', flex: 1, flexDirection: 'row', height: 30, justifyContent: 'flex-start' }}>
    <Image style={styles.crest} source={crest} />
    <Text style={styles.statText}>{name}</Text>
  </View>
)

const styles = StyleSheet.create({
  crest: {
    height: 20,
    marginRight: 8,
    width: 20,
  },
  row: {
    alignItems: 'center',
    borderWidth: 0,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
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
  },
  statText: {
    color: '#28323F',
    fontFamily: 'poppins-regular',
    fontSize: 13,
    textAlign: 'center',
  },
  bold: {
    fontFamily: 'poppins-semi-bold',
  },
})
