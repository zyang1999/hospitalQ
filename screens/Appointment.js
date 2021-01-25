import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/Api';
import { globalStyles } from '../styles';

export default function Appointment({navigation}) {

    const [appointment, setAppointment] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        api.request('getAppointment', 'GET', {}).then(response => {
            setAppointment(response.appointments)
            setReady(true);
        });
    }, [ready]);

    const renderItem = ({ item }) => (
        <View style={styles.appointmentContainer}>
            <Text>{item.date}</Text>
            <Text>{item.duration}</Text>
            <Text>DR. {item.user.first_name + ' ' + item.user.last_name}</Text>
            <Text>{item.user.specialties[0].specialty}</Text>
        </View>
    )

    const AppointmentList = () => {
        if (appointment) {
            return (
                <FlatList
                    data={appointment}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            );

        } else {
            return (
                <View style={styles.appointmentContainer}>
                    <Text>No Appointment</Text>
                </View>
            );
        }
    }

    if (ready) {
        return (
            <View style={[globalStyles.container_2]}>
                <AppointmentList />
                <View style={styles.addbuttonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={()=>navigation.navigate('MakeAppointment')}
                    >
                        <Text style={styles.add}>+</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    } else {
        return (<View></View>);
    }


}

const styles = StyleSheet.create({
    appointmentContainer: {
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
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center'
    },
    addbuttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 20
    },
    addButton: {
        backgroundColor: '#42A5F5',
        borderRadius: 100,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    add: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'RobotoBold'
    }
});