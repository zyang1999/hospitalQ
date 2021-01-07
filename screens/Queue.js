import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import user from '../api/user';
import { createStackNavigator } from '@react-navigation/stack';
import { globalStyles } from '../styles';
import JoinQueue from './joinQueue';


export default function Queue({ route, navigation }) {
    const [queue, setQueue] = useState(null);

    const Queue = () => {
        if (queue) {
            return (
                <View style={styles.UserQueueBox}>
                    <Text style={{ fontSize: 30 }}>Your Ticket Number</Text>
                    <Text style={{ fontSize: 50 }}>1001</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                            <Text style={{ fontSize: 15 }}>10 </Text>
                            <Text style={{ fontSize: 15 }}>Patients in Waiting</Text>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center', margin: 10 }}>
                            <Text style={{ fontSize: 15 }}>15 mins </Text>
                            <Text style={{ fontSize: 15 }}>Extimated Watiting Time</Text>
                        </View>
                    </View>


                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('joinQueue')}
                    >
                        <Text style={{ color: 'white' }}>Quit Queue</Text>
                    </TouchableOpacity>

                </View>
            );
        } else {
            return (
                <View style={styles.UserQueueBox}>
                    <Text style={{ fontSize: 20 }}>You haven't join a Queue Yet</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('JoinQueue')}
                    >
                        <Text style={{ color: 'white', fontSize: 25 }}>Join Queue</Text>
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
        flex: 0.5,
        borderRadius: 40,
        height: 300
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
