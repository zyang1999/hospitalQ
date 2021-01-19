import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles';

export default function QueueDetails({navigation, route}) {
    return (
        <View style={globalStyles.container_2}>
            <View style={styles.detailContainer}>
                <Text style={globalStyles.h5}>20-1-2021 11:59 pm</Text>
                <Text style={globalStyles.h4}>Queue Number: 1020</Text>
                <Text style={globalStyles.h4}>Location: CONSULTATION</Text>
                <Text style={globalStyles.h4}>Served by: Dr. Ang</Text>
                <Text style={globalStyles.h4}>Waiting Time: 10 minutes</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailContainer: {
        flex: 0.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10
    }
});