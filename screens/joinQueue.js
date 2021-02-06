import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { globalStyles } from '../styles';
import { baseUrl } from '../services/baseUrl';
import Api from '../services/Api';
import Modal from 'react-native-modal';
import { PrimaryButton, SecondaryButton } from '../components/Button';

export default function joinQueue({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [specialty, setSpecialty] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const ConcernModal = () => {
    let concern = '';
    return (
      <Modal
        isVisible={isVisible}
      >
        <View style={styles.modalContainer}>
          <Text>You may specify your concern to the doctor. (optional)</Text>
          <TextInput
            multiline
            style={styles.input}
            numberOfLines={4}
            onChangeText={text => concern = text}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <PrimaryButton title='SUBMIT' action={() => joinQueue(concern)} />
            </View>
            <View style={{ flex: 1 }}>
              <SecondaryButton title='NO THANKS' action={() => joinQueue(null)} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const joinQueue = (concern) => {
    try {
      Api.request('joinQueue', 'POST', { specialty: specialty, concern: concern })
        .then(response => {
          navigation.navigate('Queue', { queueId: response.queue.id })
        });
    } catch (e) {
      handleError();
    }
  }

  const handleBarCodeScanned = async ({ data }) => {
    let json;
    setScanned(true);
    json = JSON.parse(data);
    if (json.url === baseUrl) {
      setSpecialty(json.specialty)
      setIsVisible(true);
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
      <ConcernModal specialty={specialty} />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 10
  }
})