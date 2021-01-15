import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  basic: {
    margin: theme.emptySpace.small,
    padding: theme.emptySpace.medium,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.lightShade
  },
  error: {
    borderColor: theme.colors.error
  }  
});

const TextInput = ({ error, ...props }) => {
  const textInputStyle = [
    styles.basic,
    error && styles.error
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;