import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Queue from './screens/Queue';
import JoinQueue from './screens/joinQueue';
import {AuthContext} from './screens/context';



export default function App() {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
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

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const _storeData = async (userToken) => {
    try {
      await AsyncStorage.setItem(
        'userToken',
        userToken
      );
    } catch (error) {
      console.log(error);
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async userToken => {
        _storeData(userToken);
        dispatch({ type: 'SIGN_IN', token: userToken });
      },
      signOut: () => {
        _storeData(null);
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async userToken => {
        _storeData(userToken);
        dispatch({ type: 'SIGN_IN' });
      },
    }),
    []
  );

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
          </Tab.Navigator>         
          )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
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

