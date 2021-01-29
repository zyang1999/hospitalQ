import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles';
import { Calendar, Agenda } from 'react-native-calendars';
import Loading from '../components/Loading';
import api from '../services/Api';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ManageAppointment({navigation}) {

    const [allAppointments, setAllAppointments] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.request('getDoctorAppointments', 'GET', {}).then(response => {
            setAllAppointments(response.allAppointments);
            setLoading(false);
        })
    }, [])

    const getMarkedDate = () => {
        const markedDate = {};
        Object.keys(allAppointments).map(item => { markedDate[item] = { marked: true }; });
        return markedDate;
    }
    const getItem = () => {
        const itemObject = {};
        Object.keys(allAppointments).map(item => itemObject[item] = allAppointments[item]);
        return itemObject;
    }

    const renderItem = (item) => {
        return (
            <View style={styles.agendaContainer}>
                <View style={styles.appointmentInfoContainer}>
                    <Text style={{ fontFamily: 'RobotoBold' }}>{item.start_at + ' - ' + item.end_at}</Text>
                    <Text>{item.specialty}</Text>
                    <Text>{item.location}</Text>
                    {item.status != 'AVAILABLE' &&
                        <View>
                            <Text>Booked By: </Text>
                            <Text>{item.patient.first_name + ' ' + item.patient.last_name}</Text>
                        </View>
                    }
                </View>
                <View style={[styles.statusContainer, item.status == 'AVAILABLE' ? { backgroundColor: '#A5D6A7' } : { backgroundColor: '#FFE082' }]}>
                    <Text>{item.status}</Text>
                </View>
            </View>
        );
    }

    if (!loading) {
        return (
            <View style={globalStyles.container_2}>
                <Agenda
                    selected={new Date().toISOString().split('T')[0]}
                    markedDates={getMarkedDate()}
                    items={getItem()}
                    renderItem={renderItem}
                />
                <View style={{ bottom: 0, right: 0, margin: 20, position: 'absolute' }}>
                    <TouchableOpacity
                        style= {styles.addButton}
                        onPress = {()=>navigation.navigate('AddAppointment')}
                    >
                        <Text style={{fontFamily: 'RobotoBold', color: 'white', fontSize: 30}}>+</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    } else {
        return (<Loading />);
    }
}

const styles = StyleSheet.create({
    agendaContainer: {
        backgroundColor: 'white',
        height: 100,
        margin: 10,
        borderRadius: 10,
        padding: 10,
        elevation: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    statusContainer: {
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center'
    },
    appointmentInfoContainer: {
        flex: 2
    },
    addButton:{
        backgroundColor: '#42A5F5',
        height: 50,
        width: 50, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    }
})