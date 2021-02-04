import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native';
import { globalStyles } from '../styles';
import { Picker } from '@react-native-picker/picker';
import { PrimaryButton, SecondaryButton } from '../components/Button';

import api from '../services/Api';

export default function MakeAppointment({ navigation }) {
    
    const [specialtyId, setSpecialty] = useState('All');
    const [doctorId, setDoctor] = useState('All');
    const [specialties, setSpecialties] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        api.request('getSpecialties', 'POST', { doctorId: doctorId }).then(response => {
            setSpecialties(response.specialties);
           
        });
        api.request('getDoctorList', 'POST', { specialtyId: specialtyId }).then(response => {
            setDoctors(response.doctors);
            setReady(true);
        });
    }, [specialtyId, doctorId])

    const DropDown = (props) => {
        return (
            <View>
                <Text style={globalStyles.h5}>{props.header}</Text>
                <Picker
                    selectedValue={props.initialValue}
                    style={styles.picker}
                    onValueChange={(id) => {
                        props.action(id);
                        setReady(false);
                    }}>
                    <Picker.Item label='All' value='All' />
                    {props.dropdown}
                </Picker>
            </View>
        );
    }

    const makeAppointment = () => {
        if (doctorId === 'All' && specialtyId === 'All') {
            alert('Please select a doctor and specialty before proceed to the next step.');
            return;
        }
        if (doctorId === 'All') {
            alert('Please select a doctor before proceed to the next step.');
        } else if (specialtyId === 'All') {
            alert('Please select a specialty before proceed to the next step.');
        } else {
            navigation.navigate('BookAppointment', { doctorId: doctorId });
        }
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
                <DropDown header='Specialties' initialValue={specialtyId} filter={doctorId} action={setSpecialty} dropdown={specialtyDropDown} />
                <DropDown header='Doctors' initialValue={doctorId} filter={specialtyId} action={setDoctor} dropdown={doctorDropDown} />
                <PrimaryButton title='NEXT' action={makeAppointment} />
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
    picker: {
        // backgroundColor: ''
    }
});