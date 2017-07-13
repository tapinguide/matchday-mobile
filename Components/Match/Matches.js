import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, NetInfo } from 'react-native';

import Match from './Match';

export default class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
   var matchesUrl = 'https://www.tapinguide.com/api/activematches';
    return fetch(matchesUrl)
      .then((response) => response.json())
      .then((responseJson) => {
          var results = responseJson;
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
          isLoading: false,
          dataSource: ds.cloneWithRows(notCompleted.concat(completed)),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
          renderRow={(rowData) => <Match match={rowData} key={rowData.id} matchIndex='1' />}
        />
      </View>
    );
  }
}