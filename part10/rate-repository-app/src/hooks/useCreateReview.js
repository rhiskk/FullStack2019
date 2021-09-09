import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

export const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
  
    const review = async ({ repositoryName, ownerName, rating, text }) => {
        const { data } = await mutate({ variables: { repositoryName, ownerName, rating: Number(rating), text } });
        if (data) return data.createReview.repositoryId;
    };

    return [review, result];
  };