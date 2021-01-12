import * as React from 'react';
import * as Font from 'expo-font';
import { AuthContext } from './screens/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import Navigation from './Navigation';
import api from './api/api';

export default function App() {

  let [fontsLoaded] = Font.useFonts({
    'RobotoRegular': require('./assets/fonts/Roboto-Regular.ttf'),
    'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
    'RobotoLight': require('./assets/fonts/Roboto-Light.ttf')
  });

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
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
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let userRole;

      try {
        userToken = await AsyncStorage.getItem('userToken');
        userRole = await AsyncStorage.getItem('userRole');
        api.request('getUser', 'GET', {}).then(response => {
          dispatch({ type: 'RESTORE_TOKEN', token: userToken, role: userRole, status: response.user.status });
        });
      } catch (e) {
        console.log(e);
      }
    };

    bootstrapAsync();
  }, []);

  const _storeData = async (userToken, userRole, status) => {
    try {
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userRole', userRole);
    } catch (error) {
      console.log(error);
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (userToken, userRole) => {
        _storeData(userToken, userRole);
        dispatch({ type: 'SIGN_IN', token: userToken, role: userRole, status: status });
      },
      signOut: () => {
        _storeData(null);
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (userToken, userRole) => {
        _storeData(userToken, userRole);
        dispatch({ type: 'SIGN_IN', token: userToken, role: userRole, status: status });
      },
    }),
    []
  );

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
  }else{
    return <AppLoading />;
  }



}
