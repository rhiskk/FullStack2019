import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

export const useSignOut = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
  
    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };
  
    return [signOut];
  };