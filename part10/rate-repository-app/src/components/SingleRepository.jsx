import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import theme from '../theme';
import useRepository from '../hooks/useRepository';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

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

const SingleRepository = () => {
    const { id } = useParams();
    const { repository, fetchMore } = useRepository({
        first: 5,
        id
    });

    const onEndReach = () => {
        fetchMore();
    };
    
    if (!repository) {
        return null;
    }
    const reviewNodes = repository.reviews
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={reviewNodes}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            ListHeaderComponent={() => <RepositoryItem repository={repository} />}
            ListHeaderComponentStyle={styles.margin}
        />
    );
};

export default SingleRepository;