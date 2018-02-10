const matchIsComplete = status => status === 'ft' || status === 'aet' || status === 'pen.' || status === 'cancl.'
const domain = `https://api.tapinguide.com`
export default class MatchService {
  static matches = []
  static readWatch = []

  static async getMatches() {
    const matchesUrl = `${domain}/activematches/`

    const response = await fetch(matchesUrl)
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
    const linksUrl = `${domain}/mustreadwatch/`

    const response = await fetch(linksUrl)
    const readWatch = response.json()

    this.readWatch = readWatch
    return readWatch
  }
}
