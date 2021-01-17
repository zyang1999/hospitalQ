import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { globalStyles } from '../styles';
import Api from '../services/Api';

export default function joinQueue({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    let json;
    setScanned(true);
    json = JSON.parse(data);
    if (json.server === '192.168.0.197') {
      try {
        Api.request('joinQueue', 'POST', { location: json.location })
          .then(navigation.navigate('Queue', { refresh: true }));
      } catch (e) {
        handleError();
      }
    } else {
      handleError();
    }
  };

  const handleError = () => {
    Alert.alert(
      "Invalid QR Code",
      "This QR Code is invalid to join Queue",
      [
        {
          text: "Cancel",
          onPress: () => navigation.goBack(),
          style: "cancel"
        },
        { text: "Try Again", onPress: () => setScanned(false) }
      ],
      { cancelable: false }
    );
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={globalStyles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}