import React, {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import {styles} from '../styles';
import User from '../api/user';

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    
    const loginPressed = () => {
      setEmailError(null);
      setPasswordError(null);
      User.login({email: email, password: password}).then(response => {
        if(response.success){
          navigation.navigate('Home');
        }else{
          if(response.type == 'validation'){
            if(response.message.email){
              setEmailError(response.message.email);
            }

            if(response.message.password){
              setPasswordError(response.message.password);
            }               
          }else{
            Alert.alert(
              "Invalid Account",
              JSON.stringify(response.message).replace(/\"/g, ""),
              [
                { text: "OK" }
              ],
              { cancelable: false }
            );
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }
        }
      });
      
    }

  return (
    <View style={styles.container}>
        <Text style={styles.appTitle}>HospitalQ</Text>
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

        {passwordError != null? <Text style={styles.errorMessage}>{passwordError}</Text>: null}  
        <View style={styles.button}>
          <Button
            title='Log In'
            onPress={()=>loginPressed()}
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={{color: 'blue'}}>Register for new account</Text>
        </TouchableOpacity>
        
    </View>
  );
}