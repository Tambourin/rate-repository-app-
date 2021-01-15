import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order, searchKeyword) => {
  let queryVariables;
  switch (order) {
    case 'createdAt':
      queryVariables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      break;
    case 'ratingAverageAsc':
      queryVariables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      break;
    case 'ratingAverageDesc':
      queryVariables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;  
    default:
      queryVariables = { orderBy: 'CREATED_AT', orderDirection: 'ASC' };
      break;     
  }


  const { data, loading, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables: {searchKeyword: searchKeyword, first: 8, ...queryVariables},
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    
    const canFetchMore = 
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...queryVariables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };
        return nextResult;
      },
    });

  };

  const repositories = data ? data.repositories : undefined;

  return { repositories, loading, refetch, fetchMore: handleFetchMore };
};

export default useRepositories;