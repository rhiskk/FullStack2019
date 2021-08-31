import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from "react-router-native";
import Text from './Text';


const styles = StyleSheet.create({
    tab: {
        flexGrow: 0,
        marginTop: 20,
        marginHorizontal: 15
    }
});

const AppBarTab = (tab) => {
    const link = () => {
        switch (tab.children) {
            case "Sign in":
                return "/signIn";
            case "Repositories":
                return "/";
            default:
                return "/";
        }
    };
    return (
        <View style={styles.tab}>
            <Link to={link()}>
                <Text
                    color="white"
                    fontWeight="bold"
                    {...tab}
                />
            </Link>
        </View>
    );
};

export default AppBarTab;
