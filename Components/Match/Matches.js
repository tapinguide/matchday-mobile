import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View } from 'react-native';

import InProgressMatch from './InProgressMatch';

export default class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://matchday.tapinguide.com/api/activematches/?format=json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
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
      <View style={{flex: 1, paddingTop: 20, flexDirection: 'column'}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <InProgressMatch match={rowData} key={rowData.id} matchIndex='1' />}
        />
      </View>
    );
  }
}