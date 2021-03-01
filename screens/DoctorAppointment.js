import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Loading from "../components/Loading";
import { Appointment } from "../components/Appointment";
import api from "../services/Api";
import { globalStyles } from "../styles";

export default function DoctorAppointment({ navigation, route }) {
    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        if (route.params?.appointmentId) {
            setLoading(true);
        }
        api.request("getDoctorAppointmentsToday", "GET", {}).then(
            (response) => {
                if (mounted) {
                    setAppointments(response.appointments);
                    setLoading(false);
                }
            }
        );
        return function cleanup() {
            mounted = false;
        };
    }, [route.params?.appointmentId]);

    const renderItem = ({ item }) => (
        <Appointment
            props={item}
            navigation={navigation}
            previousScreen="DoctorAppointment"
        />
    );

    const AppointmentList = () => (
        <FlatList
            data={appointments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );

    const AppointmentToday = () => {
        if (appointments.length != 0) {
            return (
                <View style={globalStyles.container_2}>
                    <Text style={styles.note}>
                        These are the appointments for today. You may click on
                        the appointment for further details.
                    </Text>
                    <View style={styles.appointmentTodayContainer}>
                        <View style={styles.appointmentContainer}>
                            <AppointmentList />
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "black" }}>
                            No Appointment Today
                        </Text>
                    </View>
                </View>
            );
        }
    };
    if (loading) {
        return <Loading />;
    } else {
        return (
            <View style={globalStyles.container_2}>
                <AppointmentToday />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "RobotoBold",
        marginVertical: 10,
    },
    note: {
        opacity: 0.5,
        marginBottom: 10,
    },
});
