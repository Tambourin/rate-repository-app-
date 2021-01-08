
import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

console.log("Jei");
export default function App() {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}

