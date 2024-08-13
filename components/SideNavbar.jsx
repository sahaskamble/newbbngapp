import { View, Text, Image, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import 'nativewind';
import { FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';

export default function SideNavbar() {

  const [isOpen1, setisOpen1] = useState(false);
  const [isOpen2, setisOpen2] = useState(false);
  const [isOpen3, setisOpen3] = useState(false);
  const [isOpen4, setisOpen4] = useState(false);
  const [closeNav, setcloseNav] = useState(false);

  return (
    <>
      <View className='relative'>
        <View className='bg-blue-500 absolute w-full h-[60px] flex-row justify-between items-center px-4'>
          <Pressable onPress={() => { closeNav ? setcloseNav(false) : setcloseNav(true) }}>
            <FontAwesome name='bars' size={35} color={'#fff'} />
          </Pressable>
          <View>
            <Image
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#fff',
                borderRadius: 50
              }}
              source={require('@/assets/images/logo.png')}
            />
          </View>
        </View>
      </View>
      <View className={`${closeNav ? 'left-0' : 'left-[-500px] duration-700'} w-[80%] h-[92%] bg-white duration-500 absolute z-50 top-0 px-2`}>
        <Pressable onPress={() => { closeNav ? setcloseNav(false) : setcloseNav(true) }} className='fixed flex justify-center items-end p-2'>
          <FontAwesome name='close' size={40} color={'#000'} />
        </Pressable>
        <View className='flex justify-center items-center mt-4'>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('@/assets/images/logo.png')}
          />
          <Text className='text-blue-500 text-xl'>Welcome, Amarnath Sathe</Text>
        </View>
        <ScrollView className='h-full mt-4'>
          <View className='flex h-full justify-between'>
            <View className=''>
              <View className='mb-3'>
                <Text className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='dashboard' size={25} />{"  "} Dashboard</Text>
              </View>
              <View className='mb-3'>
                <Text onPress={() => { isOpen1 ? setisOpen1(false) : setisOpen1(true) }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='bell-o' size={25} />{"  "} References </Text>
                {
                  isOpen1 ? (
                    <View className='text-blue-500 px-4'>
                      <TouchableOpacity className='text-blue-500 my-2'>
                        <Text className='text-blue-500'>Given References</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Give New References</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Received References</Text>
                      </TouchableOpacity>
                    </View>
                  ) : ('')
                }
              </View>
              <View className='mb-3'>
                <Text onPress={() => { isOpen2 ? setisOpen2(false) : setisOpen2(true) }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='envelope' size={25} />{"  "} Done Deals</Text>
                {
                  isOpen2 ? (
                    <View className='text-blue-500 px-4'>
                      <TouchableOpacity className='text-blue-500 my-2'>
                        <Text className='text-blue-500'>Given References</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Give New References</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Received References</Text>
                      </TouchableOpacity>
                    </View>
                  ) : ('')
                }
              </View>
              <View className='mb-3'>
                <Text onPress={() => { isOpen3 ? setisOpen3(false) : setisOpen3(true) }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='heart-o' size={25} />{"  "} One to Ones</Text>
                {
                  isOpen3 ? (
                    <View className='text-blue-500 px-4'>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2'>Mark Done Deals</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Business Given</Text>
                      </TouchableOpacity>
                    </View>
                  ) : ('')
                }
              </View>
              <View className='mb-3'>
                <Text onPress={() => { isOpen4 ? setisOpen4(false) : setisOpen4(true) }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='heart-o' size={25} />{'  '} Requirements</Text>
                {
                  isOpen4 ? (
                    <View className='text-blue-500 px-4'>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2'>Mark Done Deals</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Business Given</Text>
                      </TouchableOpacity>
                    </View>
                  ) : ('')
                }
              </View>
            </View>
          </View>
        </ScrollView>
        <View className='mb-3'>
          <Text className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='sign-out' size={25} />{"  "} Logout</Text>
        </View>
      </View>
    </>
  )
}
