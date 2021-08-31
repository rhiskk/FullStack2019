import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    errorText: {
        marginLeft: 10,
        marginTop: 5
    },
    textInput: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: theme.colors.textSecondary
    }
});

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                style={styles.textInput}
                {...props}
            />
            {showError && <Text color="error" style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;