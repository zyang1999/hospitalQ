import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: '10%',
        paddingVertical: '40%',
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
      primaryButton:{
        marginTop: 20,
        backgroundColor: '#5DADE2',
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 40
      },    
      appTitle:{
        fontSize: 30,
        textAlign: 'center',
        paddingBottom: 20
      },
      errorMessage:{
        paddingLeft: 10,
        color: 'red'
      },
      barCodeScanner:{
        marginVertical: '20%',
        marginVertical: '10%'
      },
      consultationImage:{
        flex:1,
        width: null,
        height: null,
        resizeMode: 'contain',
        borderRadius: 30
      },
      h3:{
        fontSize: 30,
      }

});