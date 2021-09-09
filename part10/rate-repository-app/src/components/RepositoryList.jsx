import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { useHistory } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
    search: {
        margin: 15,
    },
    header: {
        justifyContent: 'space-between'
    },
    picker: {
        marginHorizontal: 15
        //for android maybe?
        //padding: 10,
        //marginHorizontal: 15,
        //marginBottom: 10
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SortPicker = ({ sort, setSort }) => (
    <Picker
        style={styles.picker}
        selectedValue={sort}
        onValueChange={(itemValue) =>
            setSort(itemValue)
        }>
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
);

const Search = ({ keyword, setKeyword }) => (
    <Searchbar
        placeholder="Search"
        onChangeText={query => setKeyword(query)}
        value={keyword}
        style={styles.search}
    />
);

export class RepositoryListContainer extends React.Component {

    renderHeader = () => {
        const { keyword, setKeyword, sort, setSort } = this.props;
        return (
            <>
                <Search keyword={keyword} setKeyword={setKeyword} />
                <SortPicker sort={sort} setSort={setSort} />
            </>
        );

    };

    render() {
        const { history, repositories, onEndReach } = this.props;
        const repositoryNodes = repositories
            ? repositories.edges.map((edge) => edge.node)
            : [];

        const renderRepository = ({ item }) => (
            <Pressable onPress={() => history.push(`repositories/${item.id}`)}>
                <RepositoryItem repository={item} />
            </Pressable>
        );
        return (
            <FlatList
                data={repositoryNodes}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={renderRepository}
                ListHeaderComponent={this.renderHeader}
            />
        );
    }
}

const RepositoryList = () => {
    const [sort, setSort] = useState("latest");
    const [keyword, setKeyword] = useState("");
    const [value] = useDebounce(keyword, 500);
    const history = useHistory();
    const { repositories, fetchMore } = useRepositories({
        first: 10,
        sort,
        keyword: value
    });
    const onEndReach = () => {
        fetchMore();
    };

    if (!repositories) {
        return null;
    }

    return <RepositoryListContainer
        history={history}
        repositories={repositories}
        onEndReach={onEndReach}
        keyword={keyword}
        setKeyword={setKeyword}
        sort={sort}
        setSort={setSort}
    />;
};

export default RepositoryList;