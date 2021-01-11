import React from 'react';
import Text from './Text';
import theme from '../theme';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  links: {
    color: theme.colors.white,
    padding: 18,
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold
  }
});

const AppBarTab = ({ text, path, fun }) => {
  return (
    <Link to={path} component={TouchableWithoutFeedback} onPress={fun}>
      <Text style={styles.links}>{ text }</Text>
    </Link>
  );
};

export default AppBarTab;