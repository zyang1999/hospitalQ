import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles';
import User from '../api/user';
import { AuthContext } from '../App';

export default function SignIn({ navigation }) {

  const { signIn } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const loginPressed = () => {
    setEmailError(null);
    setPasswordError(null);
    User.login({ email: email, password: password }).then(response => {
      if (response.success) {

      } else {
        if (response.type == 'validation') {
          if (response.message.email) {
            setEmailError(response.message.email);
          }

          if (response.message.password) {
            setPasswordError(response.message.password);
          }
        } else {
          Alert.alert(
            "Invalid Account",
            JSON.stringify(response.message).replace(/\"/g, ""),
            [
              { text: "OK" }
            ],
            { cancelable: false }
          );
        }
      }
    });

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.appTitle}>HospitalQ</Text>
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

        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={() => signIn()}
        >
          <Text style={{ color: 'white' }}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={globalStyles.registerButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={{ color: 'blue' }}>Register for new account</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>

  );
}