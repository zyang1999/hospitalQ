import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalStyles } from '../styles';
import { Agenda } from 'react-native-calendars';
import Loading from '../components/Loading';
import api from '../services/Api';
import { Appointment } from "../components/Appointment";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

export default function ManageAppointment({ navigation, route }) {
    const currentDate = new Date().getTime();
    const [allAppointments, setAllAppointments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (route.params?.appointmentId) {
            setLoading(true);
        }
        api.request('getDoctorAppointments', 'GET', {}).then(response => {
            loadItems(currentDate, response.allAppointments);
        })
    }, [route.params?.appointmentId, refresh])

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

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    };

    const renderItem = (item) => {
        return (
            <Appointment
                props={item}    
                navigation={navigation}
            />
        );
    }

    const loadItems = (day, allAppointments) => {
        setTimeout(() => {
            for (let i = 0; i < 85; i++) {
                const time = day + i * 24 * 60 * 60 * 1000;
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
            setLoading(false);
            setRefresh(false);
        }, 1000);
    };

    if (!loading) {
        return (
            <View style={globalStyles.container_2}>
                <Agenda
                    selected={'2021-01-31'}
                    loadItemsForMonth={() => loadItems(currentDate, allAppointments)}
                    markedDates={getMarkedDate()}
                    pastScrollRange={50}
                    items={getItem()}
                    renderItem={renderItem}
                    onRefresh={() => { setRefresh(true); }}
                    refreshing={refresh}
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