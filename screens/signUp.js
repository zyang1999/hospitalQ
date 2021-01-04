import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import {styles} from '../styles';
import User from '../api/user';


export default function SignUp({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmed_password, setConfirmedPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmed_password_error, setConfirmedPasswordError] = useState('');

    const createAccount = ()=>{
      setEmailError(null);
      setPasswordError(null);
      setConfirmedPasswordError(null);
      User.register({email: email, password: password, confirmed_password:confirmed_password}).then(response =>{
        if(response.success){
          console.log("register successfully");
        }else{
          if(response.message.email){
            setEmailError(response.message.email);
          }
          if(response.message.password){
            setPasswordError(response.message.password);
          }
          if(response.message.confirmed_password){
            setConfirmedPasswordError(response.message.confirmed_password);
          }
        }
      });
    }

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Registration</Text>
        <TextInput 
            style={styles.input}
            placeholder = 'Email'
            onChangeText={(email) => setEmail(email)}
        />

      {emailError != null ? <Text style={styles.errorMessage}>{emailError}</Text>: null}

        <TextInput 
            style={styles.input}
            placeholder = 'Password'
            secureTextEntry ={true}
            onChangeText={(password) => setPassword(password)}
        />
      {passwordError != null ? <Text style={styles.errorMessage}>{passwordError}</Text>: null}
        <TextInput 
            style={styles.input}
            placeholder = 'Confirm Password'
            secureTextEntry ={true}
            onChangeText={(confirmed_password) => setConfirmedPassword(confirmed_password)}
        />
      {confirmed_password_error != null ? <Text style={styles.errorMessage}>{confirmed_password_error}</Text>: null}
        <Button
          title='CREATE A NEW ACCOUNT'
          onPress={()=>createAccount()}
        />
         
    </View>
  );
}
