import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';


export default function SignUp({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>

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

        <TextInput 
            style={styles.input}
            placeholder = 'Confirm Password'
            secureTextEntry ={true}
            onChangeText={(password) => setPassword(password)}
        />

        <Button
          title='CREATE A NEW ACCOUNT'
          onPress={()=>loginPressed()}
        />
         
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent:'center'
  },
  input:{
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  button: {
    marginVertical: 10
    
  }
});
