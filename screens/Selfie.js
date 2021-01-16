import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { globalStyles } from '../styles';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import Camera from '../services/Camera';
import Api from '../services/Api';

export default function Selfie({ navigation }) {
    const [image, setImage] = useState(null);
    const [error, setError] = useState({});
    const verify = () => {
        Api.request('storeSelfie', 'POST', { selfie: image, status: 'VERIFYING' }).then(response => {
            if (response.success) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'PendingVerification' }],
                });
            } else {
                setError(response.message);
                console.log(error);
            }
        });
    }

    const takePhoto = () => Camera.pickImage().then(image => setImage(image));

    return (
        <View style={[globalStyles.container_2, { flex: 1, justifyContent: 'space-around' }]}>
            <Text style={globalStyles.h5}>Please take a selfie of yourself to verify you are the owner of the Indetification Card.</Text>
            {image
                ? <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={globalStyles.image} />
                : <View style={[globalStyles.image, { justifyContent: 'center', backgroundColor: '#CCD1D1' }]}>
                    <Text style={{ textAlign: 'center' }}>No photo is taken yet</Text>
                </View>
            }
            {error.selfie && <Text>{error.selfie}</Text>}
            <SecondaryButton title='TAKE A SELFIE' action={takePhoto} />
            <PrimaryButton title='VERIFY ACCOUNT' action={verify} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        backgroundColor: '#29B6F6',
        paddingVertical: 10,
        textAlign: 'center',
        borderRadius: 20,
        width: 200,
        color: 'white'
    }
});