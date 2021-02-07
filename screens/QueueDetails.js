import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { PrimaryButton, DangerButton } from '../components/Button';
import Modal from 'react-native-modal';
import api from '../services/Api';
import ErrorMessage from '../components/ErrorMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';

export default function QueueDetails({ navigation, route }) {

    const [details, setDetails] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [patient, setPatient] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [error, SetError] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);


    useEffect(() => {
        const getUserRole = async () => {
            let userRole = await AsyncStorage.getItem('userRole');
            setUserRole(userRole);
        }
        api.request('getQueueDetails', 'POST', { queueId: route.params.queueId }).then(response => {
            console.log(response);
            setDetails(response);
            setDoctor(response.doctor);
            setPatient(response.patient);
            getUserRole();
            setLoading(false);
        })

    }, [])

    const FeedbackModal = () => {
        var feedback = '';
        return (
            <Modal
                isVisible={isVisible}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.details}>Please provide your feedback below.</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        style={styles.input}
                        onChangeText={text => feedback = text}
                    />
                    {error.feedback && <ErrorMessage message={error.feedback} />}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <PrimaryButton title='SUBMIT' action={() => submitFeedback(feedback)} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <DangerButton title='CANCEL' action={() => setIsVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    const submitFeedback = (feedback) => {
        api.request('storeFeedback', 'POST', { queueId: details.id, feedback: feedback }).then(response => {
            if (response.success) {
                setIsVisible(false);
                alert('Feedback submitted successfully');
                navigation.navigate('History', { refresh: details.id });
            } else {
                SetError(response.message);
            }
        })
    }

    const FeedbackButton = () => (
        <View style={{ flex: 1 }}>
            <PrimaryButton title='SUBMIT FEEDBACK' action={() => setIsVisible(true)} />
        </View>
    )
    const Feedback = () => {
        if (details.feedback != null) {
            return (
                <View style={styles.card}>
                    <Text style={styles.title}>Feedback</Text>
                    <Text style={styles.details}>{details.feedback.feedback}</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <View style={styles.card}>
                        <Text style={styles.title}>Feedback</Text>
                        <Text>No Feedback</Text>
                    </View>
                    {userRole == 'PATIENT' && <FeedbackButton />}
                </View>
            );
        }
    }

    const Reason = () => {
        return (
            <View style={{ marginVertical: 10 }}>
                <View style={styles.card}>
                    <Text style={styles.title}>Cancel Reason</Text>
                    <Text style={styles.details}>{details.feedback.feedback}</Text>
                </View>
                <Text>This queue is cancelled by the patient.</Text>
            </View>
        );
    }

    if (loading) {
        return (<Loading />);
    } else {

        return (
            <ScrollView style={styles.scrollViewContainer}>
                <FeedbackModal />
                <View style={{ marginHorizontal: 5 }}>
                    <View style={styles.card}>
                        {doctor &&
                            <Image style={styles.image} source={{ uri: doctor.selfie_string }} />
                        }
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <View>
                                    <Text style={styles.title}>Date</Text>
                                    <Text style={styles.details}>{details.created_at}</Text>
                                </View>
                                {doctor.role == 'DOCTOR'
                                    ? <View>
                                        <Text style={styles.title}>Doctor Name</Text>
                                        <Text style={styles.details}>DR. {doctor.first_name + ' ' + doctor.last_name}</Text>
                                    </View>
                                    : <View>
                                        <Text style={styles.title}>Nurse Name</Text>
                                        <Text style={styles.details}>{doctor.first_name + ' ' + doctor.last_name}</Text>
                                    </View>
                                }
                                <View>
                                    <Text style={styles.title}>Telephone No</Text>
                                    <Text style={styles.details}>{doctor.telephone}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Email</Text>
                                    <Text style={styles.details}>{doctor.email}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Status</Text>
                                    <Text style={styles.details}>{details.status}</Text>
                                </View>
                            </View>
                            <View>
                                <View>
                                    <Text style={styles.title}>Start At </Text>
                                    <Text style={styles.details}>{details.start_at}</Text>
                                </View>
                                <View>
                                    <Text style={styles.title}>Specialty</Text>
                                    <Text style={styles.details}>{details.specialty}</Text>
                                </View>
                            </View>
                        </View>
                        {details.status != 'AVAILABLE' &&
                            <View>
                                <View style={{ borderBottomWidth: 0.5, marginBottom: 10 }} />
                                <Image style={styles.image} source={{ uri: patient.selfie_string }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginRight: 35 }}>
                                        <View>
                                            <Text style={styles.title}>Patient Name</Text>
                                            <Text style={styles.details}>{patient.first_name + ' ' + patient.last_name}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.title}>Telephone No</Text>
                                            <Text style={styles.details}>{patient.telephone}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.title}>Patient email</Text>
                                            <Text style={styles.details}>{patient.email}</Text>
                                        </View>
                                        {details.specialty != 'PHAMARCY' &&
                                            <View>
                                                <Text style={styles.title}>Patient concern</Text>
                                                {details.concern == null
                                                    ? <Text style={styles.details}>None</Text>
                                                    : <Text style={styles.details}>{details.concern}</Text>
                                                }
                                            </View>
                                        }
                                    </View>
                                    <View>
                                        <View>
                                            <Text style={styles.title}>Gender</Text>
                                            <Text style={styles.details}>{patient.gender}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.title}>patient IC</Text>
                                            <Text style={styles.details}>{patient.IC_no}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                    {details.status == 'CANCELLED' && <Reason />}
                    {details.status == 'COMPLETED' && <Feedback />}
                </View>
            </ScrollView>
        );
    }
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
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        textAlignVertical: 'top',
        padding: 10
    }
});