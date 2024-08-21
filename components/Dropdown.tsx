import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router';

export default function Dropdown({ children, routename, icon, link }: any) {

  const [MenuOpen, setMenuOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          if (link) {
            router.navigate(link);
            console.log("hell0",link)
          }else{
            setMenuOpen(!MenuOpen);
          }
        }}
        className={`flex flex-row items-center px-1 py-3 ${MenuOpen ? 'bg-[#00000020]' : ''}`}
      >
        <View className='flex-row flex-1 items-center'>
          <View className='mx-3'>
            <FontAwesome name={icon} size={25} />
          </View>
          <Text className="text-lg">{routename}</Text>
        </View>
        <View className='mx-4'>
          <FontAwesome name={MenuOpen?'angle-down':'angle-right'} size={30} />
        </View>
      </TouchableOpacity>
      {
        MenuOpen ? (
          <View className='px-4 py-2'>
            {children}
          </View>
        ) : ''
      }
    </View>
  )
}
