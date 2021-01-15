import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryID) => {
  const variables = { 
    id: repositoryID,
    first: 4
  };

  const { data, loading, fetchMore } = useQuery(
    GET_REPOSITORY, {
      variables: variables,
      fetchPolicy: 'cache-and-network',
    }
  );

  const handleFetchMore = async () => {
    const canFetchMore = 
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;
    
    await fetchMore({
      query: GET_REPOSITORY,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          repository:{ 
            ...previousResult.repository, 
            reviews: { 
              ...fetchMoreResult.repository.reviews, 
              edges: [
                ...previousResult.repository.reviews.edges, 
                ...fetchMoreResult.repository.reviews.edges
              ] 
            } 
          }
        };
      },
    });
  };

  const repository = data ? data.repository : [];

  return { repository, loading, fetchMore: handleFetchMore };
};

export default useRepository;