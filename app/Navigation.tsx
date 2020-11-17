import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { verifyUserSession } from './redux/actions/verifySessionAction';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import Home from './screens/Home';
import UpdateProfile from './screens/UpdateProfile';
import { fireAuth, fireStorage } from './firebase/firebase';
import PetDetails from './screens/PetDetails';

const Stack = createStackNavigator();

const Navigation = ({ isAuthenticated, verifyUser }) => {

  useEffect(() => {
    verifyUser()
  }, [])

  return (
    <NavigationContainer>
      {
        !isAuthenticated ?
        <Stack.Navigator>
          <Stack.Screen name='signin' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='signup' component={SignUp} options={{ headerShown: false }} />
        </Stack.Navigator>
        :
        <>
        <Stack.Navigator>
          <Stack.Screen name='home' component={Home}  options={{ headerShown: false }} />
          <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name='updateProfile' component={UpdateProfile} options={{ headerShown: false }} />
          <Stack.Screen name='petDetails' component={PetDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
        </>
      }
    </NavigationContainer>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  verifyUser: () => dispatch(verifyUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);