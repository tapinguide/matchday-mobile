import React, { Component } from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight, Linking } from 'react-native';
import HTMLView from 'react-native-htmlview';
import sidearrow from './images/sidearrow.png';
import mustReadIcon from './images/mustread.png'
import mustWatchIcon from './images/mustwatch.png'

export default class MustReadWatch extends Component {

    openWindow(){
        var url = this.props.link.url;
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }
    render(){
        var mustReadLink = this.props.link;
        var header = mustReadLink.header;
        var icon;
        if(mustReadLink.mustType === 'read'){
            icon = mustReadIcon;
        }
        else{
            icon = mustWatchIcon;
        }
        var htmlContent = "<htmlcontent>" + mustReadLink.text + "</htmlcontent>";
        var content = (
            <TouchableHighlight onPress={this.openWindow.bind(this)}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingBottom: 0,
                    borderRightWidth:0,
                    borderRightColor: '#e7e7e7',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e7e7e7',
                    borderLeftWidth: 0,
                    borderLeftColor: '#e7e7e7',
                    paddingTop:18,
                    paddingBottom:18,
                    paddingLeft:30
                }}>
                    <View style={{ //Header container
                        paddingBottom:11
                    }}>
                        <Text style={{
                            color: '#18EFC6',	
                            fontFamily: 'poppins-semi-bold',
                            fontSize: 14,
                            fontWeight: '700',
                            letterSpacing: 2,	
                            lineHeight: 23
                        }}>{header}</Text>
                    </View>
                    <View style={{ //Icon and text container
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',           
                    }}>
                        <View style={{
                            paddingRight:14
                        }}>
                            <Image source={icon} style={{
                                height: 30,	
                                width: 40,	
                                borderRadius: 1         
                            }}/>
                        </View>
                        <View style={{
                            width: 188,
                            flex:2
                        }}>
                            <HTMLView
                            value={htmlContent} 
                            stylesheet={styles}
                            />
                        </View>
                        <View style={{
                        flex: 1,
                        justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={sidearrow}>
                            </Image>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );

        return content;
    }
}

const styles = StyleSheet.create({
  htmlcontent: {
    fontFamily: 'poppins-regular',
    paddingTop: 0,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '300'
  }
})