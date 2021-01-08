import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
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
  return(
    <View style={styles.container}>

      <View style={styles.details}>
        <Image style={styles.image} source={{uri: item.ownerAvatarUrl}} />
        <View style={styles.detailsTexts}>
          <Text fontWeight='bold'>{item.fullName} </Text>
          <Text color='textSecondary'>{item.description} </Text>          
          <Text style={styles.detailsLanguage}>{item.language}</Text>
        </View>        
      </View>
      
      <View style={styles.stats}>
        <StatItem text="Forks" amount={item.forksCount}/>
        <StatItem text="Stars" amount={item.stargazersCount}/>
        <StatItem text="Reviews" amount={item.reviewCount}/>
        <StatItem text="Rating" amount={item.ratingAverage}/>
      </View>
      
    </View>
  );
};

export default RepositoryItem;