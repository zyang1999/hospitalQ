import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppLoading from 'expo-app-loading';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Queue from './screens/Queue';
import JoinQueue from './screens/joinQueue';
import StaffHome from './screens/StaffHome';
import SettingMenu from './screens/SettingMenu';
import Account from './screens/Account';
import ICVerification from './screens/ICverification';
import Selfie from './screens/Selfie';


export default function Navigation(props) {

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

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
            </Stack.Navigator>
        );
    }

    const Navigation = () => {
        if (props.userToken == null) {
            return (<Default />);
        } else {
            if (props.status == 'UNVERIFIED') {
                return (
                    <Stack.Navigator>
                        <Stack.Screen name="ICVerification" component={ICVerification} />
                        <Stack.Screen name="Selfie" component={Selfie} />
                    </Stack.Navigator>
                );
            } else {
                if (props.userRole == 'PATIENT') {
                    return (
                        <Tab.Navigator>
                            <Tab.Screen name="Patient" component={Patient} />
                            <Tab.Screen name="Setting" component={Setting} />
                        </Tab.Navigator>
                    );
                } else if (props.userRole == 'DOCTOR' || props.userRole == 'NURSE') {
                    return (
                        <Tab.Navigator>
                            <Tab.Screen name="Staff" component={Staff} />
                            <Tab.Screen name="Setting" component={Setting} />
                        </Tab.Navigator>
                    );
                }
            }
        }
    }

    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    );
}