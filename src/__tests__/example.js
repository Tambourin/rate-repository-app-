import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { View, Text, Button } from 'react-native';

const ComponentToTest = () => {
  const [ buttonPressed, setButtonPressed ] = useState(false);

  return (
    <View>
      {buttonPressed && <Text testID="textToTest">Tasataaon</Text>}
      <Button testID="nappula" onPress={() => setButtonPressed(true)} title="Push" />
    </View>
  );
};

describe('Example', () => {
  it('works', () => {
    expect(1).toBe(1);
  });

  it('component renders text', () => {
    const { getByTestId } = render(<ComponentToTest />);

    fireEvent.press(getByTestId('nappula'));
    expect(getByTestId('textToTest')).toHaveTextContent('Tasataaon');
  });

});