import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Asset } from 'expo'
import HTMLView from 'react-native-htmlview'

import Analytics from '../../components/lib/analytics'
import MatchService from '../../components/lib/matchservice'

const current = require('./images/crew.png')
const revised = require('./images/crew-new.png')
const teamName = 'Columbus Crew SC'
const article = `<p>The past year has not been too kind for the Columbus Crew, but that has not stopped them from keeping their pride. One of Major League Soccer’s oldest teams, who play in one of the league’s oldest stadiums, is on the brink of being relocated to Austin, Texas by six-year owner Anthony Precourt.</p><p>The decision to move the team South has not been met with resounding applause. Instead, it has led to backlash from both the Columbus community and the global soccer community. Too many times in the past, teams have been moved for unpopular reasons, only to lead to hate for both the new team and its owner.</p><p>Soon after Precourt’s announcement to move the Crew to Austin, the hashtag <a href="https://twitter.com/search?q=%23SaveTheCrew">#SaveTheCrew</a> flourished across social media. Soon, players, personalities, and celebrities flocked to the Crew’s aid. Protests and marches took the street and stadium, pleading for the dismissal of the proposed plan.</p><p>As of now, the future of the team is up in the air, and no one knows how the tides will turn.</p>
<h4>The Badge:</h4>
<p>On October 8, 2014, the Columbus Crew changed their crest to their current version. Before the circle crest, the Crew had a shield with three men wearing hard hats. Covered in black, white, and grey, the men stood side-by-side with stern faces.</p><p>After the change, Columbus sported a circular crest dawning white, yellow, and black. On the outer edge, the name of the team circles the circumference. Within the circle, stands a “96,” which resembles the year they began play.</p><p>The horizontal stripes represent the original ten MLS franchises, something fitting to think about during the current relocation situation.</p><p>Overall, the Columbus Crew has a terrific modern crest with complementary colors that are fitting to the common eye.</p>`

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
