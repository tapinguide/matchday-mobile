import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Asset } from 'expo'
import HTMLView from 'react-native-htmlview'

import Analytics from '../../components/lib/analytics'
import MatchService from '../../components/lib/matchservice'

const current = require('./images/image1.png')
const revised = require('./images/image2.png')
const article = `<p><em>Editor's Note: Pertaining to this series, we at Tap In Guide wanted to find a way to give reverence to some of the world’s greatest soccer badges. The series will show the club’s badge, our very own original twist of the original design, and a brief explanation of the badge/club.</em></p><p>Kicking off Tap In Guide’s newest series “Crisp Crests” is none other than German third division side FC Carl Zeiss Jena. The Jena, Thuringia club’s sleek and minimalistic badge shines when compared to other teams due its bright blue, yellow, and white colors that are engulfed among bold black outlines. The badge does not contain any special design but the beauty of it lies within its simplicity. The team’s name is clearly the centerpiece at the top while the “FC” portion is given equal size to the badge’s tri-color stripe on the lower left.</p><p>Much like many other lower league tier teams in Northern Europe, FC Carl Zeiss Jena was created by a group of factory workers. Founded in May 1903, employees at the Carl Zeiss AG optics factory came together and created the then-called Fussball-Club der Firm Carl Zeiss. After finding much success in Northern Germany’s top division, the club came under extreme stress due to the Germany’s participation in two World Wars while also dealing with the separation and reunification of the country.</p><p>Following Germany’s reunification in 1990, Jena was thrown into the 2. Bundesliga. Since then, the club has jumped up and down from 3. Liga to the Regionalliga Nordost without ever gracing Germany’s top flight. Now, FC Carl Zeiss Jena is playing soccer in 3. Liga, where they sit comfortably at midtable.<p>A former notable Carl Zeiss player is American defender Brian Bliss, who spent time with the club from 1992-1996 before returning back to the United States to play for the Columbus Crew, MetroStars, and the Kansas City Wizards.</p>`

export default class Crest extends Component {
  state = {
    crest: null,
  }

  async componentWillMount() {
    await Asset.loadAsync([current, revised])
  }

  componentDidMount() {
    Analytics.trackPage('Crest of the Week')
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
        <Text style={styles.intro}>FC Carl Zeiss Jena</Text>
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
