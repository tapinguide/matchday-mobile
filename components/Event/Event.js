import React, { Component } from 'react';
import {Text, View, StyleSheet, Image } from 'react-native';
 
import YellowCard from './YellowCard';
import RedCard from './RedCard';
import Substitute from './Substitute';
import Goal from './Goal';

export default class Event extends Component {
  
  getEventType(event, index){

        if(event.eventType === "yellowcard"){
            return <YellowCard event={event} />;
        }
        else if(event.eventType === "redcard"){
             return <RedCard event={event} />;
        }
        else if(event.eventType === "goal"){
             return <Goal event={event} />;
        }
        else if(event.eventType === "subst"){
             return <Substitute event={event} />;
        }
    }

  render() {
    var eventType = this.getEventType(this.props.event, this.props.index);
        return (
            <View>
                {eventType}
            </View>
        );
  }
}