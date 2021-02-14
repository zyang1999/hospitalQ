import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    RefreshControl,
} from "react-native";
import Loading from "../components/Loading";
import Api from "../services/Api";
import { globalStyles } from "../styles";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function History({ navigation, route }) {
    const [queueHistory, setQueueHistory] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getHistory().then(() => {
            setRefreshing(false);
        });
    }, []);

    useEffect(() => {
        if (route.params?.refresh) {
            setLoading(true);
        }
        if (refresh) {
            setLoading(true);
        }

        const getUserRole = async () => {
            let userRole = await AsyncStorage.getItem("userRole");
            setUserRole(userRole);
        };

        getHistory().then(() => {
            getUserRole();
            setLoading(false);
            setRefresh(false);
        });
    }, [refresh, route.params?.refresh]);

    const getHistory = () => {
        return Api.request("getHistory", "GET", {}).then((response) => {
            setQueueHistory(response.history);
        });
    };

    const QueueItem = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={() =>
                navigation.navigate("QueueDetails", { queueId: item.id })
            }
        >
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.type}>{item.type}</Text>
                    <Text style={styles.date}>
                        {item.created_at} {item.start_at}
                    </Text>
                    <Details item={item} />
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Entypo name="location-pin" size={17} color="black" />
                        <Text>{item.location}</Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.statusContainer,
                        item.status == "COMPLETED"
                            ? { backgroundColor: "#A5D6A7" }
                            : { backgroundColor: "#FFE082" },
                    ]}
                >
                    <Text style={{ fontFamily: "RobotoBold" }}>
                        {item.status}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    const Details = ({ item }) => {
        if (userRole == "PATIENT") {
            return (
                <View>
                    <Text style={styles.details}>{item.specialty}</Text>
                    <Text style={styles.details}>
                        DR. {item.doctor_full_name}
                    </Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.details}>{item.patient_full_name}</Text>
                </View>
            );
        }
    };

    const AppointmentItem = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={() =>
                navigation.navigate("AppointmentDetails", {
                    appointmentId: item.id,
                })
            }
        >
            <View style={styles.itemContainer}>
                <View>
                    <Text style={styles.type}>{item.type}</Text>
                    <Text style={styles.date}>{item.date_string}</Text>
                    <Text style={styles.date}>
                        {item.start_at + "-" + item.end_at}
                    </Text>
                    <Details item={item} />
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Entypo name="location-pin" size={17} color="black" />
                        <Text>{item.location}</Text>
                    </View>
                </View>
                <View
                    style={[
                        styles.statusContainer,
                        item.status == "COMPLETED"
                            ? { backgroundColor: "#A5D6A7" }
                            : { backgroundColor: "#FFE082" },
                    ]}
                >
                    <Text style={{ fontFamily: "RobotoBold" }}>
                        {item.status}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    const renderItem = ({ item }) => {
        if (item.type === "Queue") {
            return <QueueItem item={item} />;
        } else {
            return <AppointmentItem item={item} />;
        }
    };

    const History = () => {
        if (queueHistory.length == 0) {
            return (
                <View
                    style={{ justifyContent: "center", alignItems: "center" , flex: 1}}
                >
                    <Text>No History</Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={queueHistory}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            );
        }
    };

    if (loading) {
        return <Loading />;
    } else {
        return (
            <View style={globalStyles.container_2}>
                <History />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    feedbackButton: {
        backgroundColor: "#42A5F5",
        padding: 10,
        borderRadius: 10,
    },
    disabledButton: {
        backgroundColor: "#808B96",
        padding: 10,
        borderRadius: 10,
    },
    type: {
        fontFamily: "RobotoBold",
        fontSize: 15,
        marginBottom: 10,
    },
    date: {
        fontFamily: "RobotoBold",
        fontSize: 15,
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        textAlignVertical: "top",
        padding: 10,
    },
    statusContainer: {
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
    },
});
