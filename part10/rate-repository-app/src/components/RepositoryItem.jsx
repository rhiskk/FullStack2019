import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'column',
        backgroundColor: theme.colors.white
    },
    avatar: {
        marginRight: 10,
        height: 50,
        width: 50,
        borderRadius: 3
    },
    language: {
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        paddingHorizontal: 6
    },
    description: {
        flexDirection: "row",
        flexGrow: 1,
        flexWrap: "wrap",
        marginBottom: 6,
        marginRight: 60
    },
    rowContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: "flex-start"
    },
    columnContainer: {
        flexDirection: 'column',
        flexWrap: "wrap",
        alignItems: "flex-start",
        paddingTop: 3
    },
    statColumnContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    statRowContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

});


const suffix = (number) => {
    if (number < 1000) return number;
    return (Number.parseFloat(number) / 1000).toPrecision(3) + "k";
};

const StatBlock = ({ title, number }) => {
    return (
        <View style={styles.statColumnContainer}>
            <Text fontWeight='bold' style={{ paddingBottom: 5 }}>{suffix(number)}</Text>
            <Text color="textSecondary">{title}</Text>
        </View>
    );
};

const RepositoryItem = ({ repository }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Image
                    style={styles.avatar}
                    source={{
                        uri: repository.ownerAvatarUrl
                    }}
                />
                <View style={styles.columnContainer}>
                    <Text fontWeight="bold" fontSize="subheading" style={{ paddingBottom: 5 }}>{repository.fullName}</Text>
                    <View style={styles.description}>
                        <Text color="textSecondary" style={{ paddingVertical: 5 }}>{repository.description}</Text>
                    </View>
                    <View style={styles.language}>
                        <Text color="white" style={{ marginVertical: 5 }}>{repository.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.statRowContainer}>
                <StatBlock title="Stars" number={repository.stargazersCount} />
                <StatBlock title="Forks" number={repository.forksCount} />
                <StatBlock title="Reviews" number={repository.reviewCount} />
                <StatBlock title="Rating" number={repository.ratingAverage} />
            </View>
        </View>
    );
};

export default RepositoryItem;