import React, {useState} from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import {globalStyles} from '../styles';

export default function Pharmacy(){
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>It's Your Turn!</Text>
            <Image
                style={styles.consultationImage}
                source={require('../assets/pharmacy.jpg')}
            />
            <View style = {styles.InfoLayout}>
                <Text style={styles.h3}>Get Your Medicine at Following Counter!</Text>
                <Text style={styles.h2}>Counter Number</Text>
                <Text style={styles.Info}>02</Text>
            </View>
            
            
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        paddingTop: 100,
        paddingHorizontal: 20,
        backgroundColor: '#5DADE2',
        
    },
    consultationImage:{
        width: '50%',
        height: '50%',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    h1:{
        fontSize: 45,
        textAlign: 'center',
    },
    InfoLayout:{
        alignItems: 'center'
    },
    h2:{
        fontSize: 25,
        borderRadius: 20,
        padding: 10,
        textAlign: 'center',        
    },
    Info:{
        fontSize: 45,
        backgroundColor: '#EBF5FB',
        borderRadius: 20,
        padding: 10,  
        width: '60%',
        textAlign: 'center',
        textTransform: 'uppercase'
    }
});
