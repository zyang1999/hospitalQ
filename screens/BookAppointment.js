import React, { useState, useEffect } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import api from '../services/Api';
import { globalStyles } from '../styles';

export default function BookAppointment({navigation}) {

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [availableDate, setAvailableDate] = useState({});
    const [schedule, setSchedule] = useState([]);
    const [ready, setReady] = useState(false);


    useEffect(() => {
        api.request('getAvailableDate', 'GET', {}).then(response => {
            setAvailableDate(response.appointments);
            setReady(true);
        });
    }, [ready])

    const selectDate = (date) => {
        setDate(date.dateString);
        api.request('getSchedule', 'POST', { date: date.dateString }).then(response => {
            setSchedule(response.schedules);
        });
    }

    const getMarkedDate = () => {
        const dateObject = {};
        availableDate.map(item => { dateObject[item] = { disabled: false }; });
        dateObject[date] = { selected: true, selectedColor: 'blue' };
        return dateObject;
    }

    const bookAppointment = (appointmentId) => {
        api.request('bookAppointment', 'POST', {appointmentId: appointmentId}).then(response =>{
            if(response.success){
                navigation.navigate('Appointment');
                alert('Appointment is booked successfully');
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

    const renderItem = ({ item }) => (
        <View style={styles.scheduleContainer}>
            <View>
                <Text style={globalStyles.h4}>{item.duration}</Text>
            </View>
            <View>
                {item.status == 'AVAILABLE'
                    ? <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() => bookAppointment(item.id)}
                    >
                        <Text style={styles.text}>Book</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity
                        disabled
                        style={styles.bookedButton}
                    >
                        <Text style={styles.text}>Booked</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )

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
                <ActivityIndicator size="large" color="#0000ff" />
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