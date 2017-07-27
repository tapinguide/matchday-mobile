import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, NetInfo } from 'react-native';

import Match from './Match';
import Link from '../Link/Link';
import Loading from '../Loading/Loading';
import Footer from '../Footer/Footer';

import mustReadIcon from '../Link/images/mustread.png';
import mustWatchIcon from '../Link/images/mustwatch.png';
import MatchService from '../lib/matchservice';

export default class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          }),
      matches: [],
      matchIndex: 0,
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

updateListView() {
  var _this = this;
  MatchService.getMatches().then(function(matches){
    var ds = _this.state.dataSource.cloneWithRows(matches);
      _this.setState({
        matches: ds
      });
    }).then(()=>{
        MatchService.getLinks().then(function(links){
          _this.setState({
            links: links,
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
    return <Match match={rowData} key={rowData.id} matchIndex={index} />;
  }

  _renderFooter(){
    var links = this.state.links;

    var mustRead;
    var mustWatch;
    for(var i = 0, numResults = links.length; i < numResults; i++){
        if(links[i].shortCode === 'READ'){
          mustRead = links[i];
        }
        else if(links[i].shortCode === 'WATCH')
        {
          mustWatch = links[i];
        }
    }

    return (
          <View>
            <Link link={mustRead} header="MUST READ" icon={mustReadIcon} />
            <Link link={mustWatch} header="MUST WATCH" icon={mustWatchIcon} />
          </View>
    );
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <Loading />
        </View>
      );
    }

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ListView
          initialListSize={10}
          dataSource={this.state.matches}
          renderRow={(rowData, sectionID, rowID) => this._renderRow(rowData, sectionID, rowID)}
          renderFooter={this._renderFooter.bind(this)}
        />
        <Footer />
      </View>
    );
  }
}