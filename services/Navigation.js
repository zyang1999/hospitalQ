import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Queue from '../screens/Queue';
import JoinQueue from '../screens/joinQueue';
import StaffHome from '../screens/StaffHome';
import SettingMenu from '../screens/SettingMenu';
import Account from '../screens/Account';
import ICVerification from '../screens/ICverification';
import Selfie from '../screens/Selfie';
import PendingVerification from '../screens/PendingVerification';
import History from '../screens/History';
import QueueDetails from '../screens/QueueDetails';
import Appointment from '../screens/Appointment';
import MakeAppointment from '../screens/MakeAppointment';
import BookAppointment from '../screens/BookAppointment';
import ManageAppointment from '../screens/ManageAppointment';
import AddAppointment from '../screens/AddAppointment';
import AppointmentDetails from '../screens/AppointmentDetails';
import DoctorAppointment from '../screens/DoctorAppointment';
import Password from '../screens/Password';
import Telephone from '../screens/Telephone';
import { TouchableOpacity, Text } from 'react-native';
import { AuthContext } from './Context';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from "./RootNavigation";

export default function Navigation(props) {

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    const [initialRoute, setInitialRoute] = useState(() => {
        if (props.userRole == 'PATIENT') {
            return 'Patient';
        } else {
            return 'Staff';
        }
    });

    useEffect(() => {
        async function requestUserPermission() {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        }

        messaging().onNotificationOpenedApp(remoteMessage => {
            RootNavigation.navigate(remoteMessage.data.route);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            if (remoteMessage.data.route != null) {
                setInitialRoute(remoteMessage.data.route);
            }
        });

        requestUserPermission();
    }, []);

    const Default = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
        );
    }

    const Patient = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Queue" component={Queue} />
                <Stack.Screen name="JoinQueue" component={JoinQueue} />
            </Stack.Navigator>
        );
    }

    const Staff = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="StaffHome" component={StaffHome} />
            </Stack.Navigator>
        );
    }

    const Setting = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name="SettingMenu" component={SettingMenu} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="Password" component={Password} />
                <Stack.Screen name="Telephone" component={Telephone} />
            </Stack.Navigator>
        );
    }

    const { signOut } = React.useContext(AuthContext);

    const Logout = () => {
        return (
            <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => signOut()}
            >
                <Text style={{ color: '#0288D1' }}>Logout</Text>
            </TouchableOpacity>
        );
    }

    const HistoryStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name='History' component={History} />
                <Stack.Screen name="QueueDetails" component={QueueDetails} />
                <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
            </Stack.Navigator>
        );
    }

    const AppointmentStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Appointment' component={Appointment} />
                <Stack.Screen name='MakeAppointment' component={MakeAppointment} />
                <Stack.Screen name='BookAppointment' component={BookAppointment} />
                <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
            </Stack.Navigator>
        );
    }

    const ManageAppointmentStack = () => {
        return (
            <Stack.Navigator>
                <Stack.Screen name='ManageAppointment' component={ManageAppointment} />
                <Stack.Screen name='AddAppointment' component={AddAppointment} />
                <Stack.Screen name='AppointmentDetails' component={AppointmentDetails} />
            </Stack.Navigator>
        );
    }

    const DoctorAppointmentStack = () => (
        <Stack.Navigator>
            <Stack.Screen name='DoctorAppointment' component={DoctorAppointment} />
            <Stack.Screen name='AppointmentDetails' component={AppointmentDetails} />
        </Stack.Navigator>
    )

    const Navigation = () => {
        if (props.userToken == null) {
            return (<Default />);
        } else {
            if (props.status == 'UNVERIFIED') {
                return (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="ICVerification"
                            component={ICVerification}
                            options={{
                                title: 'Personal Information',
                                headerRight: () => <Logout />
                            }} />
                        <Stack.Screen
                            name="Selfie"
                            component={Selfie}
                            options={{
                                title: 'Selfie',
                                headerRight: () => <Logout />
                            }} />
                        <Stack.Screen
                            name="PendingVerification"
                            component={PendingVerification}
                            options={{
                                title: 'Verification Processing',
                                headerRight: () => <Logout />
                            }} />
                    </Stack.Navigator>
                );
            } else if (props.status == 'VERIFYING') {
                return (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="PendingVerification"
                            component={PendingVerification}
                            options={{
                                title: 'Verification Processing',
                                headerRight: () => <Logout />
                            }} />
                    </Stack.Navigator>
                );
            }
            else {
                if (props.userRole == 'PATIENT') {
                    return (
                        <Tab.Navigator initialRouteName={initialRoute}>
                            <Tab.Screen
                                name="Patient"
                                component={Patient}
                                options={{
                                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
                                }}
                            />
                            <Tab.Screen
                                name="AppointmentStack"
                                component={AppointmentStack}
                                options={{ tabBarIcon: () => <AntDesign name="calendar" size={24} color="black" /> }}
                            />
                            <Tab.Screen
                                name="HistoryStack"
                                component={HistoryStack}
                                options={{ tabBarIcon: () => <FontAwesome name="history" size={24} color="black" /> }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={Setting}
                                options={{ tabBarIcon: () => <AntDesign name="setting" size={24} color="black" /> }}
                            />
                        </Tab.Navigator>
                    );
                } else if (props.userRole == 'DOCTOR' || props.userRole == 'NURSE') {
                    return (
                        <Tab.Navigator>
                            <Tab.Screen
                                name="Staff"
                                component={Staff}
                                options={{
                                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
                                    tabBarOptions: {
                                        showLabel: false
                                    }
                                }}
                            />
                            {props.userRole == 'DOCTOR' &&
                                <Tab.Screen
                                    name="DoctorAppointmentStack"
                                    component={DoctorAppointmentStack}
                                    options={{
                                        tabBarIcon: () => <AntDesign name="calendar" size={24} color="black" />
                                    }}
                                />
                            }
                            {props.userRole == 'DOCTOR' &&
                                <Tab.Screen
                                    name="ManageAppointmentStack"
                                    component={ManageAppointmentStack}
                                    options={{
                                        tabBarIcon: () => <FontAwesome name="tasks" size={24} color="black" />
                                    }}

                                />
                            }
                            <Tab.Screen
                                name="HistoryStack"
                                component={HistoryStack}
                                options={{ tabBarIcon: () => <FontAwesome name="history" size={24} color="black" /> }}
                            />
                            <Tab.Screen
                                name="Setting"
                                component={Setting}
                                options={{ tabBarIcon: () => <AntDesign name="setting" size={24} color="black" /> }}
                            />
                        </Tab.Navigator>
                    );
                }
            }
        }
    }

    return (
        <NavigationContainer ref={RootNavigation.navigationRef}>
            <Navigation />
        </NavigationContainer>
    );
}