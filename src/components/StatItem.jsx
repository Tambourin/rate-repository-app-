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

export const parseAmount = (amount) => {
  return amount > 1000 
  ? amount.toString().substring(0, amount.toString().length - 3) + "k" 
  : amount;
};

const StatItem = ({ text, amount, ...props }) => {

  return (
    <View style={styles.container}>
      <Text {...props} fontWeight="bold">{parseAmount(amount)}</Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

export default StatItem;