import { Analytics as GA, Event, PageHit } from 'expo-analytics'

export default class Analytics {
  static service = new GA('UA-116049426-1')

  static async trackPage(page) {
    try {
      await this.service.hit(new PageHit(page))
    } catch (err) {
      console.log('failed to track', page, err)
    }
  }
  static async trackMatchExpand(match) {
    const matchName = `${match.homeClub.name}vs${match.visitorClub.name}`
    try {
      await this.service.event(new Event('Match', 'Expand', matchName, match.id))
    } catch (err) {
      console.log('failed to track expand', matchName, err)
    }
  }
  static async trackMatchCollapse(match) {
    const matchName = `${match.homeClub.name} vs ${match.visitorClub.name}`
    try {
      await this.service.event(new Event('Match', 'Collapse', matchName, match.id))
    } catch (err) {
      console.log('failed to track collapse', matchName, err)
    }
  }
  static async trackHighlights(match, highlightsUrl) {
    const matchName = `${match.homeClub.name} vs ${match.visitorClub.name}`
    try {
      await this.service.event(new Event('Match', 'Highlights', matchName, match.id))
    } catch (err) {
      console.log('failed to track highlights', matchName, err)
    }
  }
  static async trackMustClick(item) {
    try {
      await this.service.event(new Event('Click', item.header, item.url, item.id))
    } catch (err) {
      console.log('failed to track must click', item.url, err)
    }
  }
}
