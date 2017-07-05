import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

export default class Panel extends Component{
    constructor(props){
        super(props);

        this.icons = { 
            'up'    : require('./images/shapegreenup.png'),
            'down'  : require('./images/shapegreendown.png')
        };

        this.state = {
            title       : props.title,
            expanded    : false,
            animation   : new Animated.Value()
        };

        this.underlayColor = this.props.underlayColor;
    }

    toggle(){
        let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded  
        });

        this.state.animation.setValue(initialValue); 
        Animated.spring(    
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start(); 
    }

    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.state.animation.setValue(event.nativeEvent.layout.height);
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }
    render(){
        let icon = this.icons['down'];
        let underlayColor = this.underlayColor;
        if(this.state.expanded){
            icon = this.icons['up']; 
        }

        return ( 
        
            <Animated.View 
                style={[styles.container,{height: this.state.animation}]}>
                    <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <TouchableHighlight 
                            style={styles.button} 
                            onPress={this.toggle.bind(this)}
                            underlayColor={underlayColor}>
                            <Image
                                style={styles.buttonImage}
                                source={icon}
                            ></Image>
                        </TouchableHighlight>
                </View>
                
                <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}> 
                    {this.props.children}
                </View>

            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container   : {
        overflow:'hidden'
    },
    titleContainer : {
        flexDirection: 'row'
    },
    title       : {
        flex    : 1,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    body        : {
        paddingTop  : 0,
        paddingBottom: 10
    }
});