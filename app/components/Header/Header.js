import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

class Header extends Component{
    render(){
        return (
            <View style={styles.headerContainer}>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height:20,

        flexDirection: 'row',
    }
});

export default Header;