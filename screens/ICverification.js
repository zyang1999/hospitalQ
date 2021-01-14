import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, TextInput, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { globalStyles } from '../styles';
import { RadioButton } from 'react-native-paper';
import Camera from './Camera';
import Api from '../api/api';
import { NavigationHelpersContext } from '@react-navigation/native';
export default function ICVerification({ navigation }) {
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [telephone, setTelephone] = useState(null);
    const [IC_no, setICNo] = useState(null);
    const [image, setImage] = useState(null);
    const [gender, setGender] = useState('Male');
    const [error, setError] = useState({});


    useEffect(() => {
        Camera.cameraPermission();
    }, []);


    const storeCredential = () => {
        let data = {
            first_name: first_name,
            last_name: last_name,
            telephone: telephone,
            IC_no: IC_no,
            IC_image: image,
            gender: gender ,
        };
        Api.request('storeVerificationCredential', 'POST', data).then(response => {
            if(response.success){
                navigation.navigate('Selfie');
            }else{
                console.log(response);
                setError(response.message);
            }
        });
    }

    return (
        <ScrollView style={globalStyles.container_2}>
            <Text>Please insert your personal information and verified yourself with your IC.</Text>
            <Text style={{ marginTop: 20 }}>First Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={first_name => setFirstName(first_name)}
                placeholder={'ex. John'}
            />
            {error.first_name && <Text style={globalStyles.errorMessage}>{error.first_name}</Text>}
            <Text>Last Name</Text>
            <TextInput
                style={globalStyles.input}
                onChangeText={last_name => setLastName(last_name)}
                placeholder={'ex. Joseph'}
            />
            {error.last_name && <Text style={globalStyles.errorMessage}>{error.last_name}</Text>}
            <Text>Telephone No</Text>
            <TextInput
                keyboardType='numeric'
                style={globalStyles.input}
                onChangeText={telephone => setTelephone(telephone)}
                placeholder={'ex. 012-45637282'}
            />
            {error.telephone && <Text style={globalStyles.errorMessage}>{error.telephone}</Text>}
            <Text>IC Number</Text>
            <TextInput
                keyboardType='numeric'
                style={globalStyles.input}
                onChangeText={IC_no => setICNo(IC_no)}
                placeholder={'ex. 010111-01-0111'}
            />
            {error.IC_no && <Text style={globalStyles.errorMessage}>{error.IC_no}</Text>}
            <Text>Gender</Text>
            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ marginRight: 45 }}>Male</Text>
                    <RadioButton
                        color='#2196F3'
                        value="Male"
                        status={gender === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('Male')}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ marginRight: 30 }}>Female</Text>
                    <RadioButton
                        color='#2196F3'
                        value="Female"
                        status={gender === 'Female' ? 'checked' : 'unchecked'}
                        onPress={() => setGender('Female')}
                    />
                </View>
            </View>
            <Text>IC Photo</Text>
            {image
                ? <Image source={{ uri: 'data:image/jpeg;base64,' + image }} style={globalStyles.image} />
                : <View style={[globalStyles.image, { justifyContent: 'center', backgroundColor: '#CCD1D1' }]}>
                    <Text style={{ textAlign: 'center' }}>No photo is taken yet</Text>
                </View>
            }
            {error.IC_image && <Text style={globalStyles.errorMessage}>{error.IC_image}</Text>}

            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => Camera.pickImage().then(image => setImage(image))}
            >
                {image
                    ? <Text style={styles.button}>Re-upload IC Photo</Text>
                    : <Text style={styles.button}>Upload IC Photo</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => storeCredential()}
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