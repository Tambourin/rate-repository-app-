import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: theme.emptySpace.medium,
    alignItems: 'center'
  },
});

const StatItem = ({ text, amount }) => {

  const parsedAmount = amount > 1000 
    ? amount.toString().substring(0, amount.toString().length - 3) + "k" 
    : amount;
  

  return (
    <View style={styles.container}>
      <Text fontWeight="bold">{parsedAmount}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

export default StatItem;