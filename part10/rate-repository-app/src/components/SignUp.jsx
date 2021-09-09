import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { useSignUp } from '../hooks/useSignUp';

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
    username: '',
    password: '',
    passwordConfirmation: ''
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(1)
        .max(30),
    password: yup
        .string()
        .required("Password is required")
        .min(5)
        .max(50),
    passwordConfirmation: yup
        .string()
        .required("Password confirmation is required")
        .oneOf([yup.ref('password')], "Passwords don't match")
});


export const SignUpContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


export const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" testID="usernameField"/>
            <FormikTextInput name="password" placeholder="Password" secureTextEntry testID="passwordField" />
            <FormikTextInput name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry testID="passwordConfirmationField" />
            <View style={styles.button}>
                <Pressable onPress={onSubmit} testID="submitButton">
                    <Text fontWeight="bold" color="white">Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
};

const SignUp = () => {
    const history = useHistory();
    const [signUp] = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signUp({ username, password });
            history.push("/SignIn");
        } catch (e) {
            console.log(e);
        }
    };

    return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;