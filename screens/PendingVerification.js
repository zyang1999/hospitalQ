import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../styles';

export default function PendingVerification(){
    return(
        <View style={globalStyles.container_2}>
            <Text>Your Account will be verified by our staff. It will take 3 working days to complete.</Text>
        </View>
    );
}