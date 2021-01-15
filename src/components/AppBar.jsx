import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useSignIn from '../hooks/useSignIn';
import useUser from '../hooks/useUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.shade,
    flexDirection: 'row'
  }
});

const AppBar = () => {
  const { user } = useUser();
  const { signOut } = useSignIn();

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab path="/" text="Repositories" />        
        {user
          ? <AppBarTab path="/" text="Signout" fun={signOut}/>
          : <AppBarTab path="/signin" text="Signin" />}
        {!user && <AppBarTab path="/signup" text="SignUp" />}
        {user && <AppBarTab path="/myreviews" text="My Reviews" />}
        {user && <AppBarTab path="/review" text="Review" />}
      </ScrollView>
    </View>)
  ;
};

export default AppBar;