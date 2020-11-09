import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SignUp from './SignUp';

const Stack = createStackNavigator();

const Navigation = () => {
  const authenicatedUser = false;

  return (
    <NavigationContainer>
      {
        !authenicatedUser ?
        <Stack.Navigator>
          <Stack.Screen name='signin' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='signup' component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
        :
        <Stack.Navigator>
          <Stack.Screen name='home' component={Login} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  )
};

export default Navigation;