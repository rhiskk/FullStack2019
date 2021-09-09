import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderDirection: OrderDirection,
    $orderBy: AllRepositoriesOrderBy,
    $searchKeyword: String,
    $first: Int,
    $after: String)
    {
    repositories(
      orderDirection: $orderDirection,
      orderBy: $orderBy,
      searchKeyword: $searchKeyword,
      first: $first,
      after: $after)
        {
        edges {
          node {
            ...RepositoryDetails
          }
          cursor
        }
        pageInfo {
          endCursor,
          startCursor,
          hasNextPage
        }
      }
    }
    ${REPOSITORY_DETAILS}
`;

export const GET_AUTHORIZED = gql`
    query authorizedUser($includeReviews: Boolean = false) {
      authorizedUser {
        id,
        username,
        reviews @include(if: $includeReviews) {
          edges {
            node {
              ...ReviewDetails
            }
          }
        }
      }
    }
    ${REVIEW_DETAILS}
`;

export const GET_REPOSITORY = gql`
    query repository($id: ID!, $first: Int, $after: String) {
      repository(id: $id) {
        ...RepositoryDetails,
        url,
        reviews(first: $first, after: $after) {
          edges {
            node {
              ...ReviewDetails
            }
            cursor
          }
          pageInfo{
            endCursor,
            startCursor,
            hasNextPage
          }
        }
      }
    }
    ${REPOSITORY_DETAILS}
    ${REVIEW_DETAILS}
`;

// other queries...