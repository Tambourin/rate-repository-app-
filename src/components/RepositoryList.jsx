import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RenderItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => {return edge.node;})
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RenderItem}
    />
  );
};

export default RepositoryList;