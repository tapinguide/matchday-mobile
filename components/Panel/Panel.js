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
            expanded    : this.props.panelExpanded,
            animation   : new Animated.Value()
        };

        this.underlayColor = this.props.underlayColor;
    }

    componentWillReceiveProps(nextProps) {
        let currentExpandedState = this.getExpandedState();

        if (nextProps.panelExpanded != currentExpandedState) {
            this.toggle();
        }
    }

    getExpandedState() {
        return this.state.expanded;
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
                toValue: finalValue,
                bounciness: 0
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
            <Animated.View style={[styles.container,{height: this.state.animation}]}>
                <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                    <View
                        style={styles.toggleIcon}
                        underlayColor={underlayColor}>
                        <Image
                            source={icon}>
                        </Image>
                    </View>
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
    toggleIcon: {
        paddingTop:15,
        paddingBottom:10
    },
    titleContainer : {
        flexDirection: 'row',
        justifyContent: 'center'
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