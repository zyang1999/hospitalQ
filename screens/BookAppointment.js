import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import api from '../services/Api';
import { globalStyles } from '../styles';

export default function BookAppointment() {

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [availableDate, setAvailableDate] = useState({});

    

    useEffect(() => {
        api.request('getAppointments', 'GET', {}).then(response =>{
            setAvailableDate(response.appointments);
            let dateObject = {};
            response.appointments.map(date=>{dateObject[date]= {disabled: false};});
            console.log(dateObject);
            setAvailableDate(dateObject);
        });
    }, [])

    return (
        <View style={globalStyles.container_2}>
            <Calendar
                current={date}
                markedDates={availableDate}
                disabledByDefault={true}
                onDayPress={(day) => { setDate(day.dateString) }}
            />
        </View>
    );
}