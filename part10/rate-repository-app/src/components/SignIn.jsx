import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';
import { useSignIn } from '../hooks/useSignIn';

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
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(3, "Must be atleast 3 digits")
        .max(19, "Must be under 20 digits"),
    password: yup
        .string()
        .required("Password is required")
        .min(4, "Must be atleast 4 digits")
});


export const SignInContainer = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


export const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" testID="usernameField"/>
            <FormikTextInput name="password" placeholder="Password" secureTextEntry testID="passwordField" />
            <View style={styles.button}>
                <Pressable onPress={onSubmit} testID="submitButton">
                    <Text fontWeight="bold" color="white">Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
};

const SignIn = () => {
    const history = useHistory();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signIn({ username, password });
            history.push("/");
        } catch (e) {
            console.log(e);
        }
    };

    return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;