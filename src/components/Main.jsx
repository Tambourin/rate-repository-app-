import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Link, Route, Switch } from 'react-router-native';
import SignIn from './SignIn';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route exact path="/">
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
      
      </Switch>
      <Link to="/signin" component={AppBarTab} text="signin">
        <Text>signin</Text>
      </Link>
          
    </View>
  );
};

export default Main;