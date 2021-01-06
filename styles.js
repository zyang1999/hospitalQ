import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: '10%',
        paddingVertical: '40%',
        backgroundColor: '#0883ff'
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

});