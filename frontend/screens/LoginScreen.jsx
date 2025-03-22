import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'


export default function LoginScreen() {
  return (

    // logo
    <View className="bg-background h-full w-full">
      <Image className="h-[350px] w-[350px] absolute top-10 left-1/2 -translate-x-1/2" source={require('../img/logo-transparent.png')} />

      {/* title */}
      <View className='h-full w-full flex justify-around pt-10 pb-10'>
        <View className='flex items-center'>
          <Text className='font-bold tracking-wider text-5xl text-secondary'>Login</Text>
        </View>

        
        {/* form */}
        <View className='flex items-center mx-4 space-y-4'>
          <View className='bg-accent p-3 rounded-2xl w-full'>
            <TextInput className='color-secondary' selectionColor={'#112D4E'} placeholder="E-mail" placeholderTextColor={'#3F72AF'}></TextInput>
          </View>

          <View className='bg-accent p-3 rounded-2xl w-full mt-10'>
            <TextInput className='color-secondary' selectionColor={'#112D4E'} placeholder="E-mail" placeholderTextColor={'#3F72AF'}></TextInput>
          </View>
        </View>
    
      </View>
    

    </View>
  )
}