import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  StatusBar,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const flagImages = {
  uk: require('../../img/languages/uk.png'),
  cro: require('../../img/languages/cro.png'),
};

const Language = ({ flag, language, selected, setSelected }) => (
  <TouchableOpacity
    className="w-[80%] flex-row items-center justify-between my-3 rounded"
    onPress={() => setSelected(language)}
  >
    <View className="flex-row items-center">
      <Image
        className="size-8 rounded-full"
        source={flagImages[flag]}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        }}
      />
      <Text className="ml-4 font-sfpro_regular text-xl">{language}</Text>
    </View>

    {selected === language && (
      <FontAwesomeIcon icon={faCheck} size={22} color="#003366" />
    )}
  </TouchableOpacity>
);

export default function LanguageSettingsScreen({ navigation }) {
  const [selected, setSelected] = useState('English');

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faChevronLeft} size={18} color="#4A90E2" />
        </TouchableOpacity>

        {/* Title */}
        <View className="mt-4 items-center">
          <Text className="font-sfpro_regular text-2xl text-text">Language</Text>
        </View>

        {/* Language Options */}
        <View className="mt-4 items-center">
          <Language
            language="English"
            flag="uk"
            selected={selected}
            setSelected={setSelected}
          />
          <View className="w-[90%] border-black" style={{ borderWidth: 0.75 }} />
          <Language
            language="Croatian"
            flag="cro"
            selected={selected}
            setSelected={setSelected}
          />
        </View>
      </ScrollView>
    </View>
  );
}
