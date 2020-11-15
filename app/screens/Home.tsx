import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import Newsfeed from './Newsfeed';
import Notifications from './Notifications';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): any => ({
        tabBarIcon: ({ focused }) => {

          switch(route.name) {
            case 'newsfeed': return <Ionicons name='ios-paper' color={focused ? colors.primary : '#c9c9c9'} size={26} />
            case 'notifications': return <Ionicons name='ios-notifications' color={focused ? colors.primary :  '#c9c9c9'} size={30} />
            case 'settings': return <Ionicons name='ios-settings' color={focused ? colors.primary: '#c9c9c9'} size={30} />
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
  )
};

export default Home;