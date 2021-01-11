import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles';
import Api from '../api/api';
import AppLoading from 'expo-app-loading';


export default function Queue({ route, navigation }) {
    const [ready, setReady] = useState(false);
    const [userQueue, setUserQueue] = useState(null);
    const [allQueue, setAllQueue] = useState(null);

    React.useEffect(() => {
        Api.request('getUserQueue', 'GET', {}).then(response => {
            setUserQueue(response.userQueue);
            setAllQueue(response.allQueue);
            setReady(true)
        });
    }, []);

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

    const Queue = () => {
        if (userQueue) {
            if (userQueue.status == 'WAITING') {
                return (
                    <View style={globalStyles.container_2}>
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
                            {userQueue.location == 'CONSULTATION'
                                ? <TouchableOpacity
                                    onPress={() => navigation.navigate('joinQueue')}
                                >
                                    <Text style={globalStyles.secondaryButton}>Quit Queue</Text>
                                </TouchableOpacity>
                                : null
                            }
                        </View>
                        <QueueList />
                    </View>
                );
            } else {
                return (
                    <View style={globalStyles.container_2}>
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
                        <QueueList />
                    </View>
                );
            }

        } else {
            return (
                <View style={globalStyles.container_2}>
                    <View style={[globalStyles.UserQueueBox, { height: 200 }]}>
                        <Text style={globalStyles.h4}>You haven't join a Queue Yet</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('JoinQueue')}
                        >
                            <Text style={globalStyles.primaryButton}>Join Queue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.UserQueueBox}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={globalStyles.h5}>Patient Wating</Text>
                            <Text style={globalStyles.h2}>25</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={globalStyles.h5}>Average Waiting Time</Text>
                            <Text style={globalStyles.h2}>25 min</Text>
                        </View>
                    </View>
                    <View style={globalStyles.UserQueueBox}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={globalStyles.h5}>Patient Wating</Text>
                            <Text style={globalStyles.h2}>25</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={globalStyles.h5}>Average Waiting Time</Text>
                            <Text style={globalStyles.h2}>25 min</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }

    if (ready) {
        return (<Queue />);
    } else {
        return (<AppLoading />);
    }
}