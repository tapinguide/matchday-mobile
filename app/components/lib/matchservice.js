const matchIsComplete = status => status === 'ft' || status === 'aet' || status === 'pen.' || status === 'cancl.'
const domain = `https://api.tapinguide.com`
export default class MatchService {
  static crest = null
  static matches = []
  static readWatch = []
  static tables = []

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

    this.matches = orderedMatches
    return orderedMatches
  }

  static async getReadWatch() {
    const url = `${domain}/mustreadwatch/`

    const response = await fetch(url)
    const readWatch = response.json()

    this.readWatch = readWatch
    return readWatch
  }

  static async getCrest() {
    const url = `${domain}/crest/`

    const response = await fetch(url)
    const crest = await response.json()

    this.crest = crest
    return crest
  }

  static async getTables() {
    const url = `${domain}/tables/`

    const response = await fetch(url)
    const tables = await response.json()

    this.tables = tables
    return tables
  }
}
