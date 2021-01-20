import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { PrimaryButton } from '../components/Button';
import Api from '../services/Api';
import { globalStyles } from '../styles';
import ErrorMessage from '../components/ErrorMessage';

export default function Feedback({ navigation, route }) {
    const [feedback, setFeedback] = useState(null);
    const [error, setError] = useState({});
    const queueId = route.params.queueId;

    const submitFeedback = () => {
        Api.request('storeFeedback', 'POST', { queueId: queueId, feedback: feedback }).then(response => {
            if(response.success){
                alert('Feedback submitted successfully');
                navigation.navigate('History', {refresh: true});
                route.params.setRefresh(true);
            }else{
                setError(response.message);
            }
        });
    }

    return (
        <View style={globalStyles.container_2}>
            <Text style={globalStyles.h5}>Please provide your feedback on the services you received from our hosptal.</Text>
            <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                editable
                placeholder='ex. Great!'
                onChangeText={feedback => setFeedback(feedback)}
            />
            {error.feedback && <ErrorMessage message={error.feedback} />}
            <PrimaryButton title='Submit Feedback' action={submitFeedback} />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 200,
        borderWidth: 1,
        textAlignVertical: 'top',
        borderRadius: 10,
        padding: 10
    }
});
