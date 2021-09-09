import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import Review from './Review';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.mainBackround
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Switch>
                <Route path="/" exact>
                    <RepositoryList />
                </Route>
                <Route path="/repositories/:id" exact>
                    <SingleRepository />
                </Route>
                <Route path="/signIn" exact>
                    <SignIn />
                </Route>
                <Route path="/signUp" exact>
                    <SignUp />
                </Route>
                <Route path="/review" exact>
                    <Review />
                </Route>
                <Route path="/myReviews" exact>
                    <MyReviews />
                </Route>
                <Redirect to="/" />
            </Switch>
        </View>
    );
};

export default Main;