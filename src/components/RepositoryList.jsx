import React, { useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import OrderPicker from './OrderPicker';
import { useDebounce } from 'use-debounce';
import TextInput from './TextInput';


const ListHeader = ({ setSelectedOrder, setSearchValue }) => {
  return (
    <>
     <OrderPicker setSelectedOrder={setSelectedOrder} />
     <TextInput onChangeText={text => setSearchValue(text)} /> 
    </>
  );
};



export const RepositoryListContainer = ({ repositories, setSelectedOrder, setSearchValue, onEndReached }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => {return edge.node;})
    : [];

  return (   
    <View style={{flex: 1, height: Dimensions.get('window').height}}>
      <FlatList   
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={RepositoryItem}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={<ListHeader setSelectedOrder={setSelectedOrder} setSearchValue={setSearchValue} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />    
      </View>
  );
};

const RepositoryList = () => {  
  const [ selectedOrder, setSelectedOrder ] = useState('createdAt');
  const [ searchValue, setSearchValue ] = useState('');
  const [ searchKeyword ] = useDebounce(searchValue, 500);
  const { repositories, fetchMore } = useRepositories(selectedOrder, searchKeyword);


  const onEndReached = () => {        
    fetchMore();
  };

  return (
    <RepositoryListContainer repositories={repositories} setSelectedOrder={setSelectedOrder} setSearchValue={setSearchValue} onEndReached={onEndReached}/>
  );
};

export default RepositoryList;