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
        backgroundColor: '#3498DB',
        padding: 10,
        borderRadius: 15,
        color: 'white',
        fontSize: 20,
        marginTop: 20,
        fontFamily: 'RobotoRegular'
      },
      secondaryButton:{
        backgroundColor: '#E74C3C',
        padding: 10,
        borderRadius: 15,
        color: 'white',
        fontSize: 20,
        marginTop: 20,
        fontFamily: 'RobotoRegular'
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
      h1:{
        fontSize: 50,
        fontFamily: 'RobotoBold'
      },
      h2:{
        fontSize: 40,
        fontFamily: 'RobotoBold'
      },
      h3:{
        fontSize: 30,
        fontFamily: 'RobotoRegular',
      },
      h4:{
        fontSize: 20,
        fontFamily: 'RobotoRegular'
      },
      h5:{
        fontSize: 15,
        fontFamily: 'RobotoRegular'
      },
      

});