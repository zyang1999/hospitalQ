import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity,
    Image,
} from "react-native";
import Loading from "../components/Loading";
import api from "../services/Api";
import camera from "../services/Camera";

export default function Account({ navigation, route }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;
        api.request("getUser", "GET", {}).then((response) => {
            if (mounted) {
                setUser(response.user);
                setLoading(false);
            }
        });
        return function cleanup() {
            mounted = false;
        };
    }, [loading, route.params?.refresh]);

    const uploadPicture = () => {
        camera.openGallery().then((image) => {
            if (image == null) {
                return;
            }
            api.request("changeProfileImage", "POST", { image: image }).then(
                (response) => {
                    alert(response.message);
                    setLoading(true);
                }
            );
        });
    };

    if (loading) {
        return <Loading />;
    } else {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: "center" }}>
                        <Image
                            style={styles.profilePicture}
                            source={{ uri: user.selfie_string }}
                        />
                    </View>
                    <Text style={styles.title}>Name</Text>
                    <Text>{user.full_name}</Text>
                    <Text style={styles.title}>Email Address</Text>
                    <Text style={styles.text}>{user.email}</Text>
                    <Text style={styles.title}>Gender</Text>
                    <Text style={styles.text}>{user.gender}</Text>
                    <Text style={styles.title}>IC Number</Text>
                    <Text style={styles.text}>{user.IC_no}</Text>
                    <Text style={styles.title}>Role</Text>
                    <Text style={styles.text}>{user.role}</Text>
                    {user.role == "DOCTOR" && (
                        <View>
                            <Text style={styles.title}>Specialty</Text>
                            <Text style={styles.text}>
                                {user.specialty.specialty}
                            </Text>
                        </View>
                    )}
                    {user.role == "DOCTOR" && (
                        <View>
                            <Text style={styles.title}>Consultation Room</Text>
                            <Text style={styles.text}>
                                {user.specialty.location}
                            </Text>
                        </View>
                    )}
                    {user.role == "NURSE" && (
                        <View>
                            <Text style={styles.title}>
                                Serving Counter Number
                            </Text>
                            <Text style={styles.text}>
                                {user.specialty.location}
                            </Text>
                        </View>
                    )}

                    <View style={styles.telephoneContainer}>
                        <View>
                            <Text style={styles.title}>Telephone</Text>
                            <Text style={styles.text}>{user.telephone}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.editTelephoneButton}
                            onPress={() => navigation.navigate("Telephone")}
                        >
                            <Text style={{ fontFamily: "RobotoBold" }}>
                                Edit Telephone
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.telephoneContainer}>
                        <View style={{ flex: 3 }}>
                            <Text style={styles.title}>Home Address</Text>
                            <Text style={styles.text}>{user.home_address}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity
                                style={styles.editTelephoneButton}
                                onPress={() =>
                                    navigation.navigate("HomeAddress")
                                }
                            >
                                <Text style={{ fontFamily: "RobotoBold" }}>
                                    Edit Home Address
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontFamily: "RobotoRegular",
        paddingVertical: 5,
    },
    title: {
        marginTop: 15,
        fontSize: 15,
        fontFamily: "RobotoBold",
    },
    profilePicture: {
        height: 80,
        width: 80,
        borderRadius: 100,
    },
    editButton: {
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 10,
    },
    telephoneContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    editTelephoneButton: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
    },
    container: {
        padding: 20,
        backgroundColor: "white",
    },
});
