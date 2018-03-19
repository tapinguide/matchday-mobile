import React from 'react'
import {
  Button,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { Asset } from 'expo'

import { width, height, totalSize } from 'react-native-dimension'

import Analytics from '../../components/lib/analytics'

const tapinLogo = require('./images/logo_full.png')
const clint = require('./images/clint.jpg')
const curt = require('./images/curt.jpg')
const mike = require('./images/mike.jpg')
const twitterBtn = require('./images/twitter_button.png')

export default class About extends React.Component {
  async componentWillMount() {
    await Asset.loadAsync([tapinLogo, clint, curt, mike, twitterBtn])
  }
  componentDidMount() {
    Analytics.trackPage('About')
  }

  handleLinkPress = url => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err))
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.heading}>About</Text>
            <Text style={styles.intro}>
              There's more coverage of the beautiful game than ever, but even as football fanatics, we found ourselves
              having trouble keeping up. So, we created the latest version of Tap In. It’s a soccer calendar with
              context that helps fans follow global soccer’s top matches. Quick previews to get you prepped for the
              weekend, live match data, and match recaps with highlights.
            </Text>
            <Text style={styles.paragraph}>
              We’d love to hear what you think and what would make Tap In better. Drop us a line:
              <Text style={styles.hyperlink} onPress={() => this.handleLinkPress('mailto:curt@tapinguide.com')}>
                {' '}
                curt@tapinguide.com
              </Text>
            </Text>

            <View style={styles.hr} />
            <Image source={tapinLogo} style={{ width: 154, height: 49, marginBottom: 20 }} />
            <Text style={[styles.paragraph, { marginBottom: 34 }]}>
              Tap In Design is a digital product studio. We created the original Tap In Guide to help new soccer fans
              follow the 2014 World Cup. We’ve gone on to continue to evolve the Tap In product, as well as collaborate
              with some of our favorite soccer media brands, including KICK and Howler Magazine. We’re always on the
              lookout for the next collaboration or project, get in touch:
              <Text style={styles.hyperlink} onPress={() => this.handleLinkPress('mailto:curt@tapinguide.com')}>
                {' '}
                curt@tapinguide.com
              </Text>.
            </Text>
            <View style={styles.teamMemberContainer}>
              <Image source={curt} style={styles.teamPhoto} />
              <View style={styles.teamMemberBio}>
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor={'#FFFFFF'}
                  onPress={() => this.handleLinkPress('https://twitter.com/curtyb')}
                >
                  <Image source={twitterBtn} style={styles.twitterBtn} />
                </TouchableHighlight>
                <Text style={[styles.paragraph, styles.teamMemberBioText]}>
                  <Text style={styles.strong}>Curt Baker</Text> Defensive Midfielder. Strategist. Hoping for another
                  Friendly Fires album.
                </Text>
              </View>
            </View>
            <View style={styles.teamMemberContainer}>
              <Image source={mike} style={styles.teamPhoto} />
              <View style={styles.teamMemberBio}>
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor={'#FFFFFF'}
                  onPress={() => this.handleLinkPress('https://twitter.com/mike_arney')}
                >
                  <Image source={twitterBtn} style={styles.twitterBtn} />
                </TouchableHighlight>
                <Text style={[styles.paragraph, styles.teamMemberBioText]}>
                  <Text style={styles.strong}>Mike Arney</Text> Design, UX and a bit of Front-end development. Nerd..
                  which is fine. Dad of Jámes.
                </Text>
              </View>
            </View>
            <View style={styles.teamMemberContainer}>
              <Image source={clint} style={styles.teamPhoto} />
              <View style={styles.teamMemberBio}>
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor={'#FFFFFF'}
                  onPress={() => this.handleLinkPress('https://twitter.com/minnepixel')}
                >
                  <Image source={twitterBtn} style={styles.twitterBtn} />
                </TouchableHighlight>
                <Text style={[styles.paragraph, styles.teamMemberBioText]}>
                  <Text style={styles.strong}>Clint McMahon</Text> Code, soccer, Seinfeld quotes, yadda yadda yadda.
                </Text>
              </View>
            </View>
            <Text style={styles.paragraph}>
              <Text
                style={[styles.hyperlink, styles.strong]}
                onPress={() => this.handleLinkPress('https://twitter.com/alx_mrtnz')}
              >
                Alex Martinez{' '}
              </Text>
              and
              <Text
                style={[styles.hyperlink, styles.strong]}
                onPress={() => this.handleLinkPress('https://twitter.com/handrajs')}
              >
                {' '}
                Jared Handra{' '}
              </Text>
              are the newest members of the Tap In squad, both taking on front end development and design duties.
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 32,
    paddingBottom: 56,
  },
  heading: {
    fontFamily: 'poppins-semi-bold',
    fontSize: 32,
  },
  intro: {
    fontFamily: 'poppins-regular',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 25,
    marginBottom: 20,
  },
  paragraph: {
    fontFamily: 'poppins-regular',
    fontSize: 13,
    lineHeight: 19,
  },
  hr: {
    borderBottomColor: '#CFCCCC',
    borderBottomWidth: 1,
    marginBottom: 35,
    marginTop: 35,
  },
  hyperlink: {
    color: '#00c6e7',
  },
  teamPhoto: {
    height: 310,
    width: 310,
    marginBottom: 10,
  },
  strong: {
    fontFamily: 'poppins-bold',
  },
  teamMemberContainer: {
    marginBottom: 30,
  },
  teamMemberBio: {
    flex: 1,
    flexDirection: 'row',
    width: width(100),
  },
  teamMemberBioText: {
    width: 265,
  },
  twitterBtn: {
    height: 30,
    width: 30,
    marginRight: 15,
    marginTop: 3,
  },
})
