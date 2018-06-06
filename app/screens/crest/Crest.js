import { Asset } from 'expo'
import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import HTMLView from 'react-native-htmlview'
import Analytics from '../../components/lib/analytics'

const current = require('./images/tj.png')
const revised = require('./images/tj-new.png')
const teamName = 'Club Tijuana'
const article = `<p>For most North Americans, their soccer allegiance is pledged to domestic clubs and European juggernauts, but what about their neighbors south of the border? Why is no one rooting for them?</p><p>Some would say the lack of Liga MX fandom is due to the United States’ ongoing political turmoil with Mexico while others would say it is due to the language barrier. However, both of those reasons are not good enough excuses to avoid watching Liga MX soccer.</p><p>Liga MX is a league full of excitement, fandom, and skill. Each game has a flurry of crushing tackles, slick rabonas, and cheeky backheels. In some ways, Liga MX is a complete contrast to Major League Soccer’s brutish style.</p><p>If you have not done so already, pick a Liga MX team to follow next season. The 2017/18 campaign has just ended so it gives you time to look around and find that caters your style.</p><p>To offer a bit of assistance in finding a team, look no further than Club Tijuana.</p><p>This may offend some fans, but Club Tijuana is the closest thing to a United States team in Mexico.</p><p>The team is only a few short miles south of the California border and always possess a roster with a few United States players. Currently, the team has United States Men’s International team members Michael Orozco and Rubio Rubin. In addition, they have a few young prodigies such as Alejandro Guido, Fernando Arce Jr., and Carlos Lopez.</p><p>Furthermore, Tijuana, who is nicknamed Xolos, developed recent United States international and current D.C. United midfielder Paul Arriola.</p><p>To further help you with picking Tijuana as your Liga MX team next season, check out the recent breaking news announcing that Fox Sports has acquired the rights to broadcast Tijuana’s games next season in English and Spanish.</p><p>This deal is fantastic news for those U.S. fans who want to check out the league in their own language.</p><p>As for Tijuana’s crest, it stands out. Personally, I think any bright colored paired with black is a strong statement. However, the best part of the badge is the hairless dog, which is referenced in the text right below, “Xoloitzcuintles.”</p><p>Rob Nicoletti of <a href="https://the18.com/news/sacred-dogs-accused-murderers-club-tijuana-weirdest-team-mexico">The 18</a> gave a perfect description as to why the dog is used. He said, “Legend has it that these dogs were considered sacred by the ancient Aztecs and, thus, Club Tijuana wanted to pay homage to man’s best friend.”</p><p>All in all, this crest is unique and awesome. I hope to see a few Americans wearing it with pride in the next coming years.</p>`

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
