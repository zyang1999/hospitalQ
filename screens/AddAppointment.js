import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Loading from '../components/Loading';
import api from '../services/Api';
import { PrimaryButton } from '../components/Button';

export default function AddAppointment() {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [specialties, setSpecialties] = useState(null);
    const [specialtyId, setSpecialtyId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.request('getSpecialties', 'POST', {}).then(response => {
            setSpecialties(response.specialties);
            setLoading(false);
        });
    }, [])

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === 'ios');
        setDate(selectedDate);
        console.log(selectedDate);

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const SpecialtyPicker = () => (
        <View style={{ marginVertical: 10 }}>
            <Text>Specialty</Text>
            <Picker
                selectedValue={specialtyId}
                onValueChange={(id) => setSpecialtyId(id)}
            >
                <Picker.Item label='Please select a specialty' />
                {specialties.map(specialty =>
                    <Picker.Item label={specialty.specialty} value={specialty.id} key={specialty.id} />)}
            </Picker>
        </View>
    )

    const Button = (props) => (
        <TouchableOpacity
            style={styles.button}
            onPress={props.onPress}
        >
            <Text>{props.text}</Text>
        </TouchableOpacity>
    )

    if (!loading) {
        return (
            <View style={globalStyles.container_2}>
                <Text style={globalStyles.h5}>The time duration for every appointment is fixed which is 30 minutes.</Text>
                <Text>Appointment Date</Text>
                {date ? <Text>{date.toLocaleDateString()}</Text> : <Text></Text>}
                <Button text='PICK A DATE' onPress={showDatepicker} />
                <Text>Start at:</Text>
                {date ? <Text>{formatAMPM(date)}</Text> : <Text></Text>}
                <Button text='PICK A TIME' onPress={showTimepicker} />
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date ? date : new Date()}
                        mode={mode}
                        display="default"
                        onChange={onChange}
                    />
                )}
                <SpecialtyPicker />
                <PrimaryButton title='ADD APPOINTMENT' action={()=>console.log('added')}/>
            </View>
        );
    } else {
        return (<Loading />);
    }

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },

})