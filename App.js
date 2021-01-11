
import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';
import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/AuthStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const storage = new AuthStorage();
const apolloClient = createApolloClient(storage);

export default function App() {
  
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={storage} >
          <Main />
        </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
}

