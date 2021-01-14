import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: '10%',
    paddingVertical: '40%',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  registerButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'RobotoRegular',
    textAlign: 'center'
  },
  secondaryButton: {
    backgroundColor: '#E74C3C',
    padding: 10,
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'RobotoRegular'
  },
  appTitle: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 20
  },
  errorMessage: {
    paddingLeft: 10,
    color: 'white',
    backgroundColor: '#EF5350',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  },
  barCodeScanner: {
    marginVertical: '20%',
    marginVertical: '10%'
  },
  consultationImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    borderRadius: 30
  },
  h1: {
    fontSize: 50,
    marginVertical: 10,
    fontFamily: 'RobotoBold'
  },
  h2: {
    fontSize: 40,
    marginVertical: 10,
    fontFamily: 'RobotoBold'
  },
  h3: {
    fontSize: 30,
    marginVertical: 10,
    fontFamily: 'RobotoRegular',
  },
  h4: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'RobotoRegular'
  },
  h5: {
    fontSize: 15,
    marginVertical: 10,
    fontFamily: 'RobotoRegular'
  },
  UserQueueBox: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: 20
  },
  queueInfo: {
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10
  },
  queueStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  queueTitle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    width: '48%',
    marginVertical: 10,
    textTransform: 'uppercase',
    backgroundColor: 'white'

  },
  queueNumber: {
    fontSize: 35,
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    width: '48%',
    marginVertical: 5,
    textTransform: 'uppercase',
    backgroundColor: 'white'
  },
  serving: {
    fontSize: 20,
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    width: '48%',
    marginVertical: 5,
    textTransform: 'uppercase',
    backgroundColor: '#58D68D'
  },
  waiting: {
    fontSize: 20,
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    width: '48%',
    marginVertical: 5,
    textTransform: 'uppercase',
    backgroundColor: '#F4D03F'
  },
  container_2: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 20
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain'
  }
});