import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './utils/theme';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Newsfeed from './screens/Newsfeed';
import Settings from './screens/Settings';
import Notifications from './screens/Notifications';
import { verifyUserSession } from './redux/actions/verifySessionAction';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Tab.Navigator
          screenOptions={({ route }): any => ({
            tabBarIcon: ({ focused }) => {

              switch(route.name) {
                case 'newsfeed': return <Ionicons name='ios-paper' color={focused ? colors.primary : '#c9c9c9'} size={26}/ >
                case 'notifications': return <Ionicons name='ios-notifications' color={focused ? colors.primary :  '#c9c9c9'} size={30}/ >
                case 'settings': return <Ionicons name='ios-settings' color={focused ? colors.primary: '#c9c9c9'} size={30}/ >
              }
              
            }
          })}
          tabBarOptions={{
            activeTintColor: colors.primary
          }}
        >
          <Tab.Screen name='newsfeed' component={Newsfeed}/>
          <Tab.Screen name='notifications' component={Notifications}/>
          <Tab.Screen name='settings' component={Settings}/>
        </Tab.Navigator>
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