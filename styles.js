import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: '10%',
        paddingVertical: '40%'
      },
      input:{
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
      },
      registerButton: {
        marginTop: 20,
        alignItems:'center',
      },
      button:{
        marginTop: 20
      },    
      appTitle:{
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 20
      },
      errorMessage:{
        paddingLeft: 10,
        color: 'red'
      }
});