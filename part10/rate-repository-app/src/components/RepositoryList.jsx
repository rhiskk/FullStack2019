import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;
const renderRepository = ({ item }) => (
    <RepositoryItem repository={item} />
);


export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderRepository}
        />
    );
};

const RepositoryList = () => {
    const { repositories } = useRepositories();

    return <RepositoryListContainer repositories={repositories}/>;
};

export default RepositoryList;