import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import useGetAuthorized from '../hooks/useGetAuthorized';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar
    }
});

const AppBar = () => {
    const { authorizedUser } = useGetAuthorized();
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <AppBarTab text="Repositories"/>
                {authorizedUser && <AppBarTab text="Create a review"/>}
                {authorizedUser && <AppBarTab text="My reviews"/>}
                {
                    !authorizedUser
                        ? <AppBarTab text="Sign in"/>
                        : <AppBarTab text="Sign out"/>
                }
                {!authorizedUser && <AppBarTab text={"Sign up"}/>}
            </ScrollView>
        </View>
    );
};

export default AppBar;