import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
    fragment RepositoryDetails on Repository {
        id,
        fullName,
        description,
        ownerAvatarUrl,
        language,
        stargazersCount,
        forksCount,
        reviewCount,
        ratingAverage
    }
`;

export const REVIEW_DETAILS = gql`
    fragment ReviewDetails on Review {
        id,
        text,
        rating,
        createdAt,
        repositoryId,
        user {
            id,
            username 
        },
        repository {
            fullName
        }      
    }
`;