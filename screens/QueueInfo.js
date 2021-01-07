import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
// import {styles} from '../styles';

export default function QueueInfo() {

    const [statusColor, setStatusColor] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.userQueue}>
                <Text style={{ fontSize: 30 }}>Your Ticket Number</Text>
                <Text style={{ fontSize: 50 }}>1001</Text>
                <Text style={{ fontSize: 15 }}>extimated Watiting Time: </Text>
                <Text style={{ fontSize: 15 }}>15 min </Text>
            </View>
            {/* <FlatList
                data={data}
                numColumns={2}
                renderItem={({ item }) => (
                    <View >
                        <Text >{item.title}</Text>
                    </View>
                  )}
                keyExtractor={item => item.id}
            /> */}
            <View style={{ flex: 0.4 }}>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueTitle}>Ticket Number</Text>
                    <Text style={styles.queueTitle}>Now Serving</Text>
                </View>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueNumber}>1001</Text>
                    <Text style={styles.queueNumber}>Serving</Text>
                </View>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueNumber}>1002</Text>
                    <Text style={styles.queueNumber}>Serving</Text>
                </View>
                <View style={styles.queueStatus}>
                    <Text style={styles.queueNumber}>1003</Text>
                    <Text style={styles.queueNumber}>Waiting</Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#0883ff'

    },
    userQueue: {
        flex: 0.5,
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: 'white'
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
        fontSize: 16,
        padding: 10,
        borderRadius: 20,
        textAlign: 'center',
        width: '48%',
        marginVertical: 5,
        textTransform: 'uppercase',
        backgroundColor: 'white'

    },
    queueNumber: {
        fontSize: 20,
        padding: 10,
        borderRadius: 20,
        textAlign: 'center',
        width: '48%',
        marginVertical: 5,
        textTransform: 'uppercase',
        backgroundColor: 'white'
    }
});