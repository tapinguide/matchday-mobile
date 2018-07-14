import React from 'react'
import { AsyncStorage } from 'react-native'

const matchIsComplete = status => status === 'ft' || status === 'aet' || status === 'pen.' || status === 'cancl.'
// const domain = `https://api.tapinguide.com`
const domain = `https://api.tapinguide.demo.nordicdev.io/api/`
export default class MatchService {
  static async getStoredMatches() {
    const matches = await AsyncStorage.getItem('@TapIn:matches')
    return matches && matches !== '' ? JSON.parse(matches) : []
  }
  static async getStoredReadWatch() {
    const readWatch = await AsyncStorage.getItem('@TapIn:readWatch')
    return readWatch && readWatch !== '' ? JSON.parse(readWatch) : []
  }
  static async getStoredCrest() {
    const crest = await AsyncStorage.getItem('@TapIn:crest')
    return crest && crest !== '' ? JSON.parse(crest) : null
  }
  static async getStoredTables(comp) {
    const tables = await AsyncStorage.getItem(`@TapIn:tables${comp ? `-${comp}` : ''}`)
    return tables && tables !== '' ? JSON.parse(tables) : []
  }

  static async getMatches() {
    const url = `${domain}/activematches/`

    const response = await fetch(url)
    const matches = await response.json()
    const completed = matches
      .filter(match => matchIsComplete(match.status.description.toLowerCase()))
      .sort((a, b) => new Date(b.matchTime) - new Date(a.matchTime) || a.id - b.id)

    const notCompleted = matches
      .filter(match => !matchIsComplete(match.status.description.toLowerCase()))
      .sort((a, b) => new Date(b.matchTime) - new Date(a.matchTime) || a.id - b.id)
      .reverse()

    const orderedMatches = [...notCompleted, ...completed]

    await AsyncStorage.setItem('@TapIn:matches', JSON.stringify(orderedMatches))
    return orderedMatches
  }

  static async getReadWatch() {
    const url = `${domain}/mustreadwatch/`

    const response = await fetch(url)
    const readWatch = response.json()

    await AsyncStorage.setItem('@TapIn:readWatch', JSON.stringify(readWatch))
    return readWatch
  }

  static async getCrest() {
    const url = `${domain}/crest/`

    const response = await fetch(url)
    const crest = await response.json()

    await AsyncStorage.setItem('@TapIn:crest', JSON.stringify(crest))
    return crest
  }

  static async getTables(comp) {
    const url = `${domain}/tables/${comp ? `?competition_id=${comp}` : ''}`

    const response = await fetch(url)
    const table = await response.json()

    const orderedTable = [...table].sort((a, b) => a.position - b.position)
    const [first] = orderedTable

    const competition = {
      competition: first.competition,
      teams: orderedTable,
    }

    await AsyncStorage.setItem(`@TapIn:table${comp ? `-${comp}` : ''}`, JSON.stringify(competition))
    return competition
  }
}
