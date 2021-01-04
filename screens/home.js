import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
// import {styles} from '../styles';


export default function Home({navigation}) {

    return(
        <View style={styles.container}>
            
            <TouchableOpacity
                style={styles.button}
                onPress={()=>navigation.navigate('joinQueue')}
            >
                <Text style={{color: 'white'}}>Join Queue</Text>
            </TouchableOpacity>
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#0786ed",
        padding: 10,
        marginHorizontal: 50,
        marginVertical: 30,
        borderRadius: 20,
        borderWidth:2
    }
});
