import React from 'react';
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
  View
} from 'react-native';

import { width, height, totalSize } from 'react-native-dimension';

import Header from '../../components/Header/Header';

import tapinLogo from './images/logo_full.png';
import clint from './images/clint.jpg';
import curt from './images/curt.jpg';
import mike from './images/mike.jpg';
import exit from './images/exit.png';
import twitterBtn from './images/twitter_button.png';


export default class About extends React.Component {
  constructor(props) {
    super(props);

  }
  async componentDidMount() {

  }

  handleLinkPress(url){
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  handleHomePress = () => {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.aboutContainer}>
        <Header />
        <ScrollView>
          <View style={styles.content}>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={'#F0F0F0'}
              style={styles.exit}
              onPress={() => this.handleHomePress()}>
              <Image
                source={exit}
                style={styles.exitImage}
              />
            </TouchableHighlight>
            <Text style={styles.heading}>
              About
            </Text>
            <Text style={styles.intro}>
              As football fanatics, we felt overwhelmed trying to keep up with the beautiful game. So, we created the latest version of Tap In, a soccer calendar with context to help fans easily get the scoop on what happened in the world’s biggest matches, what’s coming up, and why it all matters.
            </Text>
            <Text style={styles.paragraph}>
              We’d love to hear what you think and what would make Tap In better. Drop us a line:
              <Text
                style={styles.hyperlink}
                onPress={() => this.handleLinkPress('mailto:curt@tapinguide.com')}
              > curt@tapinguide.com</Text>
            </Text>

            <View style={styles.hr} />
            <Image source={tapinLogo} style={{width:154, height: 49, marginBottom: 20}} />
            <Text style={[styles.paragraph, {marginBottom: 34}]}>
              Tap In Design is a digital product studio. We created the original Tap In Guide for the 2014 World Cup, receiving over 350,000 page views in one month. We’ve gone on to continue to evolve the Tap In product as well as collaborate with some of our favorite soccer media brands, including KICK and Howler Magazine. We’re always on the lookout for the next collaboration or project, get in touch:
                <Text
                  style={styles.hyperlink}
                  onPress={() => this.handleLinkPress('mailto:curt@tapinguide.com')}
                > curt@tapinguide.com</Text>.
            </Text>
            <View style={styles.teamMemberContainer}>
              <Image
                source={curt}
                style={styles.teamPhoto}
              />
              <View style={styles.teamMemberBio}>
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor={'#FFFFFF'}
                  onPress={() => this.handleLinkPress('https://twitter.com/curtyb')}
                >
                  <Image
                    source={twitterBtn}
                    style={styles.twitterBtn}
                  />
                </TouchableHighlight>
                <Text style={styles.paragraph, styles.teamMemberBioText}>
                  <Text style={styles.strong}>Curt Baker</Text> Defensive Midfielder. Strategist. Hoping for another Friendly Fires album.
                </Text>
              </View>
            </View>
            <View style={styles.teamMemberContainer}>
              <Image
                source={mike}
                style={styles.teamPhoto}
              />
              <View style={styles.teamMemberBio}>
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor={'#FFFFFF'}
                  onPress={() => this.handleLinkPress('https://twitter.com/mike_arney')}
                >
                  <Image
                    source={twitterBtn}
                    style={styles.twitterBtn}
                  />
                </TouchableHighlight>
                <Text style={styles.paragraph, styles.teamMemberBioText}>
                  <Text style={styles.strong}>Mike Arney</Text> Design, UX and a bit of Front-end development. Nerd.. which is fine. Dad of Jámes.
                </Text>
              </View>
            </View>
            <View style={styles.teamMemberContainer}>
              <Image
                source={clint}
                style={styles.teamPhoto}
              />
              <View style={styles.teamMemberBio}>
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor={'#FFFFFF'}
                  onPress={() => this.handleLinkPress('https://twitter.com/minnepixel')}
                >
                  <Image
                    source={twitterBtn}
                    style={styles.twitterBtn}
                  />
                </TouchableHighlight>
                <Text style={styles.paragraph, styles.teamMemberBioText}>
                  <Text style={styles.strong}>Clint McMahon</Text>  Code, soccer, Seinfeld quotes, yadda yadda yadda.
                </Text>
              </View>
            </View>
            <Text style={styles.paragraph}>
              <Text
              style={[styles.hyperlink, styles.strong]}
              onPress={() => this.handleLinkPress('https://twitter.com/alx_mrtnz')}
              >Alex Martinez </Text>
               and
              <Text
              style={[styles.hyperlink, styles.strong]}
              onPress={() => this.handleLinkPress('https://twitter.com/handrajs')}
              > Jared Handra </Text>
               are the newest members of the Tap In squad, both taking on front end development and design duties.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aboutContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1
  },
  content: {
    flex: 1,
    paddingTop: 56,
    paddingLeft: 28,
    paddingRight: 28,
    paddingBottom: 56,
  },
  exit: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    width: 40,
    height: 40,
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 5
  },
  exitImage: {
    height: 22,
    width: 22,
    position: 'absolute',
    top: 8.9,
    left: 8.9
  },
  statusBarBackground: {
    height: 20,
    backgroundColor: "#f0f0f0",
  },
  heading: {
    fontFamily: 'poppins-bold',
    fontSize: 40,
    fontWeight: '600'
  },
  intro: {
    fontFamily: 'poppins-bold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 25,
    marginBottom: 20
  },
  paragraph: {
    fontFamily: 'poppins-regular',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19
  },
  hr: {
    borderBottomColor: '#CFCCCC',
    borderBottomWidth: 1,
    marginBottom: 35,
    marginTop: 35
  },
  hyperlink: {
    color: '#18EFC6'
  },
  teamPhoto: {
    height: 310,
    width: 310,
    marginBottom: 10
  },
  strong: {
    fontFamily: 'poppins-bold'
  },
  teamMemberContainer: {
    marginBottom: 30
  },
  teamMemberBio: {
    flex: 1,
    flexDirection: 'row',
    width: width(100)
  },
  teamMemberBioText: {
    width: 265
  },
  twitterBtn: {
    height: 30,
    width: 30,
    marginRight: 15,
    marginTop: 3
  }
})