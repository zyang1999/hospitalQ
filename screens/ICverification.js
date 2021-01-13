import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, TextInput, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../styles';
import { RadioButton } from 'react-native-paper';
import Camera from './Camera';
import Api from '../api/api';
export default function ICVerification({ navigation }) {
    const [ICNo, setICNo] = useState('');
    const [image, setImage] = useState(null);
    const [checked, setChecked] = useState('first');

    useEffect(() => {
        Camera.cameraPermission();
    }, []);

    return (
        <ScrollView style={globalStyles.container_2}>
            <Text>Please insert your personal information and verified yourself with your IC.</Text>
            <Text style={{ marginTop: 20 }}>First Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={IcNo => setICNo(ICNo)}
                placeholder={'ex. John'}
            />
            <Text>Last Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={IcNo => setICNo(ICNo)}
                placeholder={'ex. Joseph'}
            />
            <Text>Telephone No</Text>
            <TextInput
                keyboardType='numeric'
                style={globalStyles.input}
                onChangeText={IcNo => setICNo(ICNo)}
                placeholder={'ex. 012-45637282'}
            />
            <Text>IC Number</Text>
            <TextInput
                keyboardType='numeric'
                style={globalStyles.input}
                onChangeText={IcNo => setICNo(ICNo)}
                placeholder={'ex. 010111-01-0111'}
            />
            <Text>Gender</Text>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ marginRight: 45 }}>Male</Text>
                    <RadioButton
                        color='#2196F3'
                        value="Male"
                        status={checked === 'first' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('first')}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ marginRight: 30 }}>Female</Text>
                    <RadioButton
                        color='#2196F3'
                        value="Female"
                        status={checked === 'second' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('second')}
                    />
                </View>
            </View>
            <Text>IC Photo</Text>
            {image
                ? <Image source={{ uri: image }} style={styles.image} />
                : <View style={[globalStyles.image,{justifyContent: 'center', backgroundColor: '#CCD1D1'}]}>
                    <Text style={{ textAlign: 'center' }}>No photo is taken yet</Text>
                </View>
            }

            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => Camera.pickImage().then(image => setImage(image))}
            >
                {image
                    ? <Text style={styles.button}>Retake IC Photo</Text>
                    : <Text style={styles.button}>Take IC Photo</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Selfie')}
            >
                <Text style={[globalStyles.primaryButton, { marginBottom: 50 }]}>Next</Text>
            </TouchableOpacity>

        </ScrollView >
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
    },

});