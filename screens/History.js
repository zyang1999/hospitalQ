import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Api from '../services/Api';
import { globalStyles } from '../styles';

export default function History({ navigation, route }) {
    const [queueHistory, setQueueHistory] = useState(null);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        Api.request('getQueueHistory', 'GET', {}).then(response => {
            setQueueHistory(response.queueHistory);
            setRefresh(false);
        });
    }, [refresh]);

    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('QueueDetails', { details: item })}>
            <View style={styles.itemContainer}>
                <View>
                    <Text style={globalStyles.h5}>{item.created_at}</Text>
                    <Text style={globalStyles.h4}>{item.location}</Text>
                </View>
                <View>
                    {item.reason
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
                            onPress={() => navigation.navigate('Feedback', { queueId: item.id, setRefresh: (value)=>setRefresh(value) })}
                        >
                            <Text style={{ color: 'white' }}>Send Feedback</Text>
                        </TouchableOpacity>
                    }

                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    const History = () => {
        return (
            <FlatList
                data={queueHistory}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        );
    }

    return (
        <View style={globalStyles.container_2}>
            <History />
        </View>
    );
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
    }
});