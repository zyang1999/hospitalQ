import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles";
import { Picker } from "@react-native-picker/picker";
import { PrimaryButton } from "../components/Button";

import api from "../services/Api";
import { TextInput } from "react-native-gesture-handler";
import Loading from "../components/Loading";

export default function MakeAppointment({ navigation }) {
    const [specialty, setSpecialty] = useState("All");
    const [doctorId, setDoctor] = useState("All");
    const [specialties, setSpecialties] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [ready, setReady] = useState(false);
    const [concern, setConcern] = useState(null);
    const [specialtiesRefresh, setSpecialtiesRefresh] = useState(false);
    const [doctorsRefresh, setDoctorsRefresh] = useState(false);
    useEffect(() => {
        let mounted = true;
        api.request("getSpecialties", "POST", { doctorId: doctorId }).then(
            (response) => {
                if (mounted) {
                    setSpecialties(response.specialties);
                    api.request("getDoctorList", "POST", {
                        specialty: specialty,
                    }).then((response) => {
                        setDoctors(response.doctors);
                        setReady(true);
                    });
                }
            }
        );
        return function cleanup() {
            mounted = false;
        };
    }, []);

    const getSpecialties = (doctorId) => {
        setSpecialtiesRefresh(true);
        api.request("getSpecialties", "POST", { doctorId: doctorId }).then(
            (response) => {
                setSpecialties(response.specialties);
                setSpecialty(response.specialties[0].specialty);
                setSpecialtiesRefresh(false);
            }
        );
    };

    const getDoctors = (specialty) => {
        setDoctorsRefresh(true);
        api.request("getDoctorList", "POST", { specialty: specialty }).then(
            (response) => {
                setDoctors(response.doctors);
                setDoctorsRefresh(false);
            }
        );
    };

    const SepcialtiesDropDown = () => {
        return (
            <View>
                <Text style={globalStyles.h5}>Specialties</Text>
                {specialtiesRefresh ? (
                    <Loading />
                ) : (
                    <Picker
                        selectedValue={specialty}
                        style={styles.picker}
                        onValueChange={(specialty) => {
                            setSpecialty(specialty);
                            getDoctors(specialty);
                        }}
                    >
                        <Picker.Item label="All" value="All" />
                        {specialties.map((item) => {
                            return (
                                <Picker.Item
                                    label={item.specialty}
                                    value={item.specialty}
                                    key={item.id}
                                />
                            );
                        })}
                    </Picker>
                )}
            </View>
        );
    };

    const DoctorsDropDown = () => {
        return (
            <View>
                <Text style={globalStyles.h5}>Doctors</Text>
                {doctorsRefresh ? (
                    <Loading />
                ) : (
                    <Picker
                        selectedValue={doctorId}
                        style={styles.picker}
                        onValueChange={(id) => {
                            setDoctor(id);
                            getSpecialties(id);
                        }}
                    >
                        <Picker.Item label="All" value="All" />
                        {doctors.map((item) => {
                            return (
                                <Picker.Item
                                    label={"Dr. " + item.full_name}
                                    value={item.id}
                                    key={item.id}
                                />
                            );
                        })}
                    </Picker>
                )}
            </View>
        );
    };

    const makeAppointment = () => {
        if (doctorId === "All" && specialty === "All") {
            alert(
                "Please select a doctor and specialty before proceed to the next step."
            );
            return;
        }
        if (doctorId === "All") {
            alert("Please select a doctor before proceed to the next step.");
        } else if (specialty === "All") {
            alert("Please select a specialty before proceed to the next step.");
        } else {
            navigation.navigate("BookAppointment", {
                doctorId: doctorId,
                concern: concern,
            });
        }
    };

    if (ready) {
        return (
            <View style={globalStyles.container_2}>
                <SepcialtiesDropDown />
                <DoctorsDropDown />
                <Text style={globalStyles.h5}>Concern (optional)</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setConcern(text)}
                />
                <PrimaryButton title="NEXT" action={makeAppointment} />
            </View>
        );
    } else {
        return (
            <View
                style={[globalStyles.container_2, { justifyContent: "center" }]}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        borderWidth: 1,
        textAlignVertical: "top",
        padding: 10,
    },
});
