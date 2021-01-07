import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { styles } from '../styles';

export default function Login({ navigation }) {

    const [feedback, setFeedback] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle}>Please leave your feedback on the services!</Text>
            <TextInput
                style={styles.input}
                placeholder='Feedback'
                onChangeText={(feedback) => setFeedback(feedback)}
            />

            <TouchableOpacity>
                <Text style={{ color: 'blue' }}>Send Feedback</Text>
            </TouchableOpacity>

        </View>
    );
}