import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../styles';
import Api from '../api/api';


export default function Queue({ route, navigation }) {
    const [userQueue, setUserQueue] = useState(null);
    const [allQueue, setAllQueue] = useState(null);

    React.useEffect(() => {
        Api.request('getUserQueue', 'GET', {}).then(userQueue => setUserQueue(userQueue));
        Api.request('getAllQueue', 'GET', {}).then(allQueue => setAllQueue(allQueue));

        console.log(userQueue);
        console.log(allQueue);
    });

    const Queue = () => {
        if (queue) {
            return (
                <View style={styles.UserQueueBox}>
                    <Text style={globalStyles.h4}>Your Ticket Number</Text>
                    <Text style={globalStyles.h1}>1001</Text>
                    {/* <View style={{ flexDirection: 'row' }}> */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                        <Text style={globalStyles.h5}>10 </Text>
                        <Text style={globalStyles.h5}>Patients in Waiting</Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                        <Text style={globalStyles.h5}>15 mins </Text>
                        <Text style={globalStyles.h5}>Extimated Watiting Time</Text>
                    </View>
                    {/* </View> */}


                    <TouchableOpacity
                        onPress={() => navigation.navigate('joinQueue')}
                    >
                        <Text style={globalStyles.secondaryButton}>Quit Queue</Text>
                    </TouchableOpacity>

                </View>
            );
        } else {
            return (
                <View style={styles.UserQueueBox}>
                    <Text style={globalStyles.h4}>You haven't join a Queue Yet</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('JoinQueue')}
                    >
                        <Text style={globalStyles.primaryButton}>Join Queue</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    return (

        <ScrollView style={styles.container}>
            <Queue />
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Text style={globalStyles.h3}>Queue Status</Text>
            </View>
            <View style={{ flex: 0.3 }}>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueTitle}>Ticket Number</Text>
                    <Text style={styles.queueTitle}>Now Serving</Text>
                </View>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueNumber}>1001</Text>
                    <Text style={styles.serving}>Serving</Text>
                </View>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueNumber}>1002</Text>
                    <Text style={styles.serving}>Serving</Text>
                </View>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueNumber}>1003</Text>
                    <Text style={styles.waiting}>Waiting</Text>
                </View>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueNumber}>1004</Text>
                    <Text style={styles.waiting}>Waiting</Text>
                </View>
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        paddingHorizontal: 25,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#0786ed",
        padding: 10,
        marginTop: 30,
        borderRadius: 40,
        width: 200
    },
    UserQueueBox: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        height: 400
    },
    queueInfo: {
        marginVertical: 10,
        borderWidth: 2,
        borderRadius: 10
    },
    queueStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    queueTitle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        padding: 10,
        borderRadius: 20,
        textAlign: 'center',
        width: '48%',
        marginVertical: 10,
        textTransform: 'uppercase',
        backgroundColor: 'white'

    },
    queueNumber: {
        fontSize: 35,
        padding: 10,
        borderRadius: 20,
        textAlign: 'center',
        width: '48%',
        marginVertical: 5,
        textTransform: 'uppercase',
        backgroundColor: 'white'
    },
    serving: {
        fontSize: 20,
        padding: 10,
        borderRadius: 20,
        textAlign: 'center',
        width: '48%',
        marginVertical: 5,
        textTransform: 'uppercase',
        backgroundColor: '#58D68D'
    },
    waiting: {
        fontSize: 20,
        padding: 10,
        borderRadius: 20,
        textAlign: 'center',
        width: '48%',
        marginVertical: 5,
        textTransform: 'uppercase',
        backgroundColor: '#F4D03F'
    }
});
