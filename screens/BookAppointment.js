import React, { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import api from '../services/Api';
import { globalStyles } from '../styles';
import { Entypo } from '@expo/vector-icons';
import Loading from '../components/Loading';

export default function BookAppointment({ navigation, route }) {

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [availableDate, setAvailableDate] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [ready, setReady] = useState(false);
    const [scheduleLoading, setSchdeuleLoading] = useState(false);

    const doctorId = route.params.doctorId;
    const concern = route.params.concern;

    useEffect(() => {
        api.request('getAvailableDate', 'POST', { doctorId: doctorId }).then(response => {
            setAvailableDate(response.appointments);
            setReady(true);
        });
    }, [])

    const selectDate = (date) => {
        setSchdeuleLoading(true);
        setDate(date.dateString);
        api.request('getSchedule', 'POST', { date: date.dateString, doctorId: doctorId }).then(response => {
            setSchedule(response.schedules);
            setSchdeuleLoading(false);
        });
    }

    const getMarkedDate = () => {
        const dateObject = {};
        availableDate.map(item => { dateObject[item] = { disabled: false }; });
        dateObject[date] = { selected: true, selectedColor: '#42A5F5' };
        console.log(dateObject);
        return dateObject;
    }

    const bookAppointment = (appointmentId) => {
        api.request('bookAppointment', 'POST', { appointmentId: appointmentId, concern: concern }).then(response => {
            if (response.success) {
                alert('Appointment is booked successfully');
                navigation.navigate('Appointment', { appointmentId: appointmentId });
            }
        })
    }

    const Schedule = () => (
        <FlatList
            data={schedule}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    )

    const renderItem = ({ item }) => {
        if (scheduleLoading) {
            return (<Loading />);
        } else {
            return (
                <View style={styles.scheduleContainer}>
                    <View>
                        <Text style={globalStyles.h4}>{item.start_at + ' - ' + item.end_at}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="location-pin" size={24} color="black" />
                            <Text>{item.location}</Text>
                        </View>

                    </View>
                    <View>
                        {item.status == 'AVAILABLE'
                            ? <TouchableOpacity
                                style={styles.bookButton}
                                onPress={() => bookAppointment(item.id)}
                            >
                                <Text style={styles.text}>BOOK</Text>
                            </TouchableOpacity>
                            : <TouchableOpacity
                                disabled
                                style={styles.bookedButton}
                            >
                                <Text style={styles.text}>BOOKED</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            )
        }
    }

    if (ready) {
        return (
            <View style={globalStyles.container_2}>
                <Calendar
                    current={date}
                    markedDates={getMarkedDate()}
                    disabledByDefault={true}
                    disableAllTouchEventsForDisabledDays={true}
                    onDayPress={(day) => selectDate(day)}
                />
                <Text style={[globalStyles.h3, { textAlign: 'center' }]}>Schedule List</Text>
                <Schedule />
            </View>
        );
    } else {
        return (
            <View style={[globalStyles.container_2, { justifyContent: 'center' }]}>
                <ActivityIndicator size="large" color="#42A5F5" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scheduleContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bookButton: {
        backgroundColor: '#42A5F5',
        padding: 10,
        borderRadius: 10
    },
    bookedButton: {
        backgroundColor: '#808B96',
        padding: 10,
        borderRadius: 10
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'RobotoBold'
    }
});