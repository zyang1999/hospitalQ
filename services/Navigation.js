import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Queue from "../screens/Queue";
import JoinQueue from "../screens/joinQueue";
import StaffHome from "../screens/StaffHome";
import SettingMenu from "../screens/SettingMenu";
import Account from "../screens/Account";
import ICVerification from "../screens/ICverification";
import Selfie from "../screens/Selfie";
import PendingVerification from "../screens/PendingVerification";
import History from "../screens/History";
import QueueDetails from "../screens/QueueDetails";
import Appointment from "../screens/Appointment";
import MakeAppointment from "../screens/MakeAppointment";
import BookAppointment from "../screens/BookAppointment";
import ManageAppointment from "../screens/ManageAppointment";
import AddAppointment from "../screens/AddAppointment";
import AppointmentDetails from "../screens/AppointmentDetails";
import DoctorAppointment from "../screens/DoctorAppointment";
import Password from "../screens/Password";
import Telephone from "../screens/Telephone";
import HomeAddress from "../screens/HomeAddress";
import { TouchableOpacity, Text } from "react-native";
import { AuthContext } from "./Context";
import messaging from "@react-native-firebase/messaging";
import * as RootNavigation from "./RootNavigation";

export default function Navigation(props) {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    const [initialRoute, setInitialRoute] = useState(() => {
        if (props.userRole == "PATIENT") {
            return "Patient";
        } else {
            return "Staff";
        }
    });

    useEffect(() => {
        async function requestUserPermission() {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log("Authorization status:", authStatus);
            }
        }

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            if (remoteMessage.data.type != "VerificationFail") {
                setInitialRoute(remoteMessage.data.route);
            }
        });

        requestUserPermission();
    }, []);

    const Default = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                        title: "Log In",
                        animationTypeForReplace: props.isSignout
                            ? "pop"
                            : "push",
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ title: "Registration" }}
                />
            </Stack.Navigator>
        );
    };

    const Patient = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Queue"
                    component={Queue}
                    options={{ title: "Home" }}
                />
                <Stack.Screen
                    name="JoinQueue"
                    component={JoinQueue}
                    options={{ title: "Join Queue" }}
                />
            </Stack.Navigator>
        );
    };

    const Staff = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="StaffHome"
                    component={StaffHome}
                    options={{ title: "Home" }}
                />
            </Stack.Navigator>
        );
    };

    const Setting = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="SettingMenu"
                    component={SettingMenu}
                    options={{ title: "Settings" }}
                />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="Password" component={Password} />
                <Stack.Screen name="Telephone" component={Telephone} />
                <Stack.Screen
                    name="HomeAddress"
                    component={HomeAddress}
                    options={{ title: "Home Address" }}
                />
            </Stack.Navigator>
        );
    };

    const { signOut } = React.useContext(AuthContext);

    const Logout = () => {
        return (
            <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => signOut()}
            >
                <Text style={{ color: "#0288D1" }}>Logout</Text>
            </TouchableOpacity>
        );
    };

    const HistoryStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="History" component={History} />
                <Stack.Screen
                    name="QueueDetails"
                    component={QueueDetails}
                    options={{ title: "Queue Details" }}
                />
                <Stack.Screen
                    name="AppointmentDetails"
                    component={AppointmentDetails}
                    options={{ title: "Appointment Details" }}
                />
            </Stack.Navigator>
        );
    };

    const AppointmentStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Appointment" component={Appointment} />
                <Stack.Screen
                    name="MakeAppointment"
                    component={MakeAppointment}
                    options={{ title: "Make Appointment" }}
                />
                <Stack.Screen
                    name="BookAppointment"
                    component={BookAppointment}
                    options={{ title: "Book Appointment" }}
                />
                <Stack.Screen
                    name="AppointmentDetails"
                    component={AppointmentDetails}
                    options={{ title: "Appointment Details" }}
                />
            </Stack.Navigator>
        );
    };

    const ManageAppointmentStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="ManageAppointment"
                    component={ManageAppointment}
                    options={{ title: "Manage Appointments" }}
                />
                <Stack.Screen
                    name="AddAppointment"
                    component={AddAppointment}
                    options={{ title: "Add Appointments" }}
                />
                <Stack.Screen
                    name="AppointmentDetails"
                    component={AppointmentDetails}
                    options={{ title: "Appointment Details" }}
                />
            </Stack.Navigator>
        );
    };

    const DoctorAppointmentStack = () => (
        <Stack.Navigator>
            <Stack.Screen
                name="DoctorAppointment"
                component={DoctorAppointment}
                options={{ title: "Appointments Today" }}
            />
            <Stack.Screen
                name="AppointmentDetails"
                component={AppointmentDetails}
            />
        </Stack.Navigator>
    );

    const Navigation = () => {
        if (props.userToken == null) {
            return <Default />;
        } else {
            if (props.status == "UNVERIFIED") {
                if (props.ic != null) {
                    return (
                        <Stack.Navigator>
                            <Stack.Screen
                                name="Selfie"
                                component={Selfie}
                                options={{
                                    title: "Selfie",
                                    headerRight: () => <Logout />,
                                }}
                            />
                            <Stack.Screen
                                name="PendingVerification"
                                component={PendingVerification}
                                options={{
                                    title: "Verification Processing",
                                    headerRight: () => <Logout />,
                                }}
                            />
                        </Stack.Navigator>
                    );
                }
                return (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="ICVerification"
                            component={ICVerification}
                            options={{
                                title: "Verification",
                                headerRight: () => <Logout />,
                            }}
                        />
                        <Stack.Screen
                            name="Selfie"
                            component={Selfie}
                            options={{
                                title: "Selfie",
                                headerRight: () => <Logout />,
                            }}
                        />
                        <Stack.Screen
                            name="PendingVerification"
                            component={PendingVerification}
                            options={{
                                title: "Verification Processing",
                                headerRight: () => <Logout />,
                            }}
                        />
                    </Stack.Navigator>
                );
            } else if (props.status == "VERIFYING") {
                return (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="PendingVerification"
                            component={PendingVerification}
                            options={{
                                title: "Verification Processing",
                                headerRight: () => <Logout />,
                            }}
                        />
                    </Stack.Navigator>
                );
            } else {
                if (props.userRole == "PATIENT") {
                    return (
                        <Tab.Navigator initialRouteName={initialRoute}>
                            <Tab.Screen
                                name="Patient"
                                component={Patient}
                                options={{
                                    tabBarIcon: () => (
                                        <AntDesign
                                            name="home"
                                            size={24}
                                            color="black"
                                        />
                                    ),
                                    title: "Home",
                                }}
                            />
                            <Tab.Screen
                                name="AppointmentStack"
                                component={AppointmentStack}
                                options={{
                                    tabBarIcon: () => (
                                        <AntDesign
                                            name="calendar"
                                            size={24}
                                            color="black"
                                        />
                                    ),
                                    title: "Appointments",
                                }}
                            />
                            <Tab.Screen
                                name="HistoryStack"
                                component={HistoryStack}
                                options={{
                                    tabBarIcon: () => (
                                        <FontAwesome
                                            name="history"
                                            size={24}
                                            color="black"
                                        />
                                    ),
                                    title: "History",
                                }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={Setting}
                                options={{
                                    tabBarIcon: () => (
                                        <AntDesign
                                            name="setting"
                                            size={24}
                                            color="black"
                                        />
                                    ),
                                    title: "Settings",
                                }}
                            />
                        </Tab.Navigator>
                    );
                } else if (
                    props.userRole == "DOCTOR" ||
                    props.userRole == "NURSE"
                ) {
                    return (
                        <Tab.Navigator>
                            <Tab.Screen
                                name="Staff"
                                component={Staff}
                                options={{
                                    tabBarIcon: () => (
                                        <AntDesign
                                            name="home"
                                            size={24}
                                            color="black"
                                        />
                                    ),
                                    title: "Home",
                                }}
                            />
                            {props.userRole == "DOCTOR" && (
                                <Tab.Screen
                                    name="DoctorAppointmentStack"
                                    component={DoctorAppointmentStack}
                                    options={{
                                        tabBarIcon: () => (
                                            <AntDesign
                                                name="calendar"
                                                size={24}
                                                color="black"
                                            />
                                        ),
                                        title: "Appointments",
                                    }}
                                />
                            )}
                            {props.userRole == "DOCTOR" && (
                                <Tab.Screen
                                    name="ManageAppointmentStack"
                                    component={ManageAppointmentStack}
                                    options={{
                                        tabBarIcon: () => (
                                            <FontAwesome
                                                name="tasks"
                                                size={24}
                                                color="black"
                                            />
                                        ),
                                        title: "Manage Appointment",
                                    }}
                                />
                            )}
                            <Tab.Screen
                                name="HistoryStack"
                                component={HistoryStack}
                                options={{
                                    tabBarIcon: () => (
                                        <FontAwesome
                                            name="history"
                                            size={24}
                                            color="black"
                                        />
                                    ),
                                    title: "History",
                                }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={Setting}
                                options={{
                                    tabBarIcon: () => (
                                        <AntDesign
                                            name="setting"
                                            size={24}
                                            color="black"
                                        />
                                    ),
                                    title: "Settings",
                                }}
                            />
                        </Tab.Navigator>
                    );
                }
            }
        }
    };

    return (
        <NavigationContainer ref={RootNavigation.navigationRef}>
            <Navigation />
        </NavigationContainer>
    );
}
