import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    StyleSheet,
    TextInput,
    RefreshControl,
} from "react-native";
import { globalStyles } from "../styles";
import Loading from "../components/Loading";
import Api from "../services/Api";
import messaging from "@react-native-firebase/messaging";
import Modal from "react-native-modal";
import { SecondaryButton, DangerButton } from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StaffHome() {
    const [ready, setReady] = useState(false);
    const [currentQueue, setCurrentQueue] = useState(null);
    const [allQueue, setAllQueue] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [currentQueueID, setCurrentQueueID] = useState(null);
    const [error, setError] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [nextPatient, setNextPatient] = useState(null);
    const [queueRefreshing, setQueueRefreshing] = useState(false);
    const [user, setUser] = useState(null);

    const getUserRole = async () => {
        let userRole = await AsyncStorage.getItem("userRole");
        setUserRole(userRole);
    };
    getUserRole();

    const getAllQueue = () =>
            Api.request("getAllQueue", "GET", {}).then((response) => {
                setAllQueue(response.allQueue);
                setCurrentQueue(response.currentQueue);
                setNextPatient(response.nextPatient);
                setCurrentQueueID(
                    response.currentQueue ? response.currentQueue.id : null
                );
                Api.request("getUser", "GET", {}).then((response) => {
                    setUser(response.user);
                    setReady(true);
                });
            });

    React.useEffect(() => {
        setError([]);
        getAllQueue();

        messaging().onMessage(async (remoteMessage) => {
            if (remoteMessage.data.type == "refreshQueue") {
                setQueueRefreshing(true);
                Api.request("getAllQueue", "GET", {}).then((response) => {
                    setAllQueue(response.allQueue);
                    setQueueRefreshing(false);
                });
            }
        });

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            if (remoteMessage.data.type == "refreshQueue") {
                setQueueRefreshing(true);
                Api.request("getAllQueue", "GET", {}).then((response) => {
                    setAllQueue(response.allQueue);
                    setQueueRefreshing(false);
                });
            }
        });
    }, [ready]);

    const onRefresh = ()=>{
        setQueueRefreshing(true);
        getAllQueue();
        setTimeout(function () {
            setQueueRefreshing(false);
        }, 2000);
        
    }

    const updateQueue = () => {
        Api.request("updateQueue", "POST", {
            queue_id: currentQueueID,
        }).then(setReady(false));
    };

    const stopQueue = () => {
        Api.request("stopQueue", "POST", { queue_id: currentQueueID }).then(
            setReady(false)
        );
    };

    const cancelQueue = (reason) => {
        Api.request("cancelQueue", "POST", {
            queueId: currentQueueID,
            feedback: reason,
        }).then((response) => {
            if (response.success) {
                setModalVisible(false);
                alert(response.message);
                Api.request("updateQueue", "POST", { queue_id: null }).then(
                    setReady(false)
                );
            } else {
                setError(response.message);
            }
        });
    };

    const Profile = () => (
        <View style={styles.profileContainer}>
            <View style={{ flex: 3 }}>
                <Image
                    style={{ width: 70, height: 70, borderRadius: 100 }}
                    source={{ uri: user.selfie_string }}
                />
            </View>
            <View style={{ flex: 7 }}>
                <Text>Welcome Back,</Text>
                <Text style={[globalStyles.h4]}>
                    {user.first_name + " " + user.last_name}
                </Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={globalStyles.queueStatus}>
            <View style={{ flex: 1 }}>
                <Text style={globalStyles.queueNumber}>{item.queue_no}</Text>
            </View>
            <View style={{ flex: 1 }}>
                {item.status == "SERVING" ? (
                    <Text style={globalStyles.serving}>{item.status}</Text>
                ) : (
                    <Text style={globalStyles.waiting}>{item.status}</Text>
                )}
            </View>
        </View>
    );

    const ServeButton = () => {
        if (allQueue.length != 0) {
            return (
                <TouchableOpacity onPress={() => updateQueue()}>
                    <Text style={globalStyles.primaryButton}>
                        START SERVING
                    </Text>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity disabled={true}>
                    <Text
                        style={[
                            globalStyles.primaryButton,
                            { backgroundColor: "#B3B6B7" },
                        ]}
                    >
                        NO PATIENT WAITING
                    </Text>
                </TouchableOpacity>
            );
        }
    };

    const CancelModal = () => {
        var reason = "";
        return (
            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                    <View>
                        <Text styles={globalStyles.h5}>
                            Please provide your reason to remove this patient.
                        </Text>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={styles.input}
                            onChangeText={(text) => (reason = text)}
                        />
                        {error.feedback && (
                            <ErrorMessage message={error.feedback} />
                        )}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <DangerButton
                                title="REMOVE"
                                action={() => cancelQueue(reason)}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <SecondaryButton
                                title="BACK"
                                action={() => setModalVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const CurrentPatient = () => {
        if (currentQueue) {
            const patient = currentQueue.patient;
            return (
                <View style={globalStyles.UserQueueBox}>
                    <Text style={globalStyles.h4}>Current Patient</Text>
                    <Image
                        style={{ height: 90, width: 90, borderRadius: 100 }}
                        source={{ uri: patient.selfie_string }}
                    />
                    <Text style={globalStyles.h1}>{currentQueue.queue_no}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ marginRight: 20 }}>
                            <View>
                                <Text style={styles.title}>Patient Name</Text>
                                <Text style={styles.details}>
                                    {patient.full_name}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Telephone</Text>
                                <Text style={styles.details}>
                                    {patient.telephone}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Email</Text>
                                <Text style={styles.details}>
                                    {patient.email}
                                </Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Concern</Text>
                                {currentQueue.concern == null ? (
                                    <Text style={styles.details}>None</Text>
                                ) : (
                                    <Text style={styles.details}>
                                        {currentQueue.concern}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.title}>Gender</Text>
                                <Text style={styles.details}>
                                    {patient.gender}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => updateQueue()}>
                        <Text style={globalStyles.primaryButton}>
                            NEXT PATIENT
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => stopQueue()}>
                        <Text style={globalStyles.secondaryButton}>
                            STOP SERVING
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={globalStyles.dangerButton}>
                            REMOVE PATIENT
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={[globalStyles.UserQueueBox, { height: 200 }]}>
                    <Text style={globalStyles.h4}>
                        No Patient are being served now
                    </Text>
                    <ServeButton />
                </View>
            );
        }
    };

    const NextPatientDetails = () => {
        if (nextPatient == null) {
            return (
                <View style={globalStyles.UserQueueBox}>
                    <Text>No Next Patient</Text>
                </View>
            );
        }
        return (
            <View style={globalStyles.UserQueueBox}>
                <Text style={{ fontFamily: "RobotoBold" }}>Next Patient</Text>
                <Image
                    style={{ height: 70, width: 70, borderRadius: 100 }}
                    source={{ uri: nextPatient.selfie_string }}
                />
                <Text>{nextPatient.full_name}</Text>
                <Text>{nextPatient.IC_no}</Text>
            </View>
        );
    };

    if (ready) {
        return (
            <View style={globalStyles.container_2}>
                <FlatList
                    data={allQueue}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={queueRefreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    ListHeaderComponent={
                        <View style={{ padding: 10 }}>
                            <Profile />
                            <CancelModal />
                            <CurrentPatient />
                            {userRole == "NURSE" && <NextPatientDetails />}
                            <Text
                                style={[
                                    globalStyles.h3,
                                    { textAlign: "center", marginVertical: 20 },
                                ]}
                            >
                                Queue List
                            </Text>

                            <View style={globalStyles.queueStatus}>
                                <Text style={globalStyles.queueTitle}>
                                    Ticket Number
                                </Text>
                                <Text style={globalStyles.queueTitle}>
                                    Now Serving
                                </Text>
                            </View>
                            {allQueue.length == 0 && (
                                <View
                                    style={{
                                        alignItems: "center",
                                        marginVertical: 10,
                                    }}
                                >
                                    <Text>No Patient is waiting</Text>
                                </View>
                            )}
                        </View>
                    }
                />
            </View>
        );
    } else {
        return <Loading />;
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "RobotoBold",
    },
    details: {
        marginBottom: 10,
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        textAlignVertical: "top",
        padding: 10,
    },
    profileContainer: {
        elevation: 4,
        backgroundColor: "white",
        marginHorizontal: 5,
        padding: 10,
        flexDirection: "row",
        marginTop: 10,
        borderRadius: 10,
    },
});
