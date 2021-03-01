import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import api from "../services/Api";
import { globalStyles } from "../styles";
import Loading from "../components/Loading";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function Appointment({ navigation, route }) {
    const [appointment, setAppointment] = useState([]);
    const [appointmentToday, setAppointmentToday] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let mounted = true;
        api.request("getAppointment", "GET", {}).then((response) => {
            if (mounted) {
                setAppointmentToday(response.appointmentToday);
                setAppointment(response.appointments);
                setReady(true);
            }
        });
        return function cleanup() {
            mounted = false
        }
    }, [route.params?.appointmentId]);

    const AppointmentItem = ({ item }) => (
        <TouchableOpacity
            style={styles.agendaContainer}
            onPress={() =>
                navigation.navigate("AppointmentDetails", {
                    appointmentId: item.id,
                    previousScreen: "Appointment",
                })
            }
        >
            <View style={styles.appointmentInfoContainer}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <MaterialIcons name="date-range" size={24} color="black" />
                    <Text style={{ fontSize: 15 }}>{item.date_string}</Text>
                </View>
                <Text style={{ fontFamily: "RobotoBold" }}>
                    {item.start_at + " - " + item.end_at}
                </Text>
                <Text>{item.specialty}</Text>
                <View style={{ flexDirection: "row", alignpropss: "center" }}>
                    <Entypo name="location-pin" size={24} color="black" />
                    <Text>{item.location}</Text>
                </View>

                {item.status != "AVAILABLE" && (
                    <View>
                        <Text>Booked By: </Text>
                        <Text>{item.patient_full_name}</Text>
                    </View>
                )}
            </View>
            <View style={styles.statusContainer}>
                <Text>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => <AppointmentItem item={item} />;

    const AppointmentList = () => {
        if (appointment.length != 0) {
            return (
                <FlatList
                    data={appointment}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            );
        } else {
            return (
                <View
                    style={[
                        styles.appointmentContainer,
                        {
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 0.5,
                        },
                    ]}
                >
                    <Text>No Appointment</Text>
                </View>
            );
        }
    };

    const AppointmentToday = () => {
        if (appointmentToday != null) {
            return <AppointmentItem item={appointmentToday} />;
        } else {
            return (
                <View
                    style={[
                        styles.appointmentContainer,
                        {
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}
                >
                    <Text>No Appointment Today</Text>
                </View>
            );
        }
    };

    if (ready) {
        return (
            <View style={[globalStyles.container_2]}>
                <View style={{ flex: 5 }}>
                    <Text style={styles.appointmentListTitle}>
                        Appointment Today
                    </Text>
                    <AppointmentToday />
                </View>
                <View style={{ flex: 7 }}>
                    <Text style={styles.appointmentListTitle}>
                        Appointment List
                    </Text>
                    <AppointmentList />
                </View>
                <View style={styles.addbuttonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate("MakeAppointment")}
                    >
                        <Text style={styles.add}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return <Loading />;
    }
}

const styles = StyleSheet.create({
    appointmentListTitle: {
        fontSize: 25,
        textAlign: "center",
        margin: 10,
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
        backgroundColor: "white",
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
        backgroundColor: "white",
        margin: 10,
        borderRadius: 10,
        padding: 10,
    },
    addbuttonContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingBottom: 20,
    },
    addButton: {
        backgroundColor: "#42A5F5",
        borderRadius: 100,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    add: {
        color: "white",
        fontSize: 30,
        fontFamily: "RobotoBold",
    },
    statusContainer: {
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFE082",
    },
    appointmentInfoContainer: {
        flex: 2,
    },
    agendaContainer: {
        backgroundColor: "white",
        margin: 5,
        borderRadius: 10,
        padding: 10,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
