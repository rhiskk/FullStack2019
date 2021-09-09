import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import theme from '../theme';
import ReviewItem from './ReviewItem';
import useGetAuthorized from '../hooks/useGetAuthorized';

const styles = StyleSheet.create({
    rowContainer: {
        flexGrow: 1,
        margin: 10,
        flexDirection: 'row',
    },
    columnContainer: {
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'column',
        alignItems: "flex-start",
        paddingTop: 3,
    },
    reviewItemContainer: {
        flexGrow: 1,
        paddingRight: 10,
        flexDirection: 'column',
        backgroundColor: theme.colors.white
    },
    rating: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15
    },
    margin: {
        marginBottom: 10
    },
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { authorizedUser, refetch } = useGetAuthorized({ includeReviews: true });

    if (!authorizedUser) {
        return null;
    }
    const reviewNodes = authorizedUser.reviews
        ? authorizedUser.reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={reviewNodes}
            renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponentStyle={styles.margin}
        />
    );
};

export default MyReviews;