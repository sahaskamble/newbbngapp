import { View, Text, Image } from 'react-native'
import React from 'react'
import Loader from '../assets/images/loader.gif';

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-white text-2xl">BBN Global</Text>
      <Image source={Loader} />
    </View>
  )
}
