import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { styles } from '../styles';

export default function Login({ navigation }) {

    const [feedback, setFeedback] = useState('');

    return (
        <View style={styles.container}>
            <Text>Feedback</Text>
        </View>
    );
}