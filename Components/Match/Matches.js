import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, NetInfo } from 'react-native';

import Match from './Match';
import Link from '../Link/Link';
import mustReadIcon from '../Link/images/mustread.png'
import mustWatchIcon from '../Link/images/mustwatch.png'

export default class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
      dataSource: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );

    this.tick();
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

tick() {
   var _this = this;
   var matchesUrl = 'https://www.tapinguide.com/api/activematches?format=json';
    return fetch(matchesUrl)
      .then((response) => response.json())
      .then((results) => {
          var notCompleted = [];
          var completed = [];
          for(var i = 0, numResults = results.length; i < numResults; i++){
              if(results[i].status.description.toLowerCase() === "ft" || results[i].status.description.toLowerCase() === "aet"){
                completed.push(results[i]);
              }
              else{
                notCompleted.push(results[i]);
              }
          }

          completed.sort(function(a,b){
            return new Date(b.matchTime) - new Date(a.matchTime);
          });

        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          dataSource: ds.cloneWithRows(notCompleted.concat(completed)),
        }, function() {
          // do something with new state
        });
      })
      .then(()=>{
        fetch('https://www.tapinguide.com/api/links/?format=json')
        .then((response) => response.json())
        .then((responseData) => {
         this.setState({
            links: responseData,
            isLoading: false,
         });
     })
    .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        // ADD THIS THROW error
          throw error;
        });
  })
}

  _renderRow(rowData){
    return <Match match={rowData} key={rowData.id} matchIndex='1' />;
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
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter.bind(this)}
        />
      </View>
    );
  }
}