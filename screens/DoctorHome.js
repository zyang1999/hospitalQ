import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { globalStyles } from '../styles';
import AppLoading from 'expo-app-loading';
import Api from '../api/api';

export default function DoctorHome() {

    const [ready, setReady] = useState(false);
    const [currentQueue, setCurrentQueue] = useState(null);
    const [allQueue, setAllQueue] = useState(null);
    const [waitingPatient, setWaitingPatient] = useState(false);


    React.useLayoutEffect(() => {
        Api.request('getAllQueue', 'GET', {}).then((response) => {
            setCurrentQueue(response.currentQueue);
            setAllQueue(response.allQueue);
            if (response.allQueue.find(queue => queue.status == "WAITING")) {
                setWaitingPatient(true);
            };
            setReady(true);
        });
    }, []);

    const updateQueue = () => {
        Api.request('updateQueue', 'POST', { location })
    }

    const renderItem = ({item}) => (
        <View style={globalStyles.queueStatus}>
            <Text style={globalStyles.queueNumber}>{item.queue_no}</Text>
            <Text style={globalStyles.serving}>{item.status}</Text>
        </View>
    );

    const ServeButton = () => {
        if (waitingPatient) {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('joinQueue')}
                >
                    <Text style={globalStyles.primaryButton}>START SERVING</Text>
                </TouchableOpacity>
            );

        } else {
            return (
                <TouchableOpacity
                    onPress={() => navigation.navigate('joinQueue')}
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
                    <Text style={globalStyles.h3}>{currentQueue.user.first_name + ' ' + currentQueue.user.last_name}</Text>
                    <Text style={globalStyles.h4}>123456-12-1234</Text>
                    <Text style={globalStyles.h4}>CONCERN:</Text>
                    <Text style={[globalStyles.h3]}>Headache</Text>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('joinQueue')}
                    >
                        <Text style={globalStyles.primaryButton}>NEXT PATIENT</Text>
                    </TouchableOpacity>

                </View>
            );
        } else {
            return (
                <View style={[globalStyles.UserQueueBox, { height: 500 }]}>
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
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View>

                            <CurrentPatient />

                            <Text style={[globalStyles.h3, { textAlign: 'center', marginVertical: 20 }]}>Queue Status</Text>

                            <View style={globalStyles.queueStatus}>
                                <Text style={globalStyles.queueTitle}>Ticket Number</Text>
                                <Text style={globalStyles.queueTitle}>Now Serving</Text>
                            </View>
                        </View>
                    }
                />
            </View>
        );
    } else {
        return (<AppLoading />);
    }
}