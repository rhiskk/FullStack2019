import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import theme from '../theme';

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

const onSubmit = (values) => {
    console.log(values);
};

const initialValues = {
    name: '',
    username: '',
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

const SignInForm = () => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <View style={styles.button}>
                <Pressable onPress={onSubmit}>
                    <Text fontWeight="bold" color="white">Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
};

const SignIn = () => {
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

export default SignIn;