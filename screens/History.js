import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Loading from '../components/Loading';
import Api from '../services/Api';
import { globalStyles } from '../styles';
import { Entypo } from '@expo/vector-icons';

export default function History({ navigation, route }) {
    const [queueHistory, setQueueHistory] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Api.request('getHistory', 'GET', {}).then(response => {
            setQueueHistory(response.history);
            setLoading(false);
            setRefresh(false);
        });
    }, [refresh]);

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
                    onPress={() => navigation.navigate('Feedback', { queueId: item.id, setRefresh: (value) => setRefresh(value) })}
                >
                    <Text style={{ color: 'white' }}>Send Feedback</Text>
                </TouchableOpacity>
            }
        </View>
    );

    const QueueItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('QueueDetails', { details: item })}>
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.type}>{item.type} ({item.status})</Text>
                    <Text style={styles.date}>{item.created_at} {item.start_at}</Text>
                    <Text style={styles.details}>{item.specialty}</Text>
                    <Text style={styles.details}>DR. {item.doctor.full_name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="location-pin" size={17} color="black" />
                        <Text>{item.location}</Text>
                    </View>
                </View>
                <FeedbackButton item={item} />
            </View>
        </TouchableWithoutFeedback>
    );

    const AppointmentItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('AppointmentDetails', { details: item })}>
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.type}>{item.type} ({item.status})</Text>
                    <Text style={styles.date}>{item.date_string}</Text>
                    <Text style={styles.date}>{item.start_at + '-' + item.end_at}</Text>
                    <Text style={styles.details}>{item.specialty}</Text>
                    <Text style={styles.details}>DR. {item.doctor.full_name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="location-pin" size={17} color="black" />
                        <Text>{item.location}</Text>
                    </View>
                </View>
                <FeedbackButton item={item} />
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

    });