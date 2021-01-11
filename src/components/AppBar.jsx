import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { AUTHORIZED_USER } from '../graphql/queries';
import { useQuery } from '@apollo/react-hooks';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.shade,
    flexDirection: 'row'
  }
});

const AppBar = () => {
  const [ signIn, result, signout ] = useSignIn();
  const { data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path="/" text="Repositories" />        
        {data?.authorizedUser 
          ? <AppBarTab path="/" text="Signout" fun={signout}/>
          : <AppBarTab path="/signin" text="Signin" />}
      </ScrollView>
    </View>)
  ;
};

export default AppBar;