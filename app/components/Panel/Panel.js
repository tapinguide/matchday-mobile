import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { Asset } from 'expo'
import Expand from 'react-native-simple-expand'

const upIcon = require('./images/shapegreenup.png')
const downIcon = require('./images/shapegreendown.png')

export default class Panel extends Component {
  constructor(props) {
    super(props)

    this.icons = {
      up: upIcon,
      down: downIcon,
    }

    this.state = {
      expanded: this.props.panelExpanded,
    }

    this.underlayColor = this.props.underlayColor
  }

  async componentWillMount() {
    await Asset.loadAsync([upIcon, downIcon])
  }

  componentWillReceiveProps(nextProps) {
    let currentExpandedState = this.getExpandedState()

    if (nextProps.panelExpanded != currentExpandedState) {
      this.toggle()
    }
  }

  getExpandedState() {
    return this.state.expanded
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  render() {
    let icon = this.icons['down']
    let underlayColor = this.underlayColor

    if (this.state.expanded) {
      icon = this.icons['up']
    }

    return (
      <View>
        <View style={styles.toggleIcon} underlayColor={underlayColor}>
          <Image source={icon} />
        </View>
        <Expand value={this.state.expanded}>
          <View style={styles.body}>{this.props.children}</View>
        </Expand>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  toggleIcon: {
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingTop: 0,
    paddingBottom: 0,
  },
})
