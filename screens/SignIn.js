import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../styles';
import { AuthContext } from '../services/Context';
import { PrimaryButton } from '../components/Button';
import ErrorMessage from '../components/ErrorMessage';

export default function SignIn({ navigation }) {

  const { signIn } = React.useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginPressed = () => {
    signIn(email, password).then(response => {
      if (response) {
        let message = response.message;
        if (response.type === 'validation') {
          setError(message);
        } else {
          alert('Invalid Account or password');
          setError({});
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
        {error.email && <ErrorMessage message={error.email} />}

        <TextInput
          style={globalStyles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        {error.password && <ErrorMessage message={error.password} />}

        <PrimaryButton title='LOG IN' action={loginPressed} />

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