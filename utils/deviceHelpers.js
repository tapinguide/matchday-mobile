import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { isIphoneX } from 'react-native-iphone-x-helper';

export const LANDSCAPE = 'landscape';
export const PORTRAIT = 'portrait';
const statusBarHeight = getStatusBarHeight();

export const isAndroid = () => Platform.OS === 'android'

// This does not include the new bar area in the iPhone X, so I use this when I need a custom headerTitle component
export const getHeaderHeight = () => {
  const orientation = getOrientation();
  if (Platform.OS === 'ios' && orientation === LANDSCAPE && !Platform.isPad) {
    return 52;
  }

  return statusBarHeight;
};

export const getSafeBottomPadding = (initialPadding) => {
  let newPadding = isIphoneX() ? (initialPadding + 24) : initialPadding;
  return newPadding;
};

export const getOrientation = () => {
  const { width, height } = Dimensions.get('window');
  return width > height ? LANDSCAPE : PORTRAIT;
};