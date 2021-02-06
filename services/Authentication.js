import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadFont } from './Font';
import { AuthContext } from './Context';
import Navigation from './Navigation';
import AppLoading from 'expo-app-loading';
import Api from './Api';
import messaging from '@react-native-firebase/messaging';

export default function Authentication() {

  const fontsLoaded = loadFont();

  const initialState = {
    isLoading: true,
    isSignout: false,
    userToken: null,
  };

  const reducer = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          userRole: action.role,
          status: action.status,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
          userRole: action.role,
          status: action.status,
          role: action.role
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const _storeData = async (userToken, userRole) => {
    try {
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userRole', userRole);
    } catch (error) {
      console.log(error);
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: (email, password) => {
        return Api.request('login', 'POST', { email: email, password: password }).then(response => {
          if (response.success) {
            let userToken = response.token;
            let userRole = response.user.role;
            let userStatus = response.user.status;
            _storeData(userToken, userRole);

            messaging().getToken().then(token => Api.request('saveFcmToken', 'POST', {token: token}));
            
            messaging().onTokenRefresh(token => {
              Api.request('saveFcmToken', 'POST', { token: token });
            });

            dispatch({ type: 'SIGN_IN', token: userToken, role: userRole, status: userStatus })
          } else {
            return (response);
          }
        });
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userRole');
        } catch (error) {
          console.log(error);
        }
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (email, password, password_confirmation) => {
        let data = {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          role: 'PATIENT'
        };
        return Api.request('register', 'POST', data).then(response => {
          if (response.success) {
            let userToken = response.token;
            let userRole = response.user.role;
            let userStatus = response.user.status;
            _storeData(userToken, userRole);
            dispatch({ type: 'SIGN_IN', token: userToken, role: userRole, status: userStatus })
          } else {
            return (response);
          }
        });
      },
    }),
    []
  );

  const bootstrapAsync = async () => {
    let userToken;
    let userRole;
    try {
      userToken = await AsyncStorage.getItem('userToken');
      userRole = await AsyncStorage.getItem('userRole');
      if (userToken) {
        Api.request('getUser', 'GET', {}).then(response => {
          dispatch({ type: 'RESTORE_TOKEN', token: userToken, role: userRole, status: response.user.status });
        });
      } else {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken, role: userRole });
      }
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => { bootstrapAsync() }, []);

  if (!state.isLoading) {
    if (!fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <AuthContext.Provider value={authContext}>
          <Navigation userToken={state.userToken} userRole={state.userRole} status={state.status} />
        </AuthContext.Provider >
      );
    }
  } else {

    return <AppLoading />;
  }
}




