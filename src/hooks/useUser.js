import { useMutation, useQuery } from "@apollo/react-hooks";
import { DELETE_REVIEW } from "../graphql/mutations";
import { AUTHORIZED_USER } from "../graphql/queries";

const useUser = (includeReviews = false) => {
  const variables = {
    includeReviews: includeReviews,
    first: 8
  };

  const { data, loading, fetchMore, refetch } = useQuery(AUTHORIZED_USER, {
    variables: variables,
    fetchPolicy: 'cache-and-network',
  });
  const [ mutate ] = useMutation(DELETE_REVIEW);

  const handleFetchMore = async () => {
    const canFetchMore = 
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;
    
    await fetchMore({
      query: AUTHORIZED_USER,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          authorizedUser:{ 
            ...previousResult.authorizedUser, 
            reviews: { 
              ...fetchMoreResult.authorizedUser.reviews, 
              edges: [
                ...previousResult.authorizedUser.reviews.edges, 
                ...fetchMoreResult.authorizedUser.reviews.edges
              ] 
            } 
          }
        };
      },
    });
  };

  const deleteReview = async (id) => {
    console.log("Delete");
    await mutate({variables: {id: id }});
    await refetch({   
        ...variables, 
        includeReviews: true
    });
  };
  return  { user: data?.authorizedUser, fetchMore: handleFetchMore, deleteReview };
};

export default useUser;