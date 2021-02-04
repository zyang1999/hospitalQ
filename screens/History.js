import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native';
import Loading from '../components/Loading';
import Api from '../services/Api';
import Modal from 'react-native-modal';
import { globalStyles } from '../styles';
import { Entypo } from '@expo/vector-icons';
import { PrimaryButton, DangerButton } from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History({ navigation, route }) {
    const [error, setError] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [queueId, setQueueId] = useState(null);
    const [queueHistory, setQueueHistory] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        if (route.params?.refresh) {
            setLoading(true);
        }
        if (refresh) {
            setLoading(true);
        }

        const getUserRole = async () => {
            let userRole = await AsyncStorage.getItem('userRole');
            setUserRole(userRole);
        }

        Api.request('getHistory', 'GET', {}).then(response => {
            console.log(response);
            setQueueHistory(response.history);
            getUserRole();
            setLoading(false);
            setRefresh(false);
        });
    }, [refresh, route.params?.refresh]);

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
        Api.request('storeFeedback', 'POST', { queueId: queueId, feedback: feedback }).then(response => {
            if (response.success) {
                setIsVisible(false);
                alert('Feedback submitted successfully');
                setError([]);
                setRefresh(true);
            } else {
                setError(response.message);
            }
        })
    }

    const FeedbackButton = ({ item }) => (
        <View>
            {item.feedback
                ?
                <TouchableOpacity
                    style={styles.disabledButton}
                    disabled={true}
                >
                    <Text style={{ color: 'white' }}>Feedback Sent</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.feedbackButton}
                    onPress={() => {
                        setQueueId(item.id);
                        setIsVisible(true);
                    }}
                >
                    <Text style={{ color: 'white' }}>Send Feedback</Text>
                </TouchableOpacity>
            }
        </View>
    );

    const QueueItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('QueueDetails', { queueId: item.id })}>
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.type}>{item.type} ({item.status})</Text>
                    <Text style={styles.date}>{item.created_at} {item.start_at}</Text>
                    <Details item={item}/>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="location-pin" size={17} color="black" />
                        <Text>{item.location}</Text>
                    </View>
                </View>
                {userRole == 'PATIENT' &&
                    <FeedbackButton item={item} />
                }
            </View>
        </TouchableWithoutFeedback>
    );

    const Details = ({ item }) => {
        if (userRole == 'PATIENT') {
            return (
                <View>
                    <Text style={styles.details}>{item.specialty}</Text>
                    <Text style={styles.details}>DR. {item.doctor_full_name}</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.details}>{item.patient_full_name}</Text>
                </View>
            );
        }
    }

    const AppointmentItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: item.id })}>
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.type}>{item.type} ({item.status})</Text>
                    <Text style={styles.date}>{item.date_string}</Text>
                    <Text style={styles.date}>{item.start_at + '-' + item.end_at}</Text>
                    <Details item={item} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="location-pin" size={17} color="black" />
                        <Text>{item.location}</Text>
                    </View>
                </View>
                {userRole == 'PATIENT' &&
                    <FeedbackButton item={item} />
                }
            </View>
        </TouchableWithoutFeedback>
    )

    const renderItem = ({ item }) => {
        if (item.type === 'Queue') {
            return (<QueueItem item={item} />);
        } else {
            return (<AppointmentItem item={item} />);
        }
    };

    const History = () => {
        return (
            <FlatList
                data={queueHistory}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }

    if (loading) {
        return (<Loading />);
    } else {
        return (
            <View style={globalStyles.container_2}>
                <FeedbackModal />
                <History />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    feedbackButton: {
        backgroundColor: '#42A5F5',
        padding: 10,
        borderRadius: 10
    },
    disabledButton: {
        backgroundColor: '#808B96',
        padding: 10,
        borderRadius: 10
    },
    type: {
        fontFamily: 'RobotoBold',
        fontSize: 15,
        marginBottom: 10,
    },
    date: {
        fontFamily: 'RobotoBold',
        fontSize: 15
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