import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql` 
query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int $after: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
    edges {
      cursor
      node {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
      }
    }
    pageInfo {
      hasNextPage
      startCursor
      endCursor
    }
  }
}`;

export const GET_REPOSITORY = gql`
  query($id:ID!, $first: Int, $after: String){
    repository(id:$id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
      }
      
    }
  }
`;

export const AUTHORIZED_USER = gql`
query($includeReviews: Boolean = false, $first: Int, $after: String) {
  authorizedUser {
    id
    username
    reviews(first: $first, after: $after) @include(if: $includeReviews) {
      edges {
        node {
          id
          repository {
            id
            fullName
          }
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}`;

