import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../styles';
import Camera from './Camera';

export default function Selfie() {
    const [image, setImage] = useState(null);
    return (
        <View style={[globalStyles.container_2, { flex: 1, justifyContent: 'space-around'}]}>
            <Text style={globalStyles.h5}>Please take a selfie of yourself to verify you are the owner of the Indetification Card.</Text>
            {image
                ? <Image source={{ uri: image }} style={globalStyles.image} />
                : <View style={[globalStyles.image, { justifyContent: 'center', backgroundColor: '#CCD1D1' }]}>
                    <Text style={{ textAlign: 'center' }}>No photo is taken yet</Text>
                </View>
            }
            <TouchableOpacity
                onPress={() => Camera.pickImage().then(image => setImage(image))}
            >
                <Text style={[styles.button, { alignSelf: 'center' }]}>Take a Selfie</Text>
            </TouchableOpacity>
            <TouchableOpacity
            >
                <Text style={globalStyles.primaryButton}>Verify Account</Text>
            </TouchableOpacity>
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