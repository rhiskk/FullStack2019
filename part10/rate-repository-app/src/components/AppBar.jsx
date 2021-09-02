import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED } from '../graphql/queries';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar
    }
});

const AppBar = () => {
    const { data } = useQuery(GET_AUTHORIZED);
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <AppBarTab>Repositories</AppBarTab>
                {
                    !data?.authorizedUser
                        ? <AppBarTab>Sign in</AppBarTab>
                        : <AppBarTab>Sign out</AppBarTab>
                }
            </ScrollView>
        </View>
    );
};

export default AppBar;