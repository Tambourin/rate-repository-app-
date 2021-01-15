import React from 'react';
import { Picker } from "@react-native-picker/picker";
import theme from '../theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  picker: {
    padding: theme.emptySpace.medium,
    backgroundColor: theme.colors.lightShade
  },
});

const OrderPicker = ({ setSelectedOrder }) => {
  return(
    <Picker style={styles.picker} onValueChange={(value) => setSelectedOrder(value)}>
      <Picker.Item label="Created at" value="createdAt" />
      <Picker.Item label="Rating average ASC" value="ratingAverageAsc" />
      <Picker.Item label="Rating average DESC" value="ratingAverageDesc" />
    </Picker>
  );
};

export default OrderPicker;