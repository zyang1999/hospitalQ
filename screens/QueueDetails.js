import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PrimaryButton } from '../components/Button';
import { globalStyles } from '../styles';

export default function QueueDetails({ navigation, route }) {

    const details = route.params.details;

    const Feedback = () => {
        if (details.reason) {
            return (
                <View style={styles.feedbackMessageContainer}>
                    <Text style={globalStyles.h5}>{details.reason.reason}</Text>
                </View>

            );
        } else {
            return (
                <View style={styles.feedbackContainer}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={globalStyles.h5}>No FeedBack</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <PrimaryButton title='Submit Feedback' action={()=>navigation.navigate('Feedback', {queueId: details.id})} />
                    </View>

                </View>

            );
        }
    }

    return (
        <View style={globalStyles.container_2}>
            <View style={styles.detailContainer}>
                <Text style={globalStyles.h5}>{details.created_at}</Text>
                <Text style={globalStyles.h4}>Queue Number: {details.queue_no}</Text>
                <Text style={globalStyles.h4}>Location: {details.location}</Text>
                <Text style={globalStyles.h4}>Served by: {details.served_by.first_name + details.served_by.last_name}</Text>
                <Text style={globalStyles.h4}>Waiting Time: {details.waiting_time}</Text>
            </View>
            <View style={styles.feedbackContainer}>
                <Text style={[globalStyles.h3, { textAlign: 'center' }]}>Feedback</Text>
                <Feedback />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10
    },
    feedbackContainer: {
        flex: 1,
    },
    feedbackMessageContainer: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        margin: 10
    }
});