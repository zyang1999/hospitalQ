import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { globalStyles } from '../styles';
import Loading from '../components/Loading';
import Api from '../services/Api';

export default function StaffHome() {

    const [ready, setReady] = useState(false);
    const [currentQueue, setCurrentQueue] = useState(null);
    const [allQueue, setAllQueue] = useState([]);
    const [waitingPatient, setWaitingPatient] = useState(false);
    const [currentQueueID, setCurrentQueueID] = useState(null);

    React.useEffect(() => {
        Api.request('getAllQueue', 'GET', {}).then((response) => {
            setAllQueue(response.allQueue);
            setCurrentQueue(response.currentQueue);
            setCurrentQueueID((response.currentQueue) ? response.currentQueue.id : null);
            setWaitingPatient((response.allQueue.find(queue => queue.status == "WAITING")) ? true : false);
            setReady(true);
        });
    }, [ready]);

    const updateQueue = () => {
        Api.request('updateQueue', 'POST', { queue_id: currentQueueID }).then(setReady(false));
    }

    const renderItem = ({ item }) => (
        <View style={globalStyles.queueStatus}>
            <View style={{ flex: 1 }}>
                <Text style={globalStyles.queueNumber}>{item.queue_no}</Text>
            </View>

            <View style={{ flex: 1 }} >
                {item.status == 'SERVING'
                    ? <Text style={globalStyles.serving}>{item.status}</Text>
                    : <Text style={globalStyles.waiting}>{item.status}</Text>}
            </View>
        </View>
    )

    const ServeButton = () => {
        if (waitingPatient) {
            return (
                <TouchableOpacity
                    onPress={() => updateQueue()}
                >
                    <Text style={globalStyles.primaryButton}>START SERVING</Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity
                    disabled={true}
                >
                    <Text style={[globalStyles.primaryButton, { backgroundColor: '#B3B6B7' }]}>NO PATIENT WAITING</Text>
                </TouchableOpacity>
            );
        }
    }

    const CurrentPatient = () => {
        if (currentQueue) {
            return (
                <View style={[globalStyles.UserQueueBox, { height: 500 }]}>
                    <Text style={globalStyles.h4}>Current Patient</Text>
                    <Text style={globalStyles.h1}>{currentQueue.queue_no}</Text>
                    <Text style={globalStyles.h3}>{currentQueue.patient.first_name + ' ' + currentQueue.patient.last_name}</Text>
                    <Text style={globalStyles.h4}>{currentQueue.patient.IC_no}</Text>

                    <TouchableOpacity
                        onPress={() => updateQueue()}
                    >
                        <Text style={globalStyles.primaryButton}>NEXT PATIENT</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={[globalStyles.UserQueueBox, { height: 200 }]}>
                    <Text style={globalStyles.h4}>No Patient are being served now</Text>
                    <ServeButton />
                </View>
            );
        }
    }

    if (ready) {
        return (
            <View style={globalStyles.container_2}>
                <FlatList
                    data={allQueue}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View style={{ padding: 10 }}>
                            <CurrentPatient />

                            <Text style={[globalStyles.h3, { textAlign: 'center', marginVertical: 20 }]}>Queue List</Text>

                            <View style={globalStyles.queueStatus}>
                                <Text style={globalStyles.queueTitle}>Ticket Number</Text>
                                <Text style={globalStyles.queueTitle}>Now Serving</Text>
                            </View>
                            {allQueue.length == 0 &&
                                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                                    <Text>No Patient is waiting</Text>
                                </View>
                            }
                        </View>
                    }
                />
            </View>
        );
    } else {
        return (<Loading />);
    }
}
