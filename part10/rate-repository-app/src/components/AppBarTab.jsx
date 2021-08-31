import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import theme from '../theme';
import Text from './Text';


const styles = StyleSheet.create({
    tab: {
        flexGrow: 0,
        marginTop: 20,
        marginHorizontal: 15
    }
});

const AppBarTab = (text) => {
    return (
        <View style={styles.tab}>
            <Pressable
            onPress={() => {
                console.log("pressed ", {...text});
            }}>
                <Text
                    style={{ color: theme.colors.white}}
                    fontWeight="bold"
                    {...text}
                />
            </Pressable>
        </View>
    );
};

export default AppBarTab;
