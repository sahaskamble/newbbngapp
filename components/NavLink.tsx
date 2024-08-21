import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function NavLink({ link, routename, icon }: any) {

  const [MenuOpen, setMenuOpen] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setMenuOpen(!MenuOpen);
        if (link) {
          router.navigate(link);
          console.log("hell0", link)
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
    </TouchableOpacity>
  )
}
