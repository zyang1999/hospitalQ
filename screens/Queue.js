import React, { useState } from 'react';
import { Text, View, FlatList, Modal, StyleSheet, Image } from 'react-native';
import { globalStyles } from '../styles';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import Api from '../services/Api';
import Loading from '../components/Loading';
import CountDown from 'react-native-countdown-component';


export default function Queue({ navigation, route }) {
    const [ready, setReady] = useState(false);
    const [user, setUser] = useState(null);
    const [userQueue, setUserQueue] = useState(null);
    const [allQueue, setAllQueue] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [timeRange, setTimeRange] = useState(null);

    React.useEffect(() => {
        Api.request('getUserQueue', 'GET', {}).then(response => {
            setUser(response.user);
            setUserQueue(response.userQueue);
            setProfileImage(response.profileImage);
            if (response.userQueue) {
                Api.request('getAverageWaitingTime', 'POST', {specialty: userQueue.location}).then(response => {
                    setTimeRange(response.timeRange);
                    Api.request('getAllQueue', 'GET', {}).then(response => {
                        console.log(response);
                        setAllQueue(response.allQueue);
                        setReady(true);
                    });                 
                });
            } else {
                setReady(true);
            }
        });
    }, [route.params?.queueId]);

    const Profile = () => (
        <View style={styles.profileContainer}>
            <View style={{ flex: 3 }}>
                <Image style={{ width: 70, height: 70, borderRadius: 100 }} source={{ uri: 'data:image/png;base64,' + profileImage }} />
            </View>
            <View style={{ flex: 7 }}>
                <Text>Welcome Back,</Text>
                <Text style={[globalStyles.h4]}>{user.first_name + ' ' + user.last_name}</Text>
            </View>
        </View>
    )

    const renderItem = ({ item }) =>
    (
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
                    <Profile />
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
                <Profile />
                <View style={[globalStyles.UserQueueBox, { flex: 0.6 }]}>
                    <Text style={globalStyles.h4}>You haven't join a Queue Yet</Text>
                    <PrimaryButton title='JOIN QUEUE' action={() => navigation.navigate('JoinQueue', { setReady: (value) => setReady(value) })} />
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
                        <Text style={globalStyles.h5}>{allQueue.length} </Text>
                        <Text style={globalStyles.h5}>Patients in Waiting</Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                        <Text>{timeRange}</Text>
                        <Text style={globalStyles.h5}>Extimated Served At</Text>
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
        return (<Loading />);
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        flex: 0.15,
        flexDirection: 'row',
        alignItems: 'center'
    }
});