import { View, Text, Image } from 'react-native'
import React from 'react'


export default function LoginScreen() {
  return (

    // logo
    <View className="bg-background flex justify-start items-center h-full">
      <Image className="h-[350px] w-[350px] absolute" source={require('../img/logo-transparent.png')} />

      {/* title */}
      <View className='h-full w-full flex justify-around pt-40 pb-10'>
        <View className='flex items-center'>
          <Text className='font-bold tracking-wider text-5xl text-secondary'>Login</Text>
        </View>
      </View>
    
      {/* form */}
      <View className='flex items-center mx-4 space-y-4'>
        <View className='bg-black p-5 rounded-2xl w-full'></View>
      </View>

    </View>
  )
}