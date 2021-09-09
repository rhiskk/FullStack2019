import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

export const useSignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER);
  
    const user = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password } });
        if (data) return data.creatUser;
    };

    return [user, result];
  };