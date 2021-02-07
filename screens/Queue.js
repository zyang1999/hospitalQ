import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet, Image, TextInput } from 'react-native';
import { globalStyles } from '../styles';
import { PrimaryButton, DangerButton, SecondaryButton } from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';
import Modal from 'react-native-modal';
import Api from '../services/Api';
import Loading from '../components/Loading';
import messaging from '@react-native-firebase/messaging';

export default function Queue({ navigation, route }) {
    const [ready, setReady] = useState(false);
    const [userQueue, setUserQueue] = useState([]);
    const [allQueue, setAllQueue] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState([]);
    const [user, setUser] = useState(null);

    React.useEffect(() => {

        const getQueue = () => Api.request('getUserQueue', 'GET', {}).then(response => {
            setUser(response.user);
            setUserQueue(response.userQueue);
            if (response.userQueue) {
                Api.request('getAllQueue', 'GET', {}).then(response => {
                    setAllQueue(response.allQueue);
                    setReady(true);
                });
            } else {
                setReady(true);
            }
        });

        messaging().onMessage(async remoteMessage => {
            if (remoteMessage.data.type == 'refreshQueue') {
                setReady(false);
            }
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            if (remoteMessage.data.type == 'refreshQueue') {
                setReady(false);
            }
        });

        getQueue();

    }, [route.params?.queueId, ready]);

    const Doctor = () => {
        const doctor = userQueue.doctor;
        return (
            <View style={styles.card}>
                <Text style={{ fontFamily: 'RobotoBold', textAlign: 'center' }}>Your Doctor</Text>
                <Image style={{ width: 70, height: 70, borderRadius: 100, alignSelf: 'center', marginTop: 10 }} source={{ uri: doctor.selfie_string }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View>
                        <Text style={styles.title}>Name</Text>
                        <Text style={styles.details}>DR. {doctor.full_name}</Text>
                    </View>
                    <View>
                        <Text style={styles.title}>Specialty</Text>
                        <Text style={styles.details}>{userQueue.specialty}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const Profile = () => (
        <View style={styles.profileContainer}>
            <View style={{ flex: 3 }}>
                <Image style={{ width: 70, height: 70, borderRadius: 100 }} source={{ uri: user.selfie_string }} />
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

    const CancelModal = () => {
        var reason = '';
        return (
            <Modal
                isVisible={isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <View>
                        <Text styles={globalStyles.h5}>Please provide your reason to cancel the queue.</Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={styles.input}
                            onChangeText={text => reason = text}
                        />
                        {error.feedback && <ErrorMessage message={error.feedback} />}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <DangerButton title='CANCEL' action={() => cancelQueue(reason)} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <SecondaryButton title='BACK' action={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    const cancelQueue = (reason) => {
        Api.request('cancelQueue', 'POST', { queueId: userQueue.id, feedback: reason }).then(response => {
            if (response.success) {
                setModalVisible(false);
                alert(response.message);
                setReady(false);
            } else {
                setError(response.message);
            }
        })
    }

    const QueueList = () => (
        <FlatList
            style={globalStyles.container_2}
            data={allQueue}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View>
                    <CancelModal />
                    <Profile />
                    {userQueue.specialty != 'Phamarcy'
                        ? <View>
                            <Queue />
                            <Doctor />
                        </View>
                        : <PhamarcyQueue />
                    }

                    <Text style={[globalStyles.h3, { textAlign: 'center', marginVertical: 20 }]}>Queue List</Text>
                    <View style={globalStyles.queueStatus}>
                        <Text style={globalStyles.queueTitle}>Ticket Number</Text>
                        <Text style={globalStyles.queueTitle}>Now Serving</Text>
                    </View>
                    {allQueue.length == 0 &&
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <Text>No patient is waiting</Text>
                        </View>
                    }
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
                    <PrimaryButton title='JOIN QUEUE' action={() => navigation.navigate('JoinQueue')} />
                </View>
            </View>
        );
    }

    const Queue = () => {
        return (
            <View style={[globalStyles.UserQueueBox]}>
                {userQueue.status == 'SERVING' && <Text style={globalStyles.h2}>It's Your Turn!</Text>}
                <Text style={styles.title}>Your Ticket Number</Text>
                <Text style={globalStyles.h1}>{userQueue.queue_no}</Text>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>Room No</Text>
                    <Text style={globalStyles.h2}>{userQueue.location}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 20 }}>
                        <View>
                            <Text style={styles.title}>Specialty</Text>
                            <Text style={styles.details}>{userQueue.specialty}</Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Patients in Waiting</Text>
                            <Text style={styles.details}>{userQueue.number_of_patients} </Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.title}>Concern</Text>
                            {userQueue.concern != null
                                ? <Text style={styles.details}>{userQueue.concern}</Text>
                                : <Text>None</Text>
                            }
                        </View>
                        <View>
                            <Text style={styles.title}>Extimated Served At</Text>
                            <Text style={styles.details}>{userQueue.time_range}</Text>
                        </View>
                    </View>
                </View>
                {userQueue.status == 'WAITING' &&
                    <View style={{ marginTop: 20 }}>
                        <DangerButton title='CANCEL QUEUE' action={() => setModalVisible(true)} />
                    </View>
                }
            </View>
        );
    }

    const PhamarcyQueue = () => {
        return (
            <View style={[globalStyles.UserQueueBox]}>
                {userQueue.status == 'SERVING' && <Text style={globalStyles.h2}>It's Your Turn!</Text>}
                <Text style={styles.title}>Your Ticket Number</Text>
                <Text style={globalStyles.h1}>{userQueue.queue_no}</Text>

                {userQueue.status == 'SERVING' &&
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.title}>Counter No</Text>
                        <Text style={globalStyles.h2}>{userQueue.location}</Text>
                    </View>
                }
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 20 }}>
                        <View>
                            <Text style={styles.title}>Patients in Waiting</Text>
                            <Text style={styles.details}>{userQueue.number_of_patients} </Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.title}>Extimated Served At</Text>
                            <Text style={styles.details}>{userQueue.time_range}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
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
        elevation: 4,
        backgroundColor: 'white',
        marginHorizontal: 5,
        padding: 10,
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 10
    },
    title: {
        fontFamily: 'RobotoBold',
        marginTop: 10
    },
    details: {
        marginTop: 10,
        fontSize: 15
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        textAlignVertical: 'top',
        padding: 10
    },
    card: {
        backgroundColor: 'white',
        elevation: 5,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        marginTop: 10
    }
});