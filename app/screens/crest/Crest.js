import { Asset } from 'expo'
import { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import HTMLView from 'react-native-htmlview'
import Analytics from '../../components/lib/analytics'

const current = require('./images/fcc.png')
const revised = require('./images/fcc-new.png')
const teamName = 'FC Cincinnati'
const article = `<p>On May 29th at 5:30 p.m. ET, Futbol Club Cincinnati will make (or have already made) a &ldquo;significant announcement&rdquo; about their team’s future.</p><p>What that announcement is may not come as a surprise to those who have been following the team’s recent arduous quest for first division status.</p><p>As reported by <a href="https://www.cincinnati.com/story/sports/soccer/fc-cincinnati/2018/05/24/fc-cincy-host-significant-announcement-rhinegeist/640875002/">Cincinnati.com</a> and <a href="https://www.si.com/soccer/2018/05/24/fc-cincinnati-mls-expansion-berth-announcement-2019-start">Sports Illustrated</a>, Major League Soccer Commissioner Don Garber will be attending the Tuesday event to confirm FC Cincinnati’s admission to MLS for the 2019 season.</p><p>They will be joining the league as its 26th member not too long after the recent announcements of Nashville SC and David Beckham’s Miami club. However, Cincinnati will technically be the 24th team to play in the league as their debut is slated for 2019 while Nashville and Miami’s are set for 2020.</p><p>Cincinnati’s acceptance into the league was inevitable following their terrific three-year stint in the United Soccer League. Although they never won a trophy, the team boasted the league’s highest attendance consistently all while recruiting all-star lower league players.</p><p>As with most North American soccer teams when they jump to Major League Soccer, their crests become slightly altered.</p><p>Before FC Cincinnati has a chance to change their badge or <a href="https://www.cincinnati.com/story/sports/soccer/fc-cincinnati/2018/04/16/fc-cincinnati-fussball-club-greater-cincinnati-redevelopment-authority-meeting-port-authori/520274002/">alter their name</a> before 2019, here is a quick look at the team’s current 2018 crest.</p><p>At it’s core, Cincinnati’s crest is quite simple. The crest only contains three different colors: orange, blue, and white.</p><p>The crest is topped with a crown to revere the city’s heritage as the “Queen City.” The bottom of the crest contains a lion with wings, a sword, and a soccer ball, which gives admiration to the city’s Bavarian heritage.</p><p>Overall, FC Cincinnati has a sleek crest with eye popping colors. For a team that is so young, the crest really speaks modern.
</p>`

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
