import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { globalStyles } from '../styles';

export default function Loading() {
    return (
        <View style={[globalStyles.container_2, { justifyContent: 'center' }]}>
            <ActivityIndicator size="large" color="#42A5F5" />
        </View>
    );
}