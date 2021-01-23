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
import * as SplashScreen from 'expo-splash-screen';
import { fireAuth, fireStorage } from './firebase/firebase';
import PetDetails from './screens/PetDetails';
import PostDetails from './screens/PostDetails';
import MapView from './screens/MapView';
import ChatRoom from './screens/ChatRoom';
import Messages from './screens/Messages';
import { Image, View } from 'react-native';
import ReportedUsers from './screens/ReportUsers';
import PremiumProfile from './screens/premium-screens/PremiumProfile';
import PremiumSignUp from './screens/premium-screens/Premium_Signup';
import PremiumServices from './screens/premium-screens/Premium_Services';
import newDogBreedForm from './screens/premium-screens/newDogBreedForm';
import AddBusinessDetails from './screens/premium-screens/AddBusinessDetails';

const Stack = createStackNavigator();

const Navigation = ({ isAuthenticated, isAuthenticating, verifyUser }) => {

  useEffect(() => {
    verifyUser()
  }, [])
  
  return (
    <>
      { isAuthenticating == true ?
         <>
         </>
        :
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
              <Stack.Screen name='marketplace' component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }} />
              <Stack.Screen name='updateProfile' component={UpdateProfile} options={{ headerShown: false }} />
              <Stack.Screen name='petDetails' component={PetDetails} options={{ headerShown: false }} />
              <Stack.Screen name='postDetails' component={PostDetails} options={{ headerShown: false }} />
              <Stack.Screen name='mapView' component={MapView} options={{ headerShown: false }} />
              <Stack.Screen name='chatroom' component={ChatRoom} options={{ headerShown: false }} />
              <Stack.Screen name='messages' component={Messages} options={{ headerShown: false }} />
              <Stack.Screen name='reported' component={ReportedUsers} options={{ headerShown: false }} />
              <Stack.Screen name='premium-profile' component={PremiumProfile} options={{ headerShown: false }} />
              <Stack.Screen name='premium-signup' component={PremiumSignUp} options={{ headerShown: false }} />
              <Stack.Screen name='premium-services' component={PremiumServices} options={{ headerShown: false }} />
              <Stack.Screen name='premium-newDogBreed' component={newDogBreedForm} options={{ headerShown: false }} />
              <Stack.Screen name='addPremUserDetails' component={AddBusinessDetails} options={{ headerShown: false }} />
            </Stack.Navigator>
            </>
          }
        </NavigationContainer>
      }
    </>
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  isAuthenticating: state.user.authenticating
});

const mapDispatchToProps = (dispatch) => ({
  verifyUser: () => dispatch(verifyUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);