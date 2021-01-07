import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles';
import User from '../api/user';


export default function SignUp({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmedPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmed_password_error, setConfirmedPasswordError] = useState('');

  const createAccount = () => {
    setEmailError(null);
    setPasswordError(null);
    setConfirmedPasswordError(null);
    User.register({ email: email, password: password, password_confirmation: password_confirmation, role: 'patient' }).then(response => {
      if (response.success) {
        navigation.navigate('Home', {
          user: response.user,
        });
      } else {
        if (response.message.email) {
          setEmailError(response.message.email);
        }
        if (response.message.password) {
          setPasswordError(response.message.password);
        }
        if (response.message.confirmed_password) {
          setConfirmedPasswordError(response.message.confirmed_password);
        }
      }
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.appTitle}>Registration</Text>
        <TextInput
          style={globalStyles.input}
          placeholder='Email'
          onChangeText={(email) => setEmail(email)}
        />

        {emailError != null ? <Text style={globalStyles.errorMessage}>{emailError}</Text> : null}

        <TextInput
          style={globalStyles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        {passwordError != null ? <Text style={globalStyles.errorMessage}>{passwordError}</Text> : null}
        <TextInput
          style={globalStyles.input}
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={(password_confirmation) => setConfirmedPassword(password_confirmation)}
        />
        {confirmed_password_error != null ? <Text style={globalStyles.errorMessage}>{confirmed_password_error}</Text> : null}
        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={() => createAccount()}
        >
          <Text style={{ color: 'white' }}>CREATE A NEW ACCOUNT</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>

  );
}
