import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  basic: {
    margin: theme.emptySpace.small,
    padding: theme.emptySpace.medium,
    borderRadius: 5,
    backgroundColor: theme.colors.lightShade,
    alignItems: 'center',
    
  },
  buttonText: {
    color: theme.colors.white
  },
  primary: {
    backgroundColor: theme.colors.primary
  }  
});

const Button = ({ style, ...props }) => {
  const buttonStyle = [
    styles.basic,
    style === 'primary' && styles.primary
  ];

  return <TouchableWithoutFeedback {...props} >
      <View style={buttonStyle}>
        <Text style={styles.buttonText}>{ props.children }</Text>
      </View>
    </TouchableWithoutFeedback>;
};

export default Button;