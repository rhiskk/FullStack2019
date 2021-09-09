import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED } from '../graphql/queries';

const useGetAuthorized = (includeReviews)  => {
    const include = includeReviews ? true : false;
    const { data, refetch, ...result } = useQuery(GET_AUTHORIZED, {
        variables: { includeReviews: include },
        fetchPolicy: 'cache-and-network'
    });
    if (!data) return result;
    
    return { authorizedUser: data.authorizedUser, refetch, ...result };
};

export default useGetAuthorized;