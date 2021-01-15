import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';
import StatItem from './StatItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: theme.emptySpace.large
  },
  details: {
    flexDirection: 'row',    
  },
  detailsTexts: {
    paddingHorizontal: theme.emptySpace.small,
    flexShrink: 1,
    flexGrow: 0,
    flexDirection: 'column'
  },
  detailsLanguage: {
    backgroundColor: theme.colors.primary,
    padding: theme.emptySpace.small,
    borderRadius: 5,
    alignSelf: 'flex-start',
    color: theme.colors.white,    
  },
  image: { 
    height: 50,
    width: 50
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const RepositoryItem = ({ item }) => {
  if (!item) { return null; }

  return(
    <View style={styles.container}>
      <View style={styles.details}>
        <Image style={styles.image} source={{uri: item.ownerAvatarUrl}} />
        <View style={styles.detailsTexts}>
          <Link to={`/${item.id}`} component={TouchableWithoutFeedback}> 
            <Text fontWeight='bold' testID="fullName">{item.fullName}</Text>
          </Link>          
          <Text color='textSecondary' testID="description">{item.description}</Text>          
          <Text style={styles.detailsLanguage} testID="language">{item.language}</Text>
        </View>        
      </View>
      
      <View style={styles.stats}>
        <StatItem testID="forksCount" text="Forks" amount={item.forksCount}/>
        <StatItem testID="stargazersCount" text="Stars" amount={item.stargazersCount}/>
        <StatItem testID="reviewCount" text="Reviews" amount={item.reviewCount}/>
        <StatItem testID="ratingAverage" text="Rating" amount={item.ratingAverage}/>
      </View>      
    </View>
  );
};

export default RepositoryItem;