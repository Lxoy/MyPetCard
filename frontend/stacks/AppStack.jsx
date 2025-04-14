import React from 'react';
import { View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
} from '@fortawesome/free-solid-svg-icons';

import {
    faNewspaper,
    faComment,
    faUser
} from '@fortawesome/free-regular-svg-icons'

import MyPetsScreen from '../screens/MyPetsScreen';
import ForumScreen from '../screens/ForumScreen';
import VetsScreen from '../screens/VetsScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'MyPets', component: MyPetsScreen, icon: faHouse },
  { name: 'Vets', component: VetsScreen, icon: faNewspaper },
  { name: 'Forum', component: ForumScreen, icon: faComment },
  { name: 'MyProfile', component: MyProfileScreen, icon: faUser },
];

const TabIcon = ({ icon, color, focused }) => (
  <View className="relative items-center justify-center w-8 h-10">
    <FontAwesomeIcon icon={icon} size={22} color={color} />
    {focused && (
      <View className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-jetblack" />
    )}
  </View>
);

export default function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#2C2C2E',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: Platform.OS === 'ios' ? 65 : 55,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 5,
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
        },
      }}
    >
      {screens.map(({ name, component, icon }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icon} color={color} focused={focused} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
