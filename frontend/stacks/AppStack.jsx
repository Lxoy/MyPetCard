import React from 'react';
import { View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faHouse,
} from '@fortawesome/free-solid-svg-icons';

import {
    faNewspaper,
    faComment,
    faUser
} from '@fortawesome/free-regular-svg-icons'

import { useNavigation } from '@react-navigation/native';

import MyPetsScreen from '../screens/petsScreens/MyPetsScreen';
import NewPetScreen from '../screens/petsScreens/NewPetScreen';
import PetScreen from '../screens/petsScreens/PetScreen';
import PetDetailsScreen from '../screens/petsScreens/PetDetailsScreen';
import ForumScreen from '../screens/appScreens/ForumScreen';
import VetsScreen from '../screens/appScreens/VetsScreen';
import MyProfileScreen from '../screens/profileScreens/MyProfileScreen';
import AccountSettingsScreen from '../screens/profileScreens/AccountSettingsScreen';
import AccountDeletionScreen from '../screens/profileScreens/AccountDeletionScreen';
import SubscriptionScreen from '../screens/profileScreens/SubscriptionScreen';
import LanguageSettingsScreen from '../screens/profileScreens/LanguageSettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyPetStack = () => (
    <Stack.Navigator initialRouteName="Pet" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyPetsMain" component={MyPetsScreen} />
        <Stack.Screen name="NewPet" component={NewPetScreen} />
        <Stack.Screen name="Pet" component={PetScreen}/>
        <Stack.Screen name="PetDetails" component={PetDetailsScreen} />
    </Stack.Navigator>
);

const MyProfileStack = () => (
    <Stack.Navigator initialRouteName="MyProfileMain" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MyProfileMain" component={MyProfileScreen} />
        <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} />
        <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        <Stack.Screen name="AccountDeletion" component={AccountDeletionScreen} />
    </Stack.Navigator>
);

const screens = [
    { name: 'MyPets', component: MyPetStack, icon: faHouse },
    { name: 'Vets', component: VetsScreen, icon: faNewspaper },
    { name: 'Forum', component: ForumScreen, icon: faComment },
    { name: 'MyProfile', component: MyProfileStack, icon: faUser },
];

const TabIcon = ({ icon, color, focused }) => (
    <View className='relative items-center justify-center w-16 h-11'>
        <FontAwesomeIcon icon={icon} size={22} color={color} />
        {focused && (
            <View className="absolute bottom-0.5 w-1.5 h-1.5 rounded-full bg-jetblack" />

        )}
    </View>
);

export default function AppStack() {
    const navigation = useNavigation();

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
                    elevation: 0, 
                    shadowColor: 'transparent',
                    shadowOpacity: 0,
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 0,
                },
            }}
        >
            
        {
            screens.map(({ name, component, icon }) => (
                <Tab.Screen
                    key={name}
                    name={name}
                    component={component}
                    options={{
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon icon={icon} color={color} focused={focused} />
                        ),
                    }}
                    {...(name === "MyPets"
                        ? {
                            listeners: {
                                tabPress: e => {
                                    e.preventDefault();
                                    navigation.navigate('MyPets', {
                                        screen: 'MyPetsMain',
                                    });
                                },
                            },
                        }
                    : {})}

                    {...(name === "MyProfile"
                        ? {
                            listeners: {
                                tabPress: e => {
                                    e.preventDefault();
                                    navigation.navigate('MyProfile', {
                                        screen: 'MyProfileMain',
                                    });
                                },
                            },
                        }
                    : {})}
        />
    ))}
        </Tab.Navigator>
    );
}
