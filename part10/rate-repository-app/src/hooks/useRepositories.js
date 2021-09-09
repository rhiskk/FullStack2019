import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ first, sort, keyword }) => {

  const OrderDirection = {
    ASC: "ASC",
    DESC: "DESC"
  };

  const AllRepositoriesOrderBy = {
    CREATED_AT: "CREATED_AT",
    RATING_AVERAGE: "RATING_AVERAGE"
  };

  const sortParam = () => {
    switch (sort) {
      case "latest":
        return { orderDirection: OrderDirection.DESC, orderBy: AllRepositoriesOrderBy.CREATED_AT };
      case "highest":
        return { orderDirection: OrderDirection.DESC, orderBy: AllRepositoriesOrderBy.RATING_AVERAGE };
      case "lowest":
        return { orderDirection: OrderDirection.ASC, orderBy: AllRepositoriesOrderBy.RATING_AVERAGE };
      default:
        return { orderDirection: OrderDirection.DESC, orderBy: AllRepositoriesOrderBy.CREATED_AT };
    }
  };

  const variables = { ...sortParam(), searchKeyword: keyword, first };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables: { ...variables },
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepositories;