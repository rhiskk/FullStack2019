import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

export const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async ({ id }) => {
        await mutate({ variables: { id } });
    };

    return [deleteReview, result];
};