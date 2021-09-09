import React from 'react';
import { View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';
import { useSignOut } from '../hooks/useSignOut';

const styles = StyleSheet.create({
    tab: {
        flexGrow: 0,
        marginTop: 20,
        marginHorizontal: 15
    }
});

const AppBarTab = ({ text }) => {
    const [signOut] = useSignOut();
    const link = () => {
        switch (text) {
            case "Sign in":
                return "/signIn";
            case "Sign up":
                return "/signUp";
            case "Repositories":
                return "/";
            case "Create a review":
                return "/review";
            case "My reviews":
                return "/myReviews";
            default:
                return "/";
        }
    };
    return (
        <View style={styles.tab}>
            {text === "Sign out"
                ? <Pressable onPress={() => signOut()}>
                    <Text color="white" fontWeight="bold">{text}</Text>
                </Pressable>

                : <Link to={link()} component={TouchableOpacity} activeOpacity={0.8}>
                    <Text color="white" fontWeight="bold">{text}</Text>
                </Link>
            }
        </View>
    );
};

export default AppBarTab;
