import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { globalStyles } from '../styles';
import { SecondaryButton } from '../components/Button';
import Api from '../services/Api';

export default function Reason({route}) {
    const [reason, setReason] = useState('');
    let reasonList = [
        'Waited for too long',
        'Have another plan'
    ];
    const cancelQueue = () => {
        let data = {
            queueId: route.params.queueId,
            reason: reason
        }
        Api.request('cancelQueue', 'POST', {data}).then(navigation.navigate('Queue' ))
    }

    return (
        <View style={globalStyles.container_2}>
            <View style={styles.reason}>
                <RadioButton
                    value={reasonList[0]}
                    status={reason === reasonList[0] ? 'checked' : 'unchecked'}
                    onPress={() => setReason(reasonList[0])}
                />
                <Text style={globalStyles.h4}>{reasonList[0]}</Text>
            </View>
            <View style={styles.reason}>
                <RadioButton
                    value={reasonList[1]}
                    status={reason === reasonList[1] ? 'checked' : 'unchecked'}
                    onPress={() => setReason(reasonList[1])}
                />
                <Text style={globalStyles.h4}>{reasonList[1]}</Text>
            </View>
            <View style={styles.reason}>
                <RadioButton
                    value=''
                    status={reason === '' ? 'checked' : 'unchecked'}
                    onPress={() => setReason('')}
                />
                <TextInput style={styles.others} placeholder='Others' onChangeText={text => setReason(text)} />
            </View>
            <SecondaryButton title='LEAVE QUEUE' action={cancelQueue} />
        </View>
    );
}

const styles = StyleSheet.create({
    reason: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    others: {
        fontSize: 20
    }
})