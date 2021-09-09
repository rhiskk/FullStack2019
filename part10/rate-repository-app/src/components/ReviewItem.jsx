import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useHistory } from 'react-router-native';
import { useDeleteReview } from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexGrow: 1,
        flexShrink: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
        flexDirection: 'column',
        backgroundColor: theme.colors.white
    },
    rowContainer: {
        flexGrow: 1,
        margin: 10,
        flexDirection: 'row',
    },
    buttonContainer: {
        flexGrow: 1,
        marginVertical: 8,
        justifyContent: "space-around",
        flexDirection: 'row',
    },
    columnContainer: {
        flexShrink: 1,
        flexDirection: 'column',
        alignItems: "flex-start",
        paddingTop: 3,
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
    text: {
        flexShrink: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        marginRight: 10
    },
    viewButton: {
        padding: 15,
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.border.borderRadius,
        fontWeight: 'bold'
    },
    deleteButton: {
        width: 150,
        padding: 15,
        alignItems: 'center',
        backgroundColor: theme.colors.error,
        borderRadius: theme.border.borderRadius,
        fontWeight: 'bold'
    }

});

const DeleteReviewButton = ({ reviewId, refetch }) => {
    const [deleteReview] = useDeleteReview();
    const onPress = () => {
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
                { text: "CANCEL" },
                {
                    text: "DELETE", onPress: () => {
                        deleteReview({ id: reviewId });
                        refetch({ includeReviews: true });
                    }
                }
            ]
        );
    };

    return (
        <TouchableOpacity onPress={() => onPress()} style={styles.deleteButton}>
            <Text color="white" fontWeight="bold" fontSize="subheading">
                Delete review
            </Text>
        </TouchableOpacity>
    );
};

const ViewRepositoryButton = ({ repositoryId }) => {
    const history = useHistory();
    return (
        <TouchableOpacity onPress={() => history.push(`repositories/${repositoryId}`)} style={styles.viewButton}>
            <Text color="white" fontWeight="bold" fontSize="subheading">
                View repository
            </Text>
        </TouchableOpacity>
    );
};

const ReviewItem = ({ review, refetch }) => {
    const date = new Date(review.createdAt).toLocaleDateString("fi-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <View style={styles.rating}>
                    <Text color="primary" fontWeight="bold" fontSize="subheading">{review.rating}</Text>
                </View>
                <View style={styles.columnContainer}>
                    {refetch
                        ? <Text fontWeight="bold">{review.repository.fullName}</Text>
                        : <Text fontWeight="bold">{review.user.username}</Text>
                    }
                    <View marginTop={3}>
                        <Text color="textSecondary">{date}</Text>
                    </View>
                    <View style={styles.text}>
                        <Text>{review.text}</Text>
                    </View>
                </View>
            </View>
            {refetch &&
                <View style={styles.buttonContainer}>
                    <ViewRepositoryButton repositoryId={review.repositoryId} />
                    <DeleteReviewButton reviewId={review.id} refetch={refetch} />
                </View>
            }
        </View>
    );
};

export default ReviewItem;