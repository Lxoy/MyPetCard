import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaw, faHouseMedical, faAddressCard, faComments } from '@fortawesome/free-solid-svg-icons';

// screens
import MyPetsScreen from '../screens/MyPetsScreen';
import ForumScreen from '../screens/ForumScreen';
import VetsScreen from '../screens/VetsScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

// styles
const tabBarOptions = {
    headerShown: false,
    tabBarStyle: { backgroundColor: '#3F72AF', height: 70, paddingBottom: 10, borderTopWidth: 0, elevation: 0 },
    tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
    tabBarActiveTintColor: '#112D4E',
    tabBarInactiveTintColor: '#DBE2EF',
};

const Tab = createBottomTabNavigator();

const screens = [
    { name: "MyPets", component: MyPetsScreen, icon: faPaw },
    { name: "Vets", component: VetsScreen, icon: faHouseMedical },
    { name: "Forum", component: ForumScreen, icon: faComments },
    { name: "MyProfile", component: MyProfileScreen, icon: faAddressCard },
];

export default function AppStack() {

    return (
        <Tab.Navigator screenOptions={tabBarOptions}>
            {screens.map(({ name, component, icon }) => (
                <Tab.Screen 
                    key={name} 
                    name={name} 
                    component={component} 
                    options={{
                        tabBarIcon: ({ color, size }) => <FontAwesomeIcon icon={icon} size={size} color={color} />,
                    }} 
                />
            ))}
        </Tab.Navigator>
    );
}
