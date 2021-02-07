import React, { useEffect } from 'react';
import Authentication from './services/Authentication';
import messaging from '@react-native-firebase/messaging';

export default function App() {

  
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

    requestUserPermission();
  }, []);

  return (<Authentication />);
}
