import React from 'react';
import { TextInput as NativeTextInput, StyleSheet, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    error: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 15,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 3,
        borderColor: theme.colors.error
    },
});

const TextInput = ({ style, error, ...props }) => {
    const textInputStyle = error ? [styles.error] : [style];
    return (
        <View>
            <NativeTextInput style={textInputStyle} {...props} />
        </View>
    );
};

export default TextInput;