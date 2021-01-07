import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
// import {styles} from '../styles';

export default function doctorView() {

    return (
        <View style={styles.container}>
            <View style={styles.userQueue}>
                <Text style={{ fontSize: 30 }}>Current Patient: </Text>
                <Text style={{ fontSize: 50 }}>Name: Ang Tiong Yang</Text>
                <Text > IC Number: 00000000000001</Text>
            </View>
            <TouchableOpacity>
                <Text>Next Patient</Text>
            </TouchableOpacity>
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