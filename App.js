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

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage);
      });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification != null) {
        console.log(remoteMessage);
      }else{
        
      }
    });

    requestUserPermission();
  }, []);

  return (<Authentication />);
}
