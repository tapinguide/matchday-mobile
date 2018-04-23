import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Asset } from 'expo'
import HTMLView from 'react-native-htmlview'

import Analytics from '../../components/lib/analytics'
import MatchService from '../../components/lib/matchservice'

const current = require('./images/nycc.png')
const revised = require('./images/nycc-new.png')
const teamName = 'New York Cosmos'
const article = `<p>Since their inaugural season in 1970, life as a soccer franchise in the United States has not been easy for the New York Cosmos. The world renown team has endured club and league dissolvement twice since their birth and continue to fight through unfavorable conditions.</p><p>Most recent, the Cosmos dealt with the second collapse of the North American Soccer League (NASL). This turmoil resulted in New York losing its head coach Giovanni Savarese as well as its entire first team, which now leaves the organization without an active team in the country’s top two divisions.</p><p>For now, the team operates as New York Cosmos B. While the NASL works out its kinks in court, the Cosmos, for the time being, will live out its days as a reserve team playing in the National Premier Soccer League (NPSL).</p><p>While its future remains up in the air, New York has a few things going for itself. Firstly, the team will feature in this year’s U.S. Open Cup. Secondly, its fan base continues to support its team even with its lower division status. Lastly, the team’s age-old never-changing badge still stands as a historical reminder of the United State’s soccer past.</p><p>The iconic crest is simple in design with a total of five colors. The crest is a perfect circle with a soccer ball placed directly in the middle. Surrounding the ball is three stripes (yellow, blue, and green) used to create “movement from the soccer ball,” stated the creator Wayland Moore in an <a href="http://bleacherreport.com/articles/610739-new-york-cosmos-a-conversation-with-the-artist-behind-the-logo">interview with Bleacher Report</a>. The distinct colors were used “to include nationalities” as well as to help “cross boundaries…the font was simple and easy to read on a uniform.”</p><p>Since Moore’s initial creation, New York’s crest has undergone slight renditions. Notable changes include the addition of “New York” to the badge name and the simplification of the soccer ball.</p>`

export default class Crest extends Component {
  state = {
    crest: null,
  }

  async componentWillMount() {
    await Asset.loadAsync([current, revised])
  }

  componentDidMount() {
    Analytics.trackScreen('Crest of the Week')
  }

  // componentDidMount() {
  //   this.setState({ crest: MatchService.crest }, () => {
  //     this.updateContent()
  //   })
  // }

  // updateContent = () => {
  //   MatchService.getCrest()
  //     .then(crest => this.setState({ crest }))
  //     .catch(error => {
  //       console.log('There has been a problem with your fetch operation: ' + error.message)
  //       throw error
  //     })
  // }

  render() {
    const { crest } = this.state
    const htmlContent = `<htmlcontent>${article}</htmlcontent>`

    return (
      <ScrollView style={styles.content}>
        <Text style={styles.heading}>Crest of the Week</Text>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingVertical: 20 }}>
          <Image style={{ marginHorizontal: 20 }} source={current} />
          <Image style={{ marginHorizontal: 20 }} source={revised} />
        </View>
        <Text style={styles.intro}>{teamName}</Text>
        <HTMLView value={htmlContent} stylesheet={styles} />
      </ScrollView>
    )
  }
}

class CrestImage extends Component {
  state = {
    height: 0,
    width: 0,
  }
  componentWillMount() {
    Image.getSize(this.props.source, (w, h) => {
      const aspectRatio = w / h
      console.log(w, h)
      this.setState({ height: 80, width: 80 })
    })
  }

  render() {
    const { source } = this.props
    const { height, width } = this.state

    return <Image source={source} style={{ height, width }} />
  }
}

const styles = StyleSheet.create({
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 7,
    fontSize: 14,
    lineHeight: 18,
    paddingBottom: 80,
  },
  a: {
    textDecorationColor: '#08E5E3',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  i: {
    fontFamily: 'poppins-light',
  },
  em: {
    fontFamily: 'poppins-light',
  },
  b: {
    fontFamily: 'poppins-bold',
  },
  strong: {
    fontFamily: 'poppins-bold',
  },
  content: {
    backgroundColor: '#f0f0f0',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    paddingBottom: 80,
  },
  heading: {
    fontFamily: 'poppins-semi-bold',
    fontSize: 32,
  },
  intro: {
    fontFamily: 'poppins-regular',
    fontSize: 20,
    lineHeight: 25,
  },
})
