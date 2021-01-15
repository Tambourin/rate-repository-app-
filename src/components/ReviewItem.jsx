import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: theme.emptySpace.medium,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  rating: {
    marginRight: theme.emptySpace.small,
    borderWidth: 2,
    width: 50,
    height: 50,    
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const ReviewItem = ({ review, showRepositoryTitle }) => {
  if (!review) return null;

  return(
    <View style={styles.container}> 
     <View style={styles.rating}><Text >{review.rating}</Text></View>
      <View style={{flex: 1}}>
        <Text fontSize="subheading" fontWeight="bold">
          {showRepositoryTitle ? review.repository.fullName : review.user.username}
        </Text>
        <Text color='textSecondary'>
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text >{review.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;