import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import user from '../api/user';
// import {styles} from '../styles';


export default function Home({ route, navigation }) {

    return (
        <View style={styles.container}>
            <Text>Welcome, {JSON.stringify(user.first_name + user.last_name)}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('joinQueue')}
            >
                <Text style={{ color: 'white' }}>Join Queue</Text>
            </TouchableOpacity>
        </View>


    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#0786ed",
        padding: 10,
        marginHorizontal: 50,
        marginVertical: 30,
        borderRadius: 20,
        borderWidth: 2
    }
});
