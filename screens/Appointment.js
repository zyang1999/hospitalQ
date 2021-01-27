import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../services/Api';
import { globalStyles } from '../styles';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function Appointment({ navigation, route }) {

    const [appointment, setAppointment] = useState(null);
    const [appointmentToday, setAppointmentToday] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        api.request('getAppointment', 'GET', {}).then(response => {
            console.log(response);
            setAppointmentToday(response.appointmentToday);
            setAppointment(response.appointments);
            setReady(true);
        });
    }, [route.params?.appointmentId]);

    const AppointmentItem = (props) => (
        <View style={styles.appointmentContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <MaterialIcons name="date-range" size={24} color="black" />
                <Text style={{ fontSize: 15 }}>{props.date}</Text>
            </View>
            <Text style={{ fontSize: 20, fontFamily: 'RobotoBold', marginBottom: 5 }}>{props.start_at + ' - ' + props.end_at}</Text>
            <Text style={{ fontSize: 15, marginBottom: 5 }}>DR. {props.first_name + ' ' + props.last_name}</Text>
            <Text style={{ fontSize: 15, marginBottom: 5 }}>{props.specialty}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Entypo name="location-pin" size={24} color="black" />
                <Text style={{ fontSize: 15 }}>{props.location}</Text>
            </View>

        </View>
    )

    const renderItem = ({ item }) => (
        <AppointmentItem
            date={item.date}
            start_at={item.start_at}
            end_at={item.end_at}
            first_name={item.user.first_name}
            last_name={item.user.last_name}
            specialty={item.user.specialty.specialty}
            location={item.location}
        />
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

    const AppointmentToday = () => {
        if (appointmentToday) {
            return (
                <AppointmentItem
                    date={appointmentToday.date}
                    start_at={appointmentToday.start_at}
                    end_at={appointmentToday.end_at}
                    first_name={appointmentToday.user.first_name}
                    last_name={appointmentToday.user.last_name}
                    specialty={appointmentToday.user.specialty.specialty}
                    location={appointmentToday.location}
                />
            );
        } else {
            return (
                <View style={[styles.appointmentContainer, { flex:1, alignItems: 'center', justifyContent: 'center' }]}>
                    <Text>No Appointment Today</Text>
                </View>
            );
        }

    }

    if (ready) {
        return (
            <View style={[globalStyles.container_2]}>
                <View style={{ flex: 5 }}>
                    <Text style={styles.appointmentListTitle}>Appointment Today</Text>
                    <AppointmentToday />
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={styles.appointmentListTitle}>Appointment List</Text>
                    <AppointmentList />
                </View>
                <View style={styles.addbuttonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('MakeAppointment')}
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
    appointmentListTitle: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10
    },
    appointmentTodayContainer: {
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
        flex: 2,
    },
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