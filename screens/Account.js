import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles';

export default function Account() {
    const [ready, setReady] = useState(true);

    if (ready) {
        return (
            <View style={globalStyles.container_2}>
                <Text style={styles.title}>Name</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>Ang Tiong Yang</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Email Address</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>atyzyang@gmail.com</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Telephone</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>012-345678</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Gender</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>Male</Text>
                </TouchableOpacity>
                <Text style={styles.title}>IC Number</Text>
                <TouchableOpacity>
                    <Text style={styles.text}>********9999</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
    }
}

const styles = StyleSheet.create({
    text:{
        fontSize: 14,
        fontFamily: 'RobotoRegular',
        paddingVertical: 5
    },
    title:{
        color: '#566573',
        marginTop: 15
    }
})