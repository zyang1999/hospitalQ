import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { globalStyles } from "../styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../services/Api";
import { PrimaryButton } from "../components/Button";

export default function AddAppointment({ navigation }) {
    const initialDate = new Date();
    var coeff = 1000 * 60 * 30;
    var rounded = new Date(Math.round(initialDate.getTime() / coeff) * coeff);

    const [date, setDate] = useState(
        new Date(rounded.setDate(rounded.getDate() + 1))
    );
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const addAppointment = () => {
        setSubmitLoading(true);
        api.request("createAppointment", "POST", { date: date }).then(
            (response) => {
                if (!response.success) {
                    if (response.message.error) {
                        alert(response.message.error);
                    }
                } else {
                    alert(response.message);
                    navigation.navigate("ManageAppointment", {
                        appointmentId: response.appointment.id,
                    });
                }
                setSubmitLoading(false);
            }
        );
    };

    function formatDate(date) {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        return day + "/" + month + "/" + year;
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    }

    function endTime(date) {
        return new Date(date.getTime() + 30 * 60000);
    }

    const onChange = (event, selectedDate) => {
        setShow(Platform.OS === "ios");

        if (typeof selectedDate !== "undefined") {
            setDate(selectedDate);
        }
    };

    const showMode = (currentMode, display) => {
        setShow(true);
        setMode(currentMode);
        setDisplay(display);
    };

    const showDatepicker = () => {
        showMode("date", "default");
    };

    const showTimepicker = () => {
        showMode("time", "spinner");
    };

    const Button = (props) => (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={{ color: "white" }}>{props.text}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={globalStyles.container_2}>
            <View style={styles.detailsContainer}>
                <View style={styles.card}>
                    <Text style={styles.title}>Appointment Date:</Text>
                    {date ? (
                        <Text style={styles.value}>{formatDate(date)}</Text>
                    ) : (
                        <Text></Text>
                    )}
                </View>
                <Button text="PICK A DATE" onPress={showDatepicker} />
            </View>

            <View style={styles.detailsContainer}>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.card, { marginRight: "10%" }]}>
                        <Text style={styles.title}>Start At:</Text>
                        {date ? (
                            <Text style={styles.value}>{formatAMPM(date)}</Text>
                        ) : (
                            <Text></Text>
                        )}
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.title}>End At:</Text>
                        {date ? (
                            <Text style={styles.value}>
                                {formatAMPM(endTime(date))}
                            </Text>
                        ) : (
                            <Text></Text>
                        )}
                    </View>
                </View>

                <Button
                    text="PICK APPOINTMENT START TIME"
                    onPress={showTimepicker}
                />
                <Text style={styles.notes}>
                    The time duration for every appointment is fixed which is 30
                    minutes.
                </Text>
            </View>

            {show && (
                <DateTimePicker
                    value={date}
                    minimumDate={rounded}
                    mode={mode}
                    display={display}
                    onChange={onChange}
                    minuteInterval={30}
                />
            )}
            {submitLoading ? (
                <ActivityIndicator color="#42A5F5" />
            ) : (
                <PrimaryButton
                    title="ADD APPOINTMENT"
                    action={addAppointment}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#29B6F6",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    title: {
        fontSize: 15,
        fontFamily: "RobotoBold",
        marginBottom: 10,
    },
    value: {
        fontSize: 25,
    },
    detailsContainer: {
        marginVertical: 20,
        alignItems: "center",
    },
    notes: {
        opacity: 0.7,
        marginTop: 10,
    },
    card: {
        elevation: 5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    },
});
