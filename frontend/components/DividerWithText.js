import React from 'react';
import { View, Text} from 'react-native';

// tailwind
import "../css/global.css";

export default function DividerWithText({ text }) {
    return (
        <View className="flex-row items-center my-4">
          <View className="h-1 my-4 mx-2 bg-slate-800" />
          <Text className="mx-2 text-gray-600font-semibold">{text}</Text>
          <View className="h-1 my-4 mx-2 bg-gray-400" />
        </View>
      );
}