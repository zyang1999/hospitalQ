import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function ICVerification() {
    const [ICNo, setICNo] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                placeholder='Your IC Number'
                onChangeText={IcNo => setICNo(ICNo)}
            />
            {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />}
            <TouchableOpacity
                onPress={pickImage}
            >
                <Text>Upload an image of your IC picture</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
    
    }
})