import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    error: 'red',
    shade: '#24292e',
    lightShade: 'grey',
    white: '#fdfdfd'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 24,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }) 
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  emptySpace: {
    small: 8,
    medium: 16,
    large: 18,
    huge: 24
  }
};

export default theme;