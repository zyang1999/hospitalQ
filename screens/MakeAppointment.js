import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native';
import { globalStyles } from '../styles';
import { Picker } from '@react-native-picker/picker';
import { PrimaryButton, SecondaryButton } from '../components/Button';
import { Calendar } from 'react-native-calendars';
import api from '../services/Api';

export default function MakeAppointment() {

    const [specialties, setSpecialties] = useState({});
    const [doctors, setDoctor] = useState({});
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        api.request('getSpecialties', 'GET', {}).then(response => {
            setSpecialties(response.specialties);
        });

        api.request('getDoctorList', 'GET', {}).then(response=>{
            setDoctor(response.doctors);
            setReady(true);
        });

    }, [])

    const data = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];


    const DropDown = (props) => {
        return (
            <View>
                <Text style={globalStyles.h5}>{props.header}</Text>
                <Picker
                    selectedValue={props.initialValue}
                    style={styles.picker}
                    onValueChange={(itemValue) => props.action(itemValue)}>
                    <Picker.Item label="All" value="All" />
                    {props.dropdown}
                </Picker>
            </View>
        );
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <Text>{item.title}</Text>
            </View>
        );
    }

    const Schedule = () => {
        return (
            <TouchableWithoutFeedback>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </TouchableWithoutFeedback>
        );
    }

    if (ready) {
        const specialtyDropDown = specialties.map((item) => {
            return (<Picker.Item label={item.specialty} value={item.id} key={item.id} />);
        });

        const doctorDropDown = doctors.map((item) => {
            return (<Picker.Item label={'Dr. ' + item.first_name + item.last_name} value={item.id} key={item.id} />);
        });
        return (
            <View style={globalStyles.container_2}>
                <DropDown header='Department' initialValue={'All'} action={setSpecialties} dropdown={specialtyDropDown} />
                <DropDown header='Doctor' initialValue={'All'} action={setDoctor} array={doctors} dropdown={doctorDropDown} />
                <Text>Appointment Date</Text>
                <Calendar
                    markedDates={{
                        [date]: { selected: true, selectedColor: 'blue' },
                    }}
                    onDayPress={(day) => { setDate(day.dateString) }}
                />
                <Schedule />
            </View>

        );
    } else {
        return (<View></View>)
    }


}

const styles = StyleSheet.create({
    picker: {
        // backgroundColor: ''
    }
});