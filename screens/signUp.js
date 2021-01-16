import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles';
import { AuthContext } from '../services/Context';
import { PrimaryButton } from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';


export default function SignUp({ navigation }) {
  const { signUp } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmedPassword] = useState('');
  const [error, setError] = useState({});
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmed_password_error, setConfirmedPasswordError] = useState('');

  const createAccount = () => {
    signUp(email, password, password_confirmation).then(response => {
      if (response) {
        let message = response.message;
        setError(message);
      }
    })
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

        {error.email && <ErrorMessage message={error.email} />}

        <TextInput
          style={globalStyles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        {error.password && <ErrorMessage message={error.password} />}
        <TextInput
          style={globalStyles.input}
          placeholder='Confirm Password'
          secureTextEntry={true}
          onChangeText={(password_confirmation) => setConfirmedPassword(password_confirmation)}
        />
        {error.password_confirmation && <ErrorMessage message={error.password_confirmation} />}
        <PrimaryButton title='CREATE A NEW ACCOUNT' action={createAccount} />

      </View>
    </TouchableWithoutFeedback>

  );
}
