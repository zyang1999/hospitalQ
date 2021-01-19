import React, { useState } from 'react';
import { Text, View, FlatList, Modal, StyleSheet, TextInput } from 'react-native';
import { globalStyles } from '../styles';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import Api from '../services/Api';
import AppLoading from 'expo-app-loading';


export default function Queue({ navigation, route }) {
    const [ready, setReady] = useState(false);
    const [userQueue, setUserQueue] = useState(null);
    const [allQueue, setAllQueue] = useState(null);
    const [patientWaiting, setPatientWaiting] = useState(null);

    React.useEffect(() => {
        Api.request('getUserQueue', 'GET', {}).then(response => {
            setUserQueue(response.userQueue);
            setAllQueue(response.allQueue);
            setPatientWaiting(response.patientWaiting);
            setReady(true);
        });
    }, [ready]);

    React.useEffect(() => {
        setReady(false);
    }, [route.params?.refresh]);

    const renderItem = ({ item }) =>
    (
        <View style={globalStyles.queueStatus}>
            <Text style={globalStyles.queueNumber}>{item.queue_no}</Text>
            {item.status == 'SERVING'
                ? <Text style={globalStyles.serving}>{item.status}</Text>
                : <Text style={globalStyles.waiting}>{item.status}</Text>}
        </View>
    );
    const QueueList = () => (
        <FlatList
            style={globalStyles.container_2}
            data={allQueue}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    <Queue />
                    <Text style={[globalStyles.h3, { textAlign: 'center', marginVertical: 20 }]}>Queue List</Text>
                    <View style={globalStyles.queueStatus}>
                        <Text style={globalStyles.queueTitle}>Ticket Number</Text>
                        <Text style={globalStyles.queueTitle}>Now Serving</Text>
                    </View>
                </View>
            }
        />
    );

    const NoQueue = () => {
        return (
            <View style={globalStyles.container_2}>
                <View style={[globalStyles.UserQueueBox, { flex: 0.6 }]}>
                    <Text style={globalStyles.h4}>You haven't join a Queue Yet</Text>
                    <PrimaryButton title='JOIN QUEUE' action={() => navigation.navigate('JoinQueue')} />
                </View>
                <View style={[globalStyles.UserQueueBox, { flex: 0.3 }]}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={globalStyles.h5}>Number of Patient Wating</Text>
                        <Text style={globalStyles.h2}>{patientWaiting}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const Queue = () => {
        if (userQueue.status == 'WAITING') {
            return (
                <View style={[globalStyles.UserQueueBox, { height: 500 }]}>
                    <Text style={globalStyles.h5}>Your Ticket Number</Text>
                    <Text style={globalStyles.h1}>{userQueue.queue_no}</Text>
                    <Text style={globalStyles.h5}>Location</Text>
                    <Text style={[globalStyles.h4, { fontFamily: 'RobotoBold' }]}>{userQueue.location}</Text>
                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                        <Text style={globalStyles.h5}>10 </Text>
                        <Text style={globalStyles.h5}>Patients in Waiting</Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                        <Text style={globalStyles.h5}>15 mins </Text>
                        <Text style={globalStyles.h5}>Extimated Watiting Time</Text>
                    </View>

                    {userQueue.location == 'CONSULTATION' && <SecondaryButton title='CANCEL QUEUE' action={() => navigation.navigate('Reason', { queueId: userQueue.id })} />}
                </View>
            );
        } else {
            return (
                <View style={[globalStyles.UserQueueBox, { height: 400 }]}>
                    <Text style={globalStyles.h3}>It's Your Turn!</Text>
                    <Text style={globalStyles.h5}>Your Ticket Number</Text>
                    <Text style={globalStyles.h1}>{userQueue.queue_no}</Text>
                    {userQueue.location == 'CONSULTATION'
                        ? <Text style={globalStyles.h5}>Room No</Text>
                        : <Text style={globalStyles.h5}>Counter No</Text>
                    }
                    <Text style={globalStyles.h1}>{userQueue.served_at}</Text>
                </View>
            );
        }
    }

    if (ready) {
        if (userQueue) {
            return (<QueueList />);
        } else {
            return (<NoQueue />);
        }
    } else {
        return (<AppLoading />);
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    modal: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 200
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    reason: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});