import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import User from '../api/user';

export default function Login({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const loginPressed = () => {

      User.login({email: email, password: password}).then(response => setResponse(response));
      if(response.sucess == 'fail'){
        console.log(fail)
      }
    }



  return (
    <View style={styles.container}>
        <Text style={styles.appTitle}>HospitalQ</Text>
        <TextInput 
            style={styles.input}
            placeholder = 'Email'
            onChangeText={(email) => setEmail(email)}
        />

        <TextInput 
            style={styles.input}
            placeholder = 'Password'
            secureTextEntry ={true}
            onChangeText={(password) => setPassword(password)}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '10%',
    fontFamily: 'Cochin',
    paddingVertical: '40%'
  },
  input:{
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  registerButton: {
    marginTop: 20,
    alignItems:'center',
    fontFamily: "Cochin"
    
  },
  appTitle:{
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 20
  }
});
