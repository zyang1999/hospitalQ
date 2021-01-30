import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles';
import { Agenda } from 'react-native-calendars';
import Loading from '../components/Loading';
import api from '../services/Api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

export default function ManageAppointment({ navigation, route }) {

    const [allAppointments, setAllAppointments] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (route.params?.appointmentId) {
            setLoading(true);
        }
        api.request('getDoctorAppointments', 'GET', {}).then(response => {
            setAllAppointments(response.allAppointments);
            setLoading(false);
        })
    }, [route.params?.appointmentId])

    const getMarkedDate = () => {
        const markedDate = {};
        Object.keys(allAppointments).map(item => {
            if (allAppointments[item].includes(allAppointments[item][0], 0)) {
                markedDate[item] = { marked: true };
            }
        });
        return markedDate;
    }
    const getItem = () => {
        const itemObject = {};
        Object.keys(allAppointments).map(item => itemObject[item] = allAppointments[item]);
        return itemObject;
    }

    const renderItem = (item) => {
        return (
            <TouchableOpacity
                style={styles.agendaContainer}
                onPress={() => navigation.navigate('AppointmentDetails', {appointmentId: item.id})}
            >
                <View style={styles.appointmentInfoContainer}>
                    <Text style={{ fontFamily: 'RobotoBold' }}>{item.start_at + ' - ' + item.end_at}</Text>
                    <Text>{item.specialty}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name="location-pin" size={24} color="black" />
                        <Text>{item.location}</Text>
                    </View>

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
            </TouchableOpacity>
        );
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = 0; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!allAppointments[strTime]) {
                    allAppointments[strTime] = [];
                }
            }
            const newItems = {};
            Object.keys(allAppointments).forEach((key) => {
                newItems[key] = allAppointments[key];
            });

            setAllAppointments(newItems);
        }, 1000);
    };

    if (!loading) {
        return (
            <View style={globalStyles.container_2}>
                <Agenda
                    loadItemsForMonth={loadItems}
                    markedDates={getMarkedDate()}
                    pastScrollRange={50}
                    items={getItem()}
                    renderItem={renderItem}
                    renderEmptyData={() => { return (<Loading />); }}
                    renderEmptyDate={() => { return (<View style={{ height: 100, borderBottomWidth: 1, opacity: 0.2 }} />); }}
                />
                <View style={{ bottom: 0, right: 0, margin: 20, position: 'absolute' }}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('AddAppointment')}
                    >
                        <Text style={{ fontFamily: 'RobotoBold', color: 'white', fontSize: 30 }}>+</Text>
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
    addButton: {
        backgroundColor: '#42A5F5',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    }
})