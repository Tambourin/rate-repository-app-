import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { useRouteMatch } from 'react-router-native';
import Button from './Button';
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';
import useRepository from '../hooks/useRepository';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import Text from './Text';

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem item={repository} />
      <Button style='primary' onPress={() => {Linking.openURL(repository.url);}}>
        <Text>See in Github</Text>
      </Button>
    </View>    
  );
};


const RepositorySingle = () => {  
  const path = useRouteMatch("/:repositoryID");
  const repositoryID = path.params.repositoryID;
  const { repository, fetchMore } = useRepository(repositoryID);

  const onEndReached = () => {    
    fetchMore();
  };

  const reviewNodes = repository?.reviews
    ? repository.reviews.edges.map(edge => {return edge.node;})
    : [];

  return (
    <View style={{flex: 1, height: Dimensions.get('window').height}}>
    <FlatList 
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
    />
    </View>
  );
};

export default RepositorySingle;