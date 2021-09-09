import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { useCreateReview } from '../hooks/useCreateReview';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: theme.colors.white
    },
    button: {
        backgroundColor: theme.colors.primary,
        margin: 10,
        padding: 15,
        borderRadius: 3,
        alignItems: "center"
    }
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
};

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required("Repository owner name is required"),
    repositoryName: yup
        .string()
        .required("Repository name is required"),
    rating: yup
        .number()
        .required("Rating is required")
        .min(0)
        .max(100)
});

export const ReviewContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="ownerName" placeholder="Repository owner name" testID="ownerNameField" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" testID="repositoryNameField" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" testID="ratingField" />
            <FormikTextInput name="text" placeholder="Review" testID="reviewTextField" />
            <View style={styles.button}>
                <Pressable onPress={onSubmit} testID="submitButton">
                    <Text fontWeight="bold" color="white">Create a review</Text>
                </Pressable>
            </View>
        </View>
    );
};

const Review = () => {
    const history = useHistory();
    const [review] = useCreateReview();

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;
        try {
            const repositoryId = await review({ ownerName, repositoryName, rating, text });
            history.push(`/repositories/${repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };

    return <ReviewContainer onSubmit={onSubmit} />;
};

export default Review;