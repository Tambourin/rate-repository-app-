import React from 'react';
import { Alert, Dimensions, FlatList, StyleSheet, View } from "react-native";
import useUser from '../hooks/useUser';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import Button from './Button';
import Text from './Text';
import { useHistory } from 'react-router-native';

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }  
});

const ListItem = ({ item }) => {
  const history = useHistory();
  const { deleteReview } = useUser();

  const viewRepository = () => {
    history.push(`/${item.repository.id}`);
  };

  const handleDeleteReview = () => {
    deleteReview(item.id);
  };

  const deleteReviewAlert = () => 
      Alert.alert(
      "Delete Review",
      "Are you sure you want to delete your review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "DELETE", onPress: handleDeleteReview }
      ],
      { cancelable: true }
    );
    
  return(
    <View>
      <ReviewItem review={item} showRepositoryTitle/>
      <View style={styles.buttonContainer}>
        <Button style='primary' onPress={viewRepository}>
          <Text>View Repository</Text>
        </Button>
        <Button style='alert' onPress={deleteReviewAlert}>
          <Text>Delete Review</Text>
        </Button>
      </View>
    </View>
  );
};

const MyReviews = () => {  
  const { user, fetchMore } = useUser(true);
  console.log(user);

  const onEndReached = () => {    
    console.log("more");
    fetchMore();
  };

  const reviewNodes = user?.reviews
    ? user.reviews.edges.map(edge => {return edge.node;})
    : [];

  console.log(reviewNodes);

  return (
    <View style={{flex: 1, height: Dimensions.get('window').height}}>
    <FlatList 
      data={reviewNodes}
      renderItem={({ item }) => <ListItem item={item} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.01}
    />
    </View>
  );
};

export default MyReviews;