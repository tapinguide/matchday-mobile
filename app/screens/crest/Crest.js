import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Asset } from 'expo'
import HTMLView from 'react-native-htmlview'

import Analytics from '../../components/lib/analytics'
import MatchService from '../../components/lib/matchservice'

const current = require('./images/dul.png')
const revised = require('./images/dul-new.png')
const teamName = 'Dulwich Hamlet'
const article = `<p>What does a mayor, a Champions League winner, and a New York City Development Firm all have in common? London football team Dulwich Hamlet.</p><p>Dulwich Hamlet, a 125-year-old soccer team, has made its rounds on social media as of late due to its recent ongoing eviction battle from Champion Hill, a place the London team called home since 1912.</p><p>New York Development Firm <em>Meadow Residential</em>, the owners of the stadium’s land, kicked off the rife between supporters and council at the start of March 2018. Meadow submitted a proposal to the Southwark Council stating that they planned to develop a $112 million-plus apartment complex on the site.</p><p>Luckily enough for Dulwich, the initial plan was scrapped due to Meadow’s inability to provide a certain amount of affordable housing within the complex. However, the result of the New York company’s proposal still led to the eviction of Dulwich Hamlet from Champion Hill.</p><p>Now, the firm plans to demolish the stadium and build on top of the land, but the emotion and backing of supporters have made this difficult for Meadow.</p><p>On record, former Manchester United defender Rio Ferdinand and current London mayor Sadiq Khan, along with many other supporters’ groups across the world, have offered unwavering loyalty to the evicted soccer team.</p><p>This comes as no shock as “<a href="https://www.theguardian.com/global/2015/aug/23/dulwich-hamlet-londons-most-hipster-football-club">London’s most hipster football club</a>” has earned plaudits over the years for its family-friendly environment that has actively stood against racism and homophobia. One of the team’s greatest moments came in 1911 when the team fielded Hussein Hegazi, the first ever African player in English soccer.</p><p>According to <a href="https://www.theguardian.com/commentisfree/2018/mar/16/dulwich-hamlet-rio-ferdinand-sadiq-khan-community-football-property-developers">Guardian</a> contributor and five-year-fan Hugo Greenhalgh, the global support has been uplifting. He said, “It’s been so touching seeing people from all around the world get behind our cause! Our sister club in Hamburg are called Altona 93 and they’ve done a number of banner displays for us. When I was living in New York, I also fostered a friendship with the New York Cosmos. They have some of the best fans in the US…we’ve been sharing the love across stickers and social media.”</p><p>However, the love and support of fans across the world may not be enough to keep Dulwich at Champion Hill.</p><p>“We’ve had some support from a lot of high profile politicians, including the Mayor of London Sadiq Khan. They’re talking about new legislation that would really help our cause, but the fight is far from over,” Greenhalgh said. “Our local council have tabled an offer to Meadow to buy the ground off them, so we can move home but they’re being evasive. We need to keep ramping up the pressure on them and make sure they know they’re not welcome anymore.”</p><p>For now, Dulwich Hamlet’s fight against Meadow’s proposal lingers on. Dulwich currently plays its home games down the road at their rivals Tooting and Mitcham FC’s ground and will be there for the foreseeable future.</p><p>To help out the club, donate to The 12th Man (via <a href="https://www.paypal.me/dhfc12">PayPal</a>) or <a href="https://www.justgiving.com/crowdfunding/savedulwichhamlet">JustGiving</a> pages. A fan group called <a href="https://savedulwichhamlet.org.uk/">Save Dulwich Hamlet</a> has also been established to organize fan action and put pressure on Meadow to relinquish the ground. Keep up to date with the latest plans on <a href="https://www.facebook.com/SaveDHFC/">Facebook</a> or <a href="https://twitter.com/saveDHFC">Twitter</a>.</p>
<h4>The Badge:</h4>
<p>Now that you know about Dulwich’s story, here a thing or two about their crest. This information comes from Guardian contributor Hugo Greenhalgh himself.</p><p>Greenhalgh said, “There’s a lot going on there! It’s one of those badges where you’ll see something new every time you look at it. Each segment of the crest relates to a different part of South London, all of which hold significance to the origins of the club. The main thing is that it highlights our distinct pink and blue colors and has the year we founded - 1893.”</p><p>As for what each individual symbol means on the crest, Greenhalgh offered context.</p><p><strong>Top Left:</strong> The Country of Surrey, of which Dulwich was once part.</p><p><strong>Top Right:</strong> The badge of Dulwich. Associated with Dulwich College school, where some of the founder members attended.</p><p><strong>Bottom Left:</strong> The old crest of the Borough of Camberwell, within whose boundaries the club played until it was swallowed up by the London Borough of Southwark.</p><p><strong>Bottom Right:</strong> From the emblem of Westminster Some of the founding members went to Dulwich College and Westminster schools. Hence the club colors are the pink of Westminster and the Blue of Dulwich.</p>`

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
