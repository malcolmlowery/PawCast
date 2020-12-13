import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/theme';
import Newsfeed from './Newsfeed';
import Settings from './Settings';
import Messages from './Messages';
import MapView from './MapView';
import { Text } from 'react-native';
import Marketplace from './Marketplace';

const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): any => ({
        tabBarIcon: ({ focused }) => {

          switch(route.name) {
            case 'newsfeed': return <Ionicons name='ios-paper' color={focused ? colors.primary : '#c9c9c9'} size={22} />
            case 'map': return <Ionicons name='ios-map' color={focused ? colors.primary :  '#c9c9c9'} size={24} />
            case 'settings': return <Ionicons name='ios-settings' color={focused ? colors.primary: '#c9c9c9'} size={24} />
            case 'messages': return <Ionicons name='ios-mail' color={focused ? colors.primary: '#c9c9c9'} size={24} />
          }
          
        }
      })}
      tabBarOptions={{
        activeTintColor: colors.primary
      }}
    >
      <Tab.Screen name='newsfeed' component={Newsfeed}/>
      <Tab.Screen name='messages' component={Messages}/>
      <Tab.Screen
        name='marketplace' 
        component={Marketplace}
        options={{
          tabBarLabel: 'marketplace',
          tabBarIcon: ({ color, size }) => (
            <Button>
                <>
                  <Ionicons 
                    name='ios-paw' 
                    color={colors.white}
                    size={35}
                  />
                </>
              </Button>
          ),
        }}
      />
      <Tab.Screen name='map' component={MapView}/>
      <Tab.Screen name='settings' component={Settings}/>
    </Tab.Navigator>
  )
};

export default Home;

const Button = styled.View`
  justify-content: center;
  align-items: center;
  background: ${colors.primary};
  border-radius: 90px;
  height: 60px;
  width: 60px;
  margin-bottom: 10px;
  position: relative;
  top: -10px;
`;