import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export const Appointment = ({ props, navigation, previousScreen }) => {
    return (
        <TouchableOpacity
            style={styles.agendaContainer}
            onPress={() =>
                navigation.navigate("AppointmentDetails", {
                    appointmentId: props.id,
                    previousScreen: previousScreen,
                })
            }
        >
            <View style={styles.appointmentInfoContainer}>
                <Text style={{ fontFamily: "RobotoBold" }}>
                    {props.start_at + " - " + props.end_at}
                </Text>
                <Text>{props.specialty}</Text>
                <View style={{ flexDirection: "row", alignpropss: "center" }}>
                    <Entypo name="location-pin" size={24} color="black" />
                    <Text>{props.location}</Text>
                </View>

                {props.status != "AVAILABLE" && (
                    <View>
                        <Text>Booked By: </Text>
                        <Text>{props.patient_full_name}</Text>
                    </View>
                )}
            </View>
            <View
                style={[
                    styles.statusContainer,
                    props.status == "AVAILABLE"
                        ? { backgroundColor: "#A5D6A7" }
                        : { backgroundColor: "#FFE082" },
                ]}
            >
                <Text>{props.status}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: "center",
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
