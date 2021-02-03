import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { PrimaryButton } from '../components/Button';
import { globalStyles } from '../styles';

export default function QueueDetails({ navigation, route }) {

    const details = route.params.details;
    const doctor = details.doctor;

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
                        <PrimaryButton title='Submit Feedback' action={() => navigation.navigate('Feedback', { queueId: details.id })} />
                    </View>

                </View>

            );
        }
    }

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <View style={{ marginHorizontal: 5 }}>
                <View style={styles.card}>
                    {doctor &&
                        <View>
                            <Image style={styles.image} source={{ uri: doctor.selfie_string }} />
                        </View>
                    }
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <View>
                                <Text style={styles.title}>Queue Date</Text>
                                <Text style={styles.details}>{details.created_at}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Specialty</Text>
                                <Text style={styles.details}>{details.specialty}</Text>
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.title}>Doctor Name</Text>
                                    <Text style={styles.details}>{doctor.first_name + ' ' + doctor.last_name}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Telephone No</Text>
                                    <Text style={styles.details}>{doctor.telephone}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Status</Text>
                                    <Text style={styles.details}>{details.status}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.title}>Queue Time</Text>
                                <Text style={styles.details}>{details.start_at + ' - ' + details.end_at}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Specialty</Text>
                                <Text style={styles.details}>{details.specialty}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Doctor email</Text>
                                <Text style={styles.details}>{doctor.email}</Text>
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.title}>Gender</Text>
                                    <Text style={styles.details}>{doctor.gender}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        {details.status == 'CANCELLED' &&
                            <View>
                                <Text style={styles.title}>Cancelled Reason</Text>
                                <Text style={styles.details}>{details.feedback.feedback}</Text>
                            </View>
                        }
                    </View>
                </View>
                {/* <Button />  */}
            </View>
        </ScrollView>
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
    },
    card: {
        elevation: 4,
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10,
        padding: 20,
    },
    title: {
        fontFamily: 'RobotoBold',
        marginBottom: 10,
        fontSize: 15
    },
    details: {
        fontSize: 15,
        marginBottom: 10
    },
    image: {
        marginBottom: 10,
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center'
    },
    scrollViewContainer: {
        backgroundColor: 'white',
        padding: 5
    }
});