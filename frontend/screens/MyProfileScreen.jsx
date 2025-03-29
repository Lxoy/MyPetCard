import React, { useState, useContext } from 'react';
import { Button, FlatList, RefreshControl, ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { AuthContext } from '../context/AuthContext';

export default function MyProfileScreen() {
    const { userData, logout } = useContext(AuthContext);

    return (
        <View style={styles.body}>
            <Text style={styles.text}>
                Hello, {userData.username}
            </Text>
            <TouchableOpacity 
                className='m-5 bg-primary items-center justify-center rounded-full w-80 h-12' 
                onPress={() => {logout()}}
            >
            <Text className='text-accent font-poppins_bold text-lg'>Log Out</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        color: '#000',
        fontSize: 25,
        fontStyle: 'italic',
        margin: 15
    },
});