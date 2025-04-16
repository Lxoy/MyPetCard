import React, {useState} from 'react';
import { Button, FlatList, RefreshControl, ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function AccountSettingsScreen () {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>
            Edit Account
            </Text>
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