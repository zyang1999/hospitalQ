import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles';
import { MaterialIcons } from '@expo/vector-icons';

export default function PendingVerification() {
    return (
        <View style={[globalStyles.container_2, { paddingTop: '30%', alignItems:'center' }]}>
            <MaterialIcons name="pending-actions" size={200} color="black" />
            <Text style={globalStyles.h2}>VERIFYING...</Text>
            <Text style={globalStyles.h5}>Your Account will be verified by our staff. It will take 3 working days to complete.</Text>
        </View>
    );
}