import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../styles';
import Api from '../api/api';

export default function DoctorHome() {

    const getCurrentPatient = ()=>{
        Api.request('get')
    }

    return (
        <ScrollView style={globalStyles.scrollViewContainer} >
            <View style={[globalStyles.UserQueueBox, { height: 500 }]}>
                <Text style={globalStyles.h4}>Current Patient</Text>
                <Text style={globalStyles.h1}>1001</Text>
                <Text style={globalStyles.h3}>ANG TIONG YANG</Text>
                <Text style={globalStyles.h4}>123456-12-1234</Text>
                <Text style={globalStyles.h4}>CONCERN:</Text>
                <Text style={[globalStyles.h3]}>Headache</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('joinQueue')}
                >
                    <Text style={globalStyles.primaryButton}>NEXT PATIENT</Text>
                </TouchableOpacity>

            </View>
            <Text style={[globalStyles.h3, { textAlign: 'center', marginVertical: 20 }]}>Queue Status</Text>
            <View>
                <View style={globalStyles.queueStatus}>
                    <Text style={globalStyles.queueTitle}>Ticket Number</Text>
                    <Text style={globalStyles.queueTitle}>Now Serving</Text>
                </View>
                <View style={globalStyles.queueStatus}>
                    <Text style={globalStyles.queueNumber}>1001</Text>
                    <Text style={globalStyles.serving}>Serving</Text>
                </View>
                <View style={globalStyles.queueStatus}>
                    <Text style={globalStyles.queueNumber}>1002</Text>
                    <Text style={globalStyles.serving}>Serving</Text>
                </View>
                <View style={globalStyles.queueStatus}>
                    <Text style={globalStyles.queueNumber}>1003</Text>
                    <Text style={globalStyles.waiting}>Waiting</Text>
                </View>
                <View style={globalStyles.queueStatus}>
                    <Text style={globalStyles.queueNumber}>1004</Text>
                    <Text style={globalStyles.waiting}>Waiting</Text>
                </View>
            </View>
        </ScrollView>
    );
}