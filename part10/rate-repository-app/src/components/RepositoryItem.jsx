import React from 'react';
import { View, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexGrow: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'column',
        backgroundColor: theme.colors.white
    },
    avatar: {
        marginRight: 15,
        height: 50,
        width: 50,
        borderRadius: theme.border.borderRadius
    },
    language: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.border.borderRadius,
        padding: 5
    },
    description: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 6,
        paddingVertical: 5
    },
    rowContainer: {
        margin: 10,
        flexDirection: 'row',
    },
    columnContainer: {
        flexShrink: 1,
        flexDirection: 'column',
        alignItems: "flex-start",
        paddingTop: 3,
    },
    statColumnContainer: {
        flexShrink: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    statRowContainer: {
        flexShrink: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    button: {
        marginTop: 15,
        margin: 10,
        padding: 15,
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.border.borderRadius,
        fontWeight: 'bold'
    }
});


const suffix = (number) => {
    if (number < 1000) return number;
    return Number((parseFloat(number) / 1000).toFixed(1)) + "k";
};

const StatBlock = ({ title, number, testID }) => {
    return (
        <View style={styles.statColumnContainer}>
            <Text fontWeight='bold' style={{ paddingBottom: 5 }} testID={testID}>{suffix(number)}</Text>
            <Text color="textSecondary">{title}</Text>
        </View>
    );
};


const GithubButton = ({ repository }) => {
    return (
        <View>
            <TouchableOpacity onPress={() => Linking.openURL(repository.url)} style={styles.button}>
                <Text color="white" fontWeight="bold" fontSize="subheading">
                    Open in GitHub
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const RepositoryItem = ({ repository }) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: repository.ownerAvatarUrl
                        }}
                    />
                    <View style={styles.columnContainer}>
                        <Text fontWeight="bold" fontSize="subheading" testID="fullName">{repository.fullName}</Text>
                        <View style={styles.description}>
                            <Text color="textSecondary" testID="description">{repository.description}</Text>
                        </View>
                        <View style={styles.language}>
                            <Text color="white" testID="language">{repository.language}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.statRowContainer}>
                    <StatBlock title="Stars" number={repository.stargazersCount} testID="stargazersCount" />
                    <StatBlock title="Forks" number={repository.forksCount} testID="forksCount" />
                    <StatBlock title="Reviews" number={repository.reviewCount} testID="reviewCount" />
                    <StatBlock title="Rating" number={repository.ratingAverage} testID="ratingAverage" />
                </View>
                {repository.url && <GithubButton repository={repository} />}
            </View>
        </View>
    );
};

export default RepositoryItem;