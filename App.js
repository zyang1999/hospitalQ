import * as React from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from './screens/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Queue from './screens/Queue';
import JoinQueue from './screens/joinQueue';
import DoctorHome from './screens/DoctorHome';
import PharmacistHome from './screens/PharmacistHome';

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
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userRole: action.role,
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
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, role: userRole });
    };

    bootstrapAsync();
  }, []);

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
      signIn: async (userToken, userRole) => {
        _storeData(userToken, userRole);
        dispatch({ type: 'SIGN_IN', token: userToken, role: userRole });
      },
      signOut: () => {
        _storeData(null);
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (userToken, userRole) => {
        _storeData(userToken, userRole);
        dispatch({ type: 'SIGN_IN', token: userToken, role: userRole });
      },
    }),
    []
  );

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const Screen = () => {
    if (state.userToken == null) {
      return (
        <Stack.Navigator>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      );
    } else {
      if (state.userRole == 'PATIENT') {
        return (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
          </Tab.Navigator>
        );
      } else if (state.userRole == 'DOCTOR') {
        return (
          <Tab.Navigator>
            <Tab.Screen name="DoctorHome" component={DoctorHome} />
          </Tab.Navigator>
        );
      } else {
        return (
          <Tab.Navigator>
            <Tab.Screen name="PharmacistHome" component={PharmacistHome} />
          </Tab.Navigator>
        );
      }
    }
  }
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Screen />
        </NavigationContainer>
      </AuthContext.Provider >
    );
  }

}

export function Home() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Queue" component={Queue} />
      <Stack.Screen name="JoinQueue" component={JoinQueue} />
    </Stack.Navigator>
  );
}

