import React from 'react';
import { StackNavigator } from 'react-navigation';
// import { Icon } from 'react-native-elements';

import Home from '../screens/home/Home';
import About from '../screens/about/About';

export const Root = StackNavigator({
  Home: {
    screen: Home,
  },
  About: {
    screen: About,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});