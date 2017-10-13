import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  NetInfo,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';

import Match from './Match';
import MustReadWatch from '../MustReadWatch/MustReadWatch';
import Loading from '../Loading/Loading';
import HeaderBar from '../HeaderBar/HeaderBar';
import MatchesHeader from '../MatchesHeader/MatchesHeader';
import Footer from '../Footer/Footer';
import FadeInView from 'react-native-fade-in-view';

import MatchService from '../lib/matchservice';

export default class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readWatch: [],
      dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
      matches: [],
      matchIndex: 1,
      isLoading: true
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateListView(),
      5000
    );

    this.updateListView();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleScroll = (event) => {
   // console.log(event.nativeEvent.contentOffset.y);
  }


  setMatchDateRange = () => {
    var matches = JSON.parse(JSON.stringify(this.state.matches));
    var sortedMatches = matches._dataBlob.s1;

    sortedMatches.sort(function(a,b){
      return new Date(a.matchTime) - new Date(b.matchTime);
    });

    var matchDateRange = ''
    var firstMatchDate = moment.utc(sortedMatches[0].matchTime).local();
    var lastMatchDate = moment.utc(sortedMatches[sortedMatches.length - 1].matchTime).local();

    //check if the matches are in the same month; else display different months
    if(firstMatchDate.month === lastMatchDate.month){
      matchDateRange = firstMatchDate.format('MMMM D').toUpperCase() + '-' + lastMatchDate.local().format('D, YYYY').toUpperCase();
    }
    else{
      matchDateRange = firstMatchDate.format('MMMM D').toUpperCase() + '-' + lastMatchDate.local().format('MMMM D, YYYY').toUpperCase();
    }

    this.setState({
      matchDateRange: matchDateRange
    });
  }

updateListView() {
  var _this = this;
  MatchService.getMatches().then(function(matches){
    var ds = _this.state.dataSource.cloneWithRows(matches);
      _this.setState({
        matches: ds
      });
      _this.setMatchDateRange();
    }).then(()=>{
        MatchService.getReadWatch().then(function(readWatch){
          _this.setState({
            readWatch: readWatch,
            isLoading: false
          });
        })
     })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
          throw error;
        }).done();
  }

  getMatchIndex() {
    return this.state.matchIndex;
  }

  _renderRow(rowData, sectionID, rowID){

    let index = parseInt(rowID) + 1;
    return <Match match={rowData} key={rowData.id} matchIndex={index} handleMatchPress={() => this.handleMatchPress()}/>;
  }

  _renderFooter(){
    var readWatch = this.state.readWatch;
    return (
          <View>
            <MustReadWatch link={readWatch[0]} />
            <MustReadWatch link={readWatch[1]} />
          </View>
    );
  }

  handleMatchPress = () => {
    console.log('match pressed');
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <StatusBar hidden={true} />
          <Loading />
        </View>
      );
    }

    return (
      <FadeInView
        duration={900}
        style={{flex: 1, flexDirection: 'column'}}
      >
        <HeaderBar />
        <ScrollView
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          style={{flex: 1, flexDirection: 'column'}}
        >
          <MatchesHeader dateRange={this.state.matchDateRange}/>
          <ListView
            initialListSize={10}
            dataSource={this.state.matches}
            renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
            renderFooter={this._renderFooter.bind(this)}
          />
          <Footer navigation={this.props.navigation}/>
        </ScrollView>
      </FadeInView>
    );
  }
}

const styles = StyleSheet.create({
    statusBarContainer: {
      height:20,
      backgroundColor: '#1B1E2C'
    }
});