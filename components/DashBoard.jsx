import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import 'nativewind';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DashBoard() {

  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const username = 'amar@sanmisha.com';
  const password = 'amar123@';

  const fetchDashboard = async () => {
    setisLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      // console.log(username, password)
      const res = await fetch('https://bbmoapp.bbnglobal.net/api/dashboard', {
        method: 'GET',
        headers: myHeaders,
      });
      const data = await res.json();

      if (res.ok) {
        setData(data.data);
        // console.log(data);
      } else {
        console.log(")I'm failed to fetch");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, [])

  if (isLoading) {
    return(
      <View className="flex-1 justify-center bg-white items-center">
        <Text className="text-xl text-gray-600">Loading...</Text>
      </View>
    )
  }
  return (
    <>
      <ScrollView className='w-full bg-gray-200'>
        <View className="py-4">
          <Image
            style={{
              width: '94%',
              height: 150,
              marginHorizontal: 'auto',
              backgroundColor: 'blue',
            }}
            source={{ uri: 'https://bbmoapp.bbnglobal.net/img/banner.jpg' }}
            resizeMode='cover'
            className='rounded-lg'
          />
        </View>
        <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4">
          <View className='grid gap-4 place-items-center mr-[19px]'>
            <View>
            </View>
          </View>
          <View className='grid gap-4 place-items-center mr-[19px]'>
            <View className="w-full h-[120px] p-4 bg-green-400 relative rounded-md">
              <Text className="text-white text-2xl font-bold">₹ {data.business_generated}</Text>
              <Text className='uppercase text-white text-xs  my-2'>bbng business generated</Text>
              <View className='absolute right-2 bottom-0'>
                <FontAwesome name='shopping-cart' color={'#25800040'} size={60} />
              </View>
            </View>
            <View className="w-full h-[100px] p-4 bg-white relative rounded-md">
              <Text className='uppercase text-xs '>references given</Text>
              <Text className="text-black text-2xl my-1">{data.given_references}</Text>
              <Text className='text-xs '>Self</Text>
              <View className='absolute right-2 bottom-1/4'>
                <FontAwesome name='hand-o-right' color={'#80808040'} size={60} />
              </View>
            </View>
            <View className="w-full h-[100px] p-4 bg-green-400 relative rounded-md">
              <Text className="text-white text-2xl font-bold">₹ {data.chapter_business_generated}</Text>
              <Text className='uppercase text-white text-xs  my-2'>dombivli business generated</Text>
              <View className='absolute right-2 bottom-0'>
                <FontAwesome name='shopping-cart' color={'#25800040'} size={60} />
              </View>
            </View>
          </View>
          <View className='grid gap-4 place-items-center mr-[19px] my-4'>
            <View className="w-full h-[120px] p-4 bg-orange-400 relative rounded-md">
              <Text className="text-white text-2xl font-bold">₹ {data.shared_references}</Text>
              <Text className='uppercase text-white text-xs  my-2'>bbng references shared</Text>
              <View className='absolute right-2 bottom-0'>
                <MaterialCommunityIcons name='signal-cellular-outline' color={'#834E0060'} size={60} />
              </View>
            </View>
            <View className="w-full h-[100px] p-4 bg-white relative rounded-md">
              <Text className='uppercase text-xs '>business given</Text>
              <Text className="text-black text-2xl my-1">₹ {data.business_given}</Text>
              <Text className='text-xs '>Self</Text>
              <View className='absolute right-2 bottom-1/4'>
                <MaterialCommunityIcons name='receipt' color={'#80808040'} size={60} />
              </View>
            </View>
            <View className="w-full h-[100px] p-4 bg-orange-400 relative rounded-md">
              <Text className="text-white text-2xl font-bold">₹ {data.chapter_shared_references}</Text>
              <Text className='uppercase text-white text-xs  my-2'>dombivli business generated</Text>
              <View className='absolute right-2 bottom-0'>
                <MaterialCommunityIcons name='signal-cellular-outline' color={'#834E0060'} size={60} />
              </View>
            </View>
          </View>
          <View className='grid gap-4 place-items-center mr-[19px] my-4'>
            <View className="w-full h-[120px] p-4 bg-orange-400 relative rounded-md">
              <Text className="text-white text-2xl font-bold">{data.total_visitors}</Text>
              <Text className='uppercase text-white text-xs  my-2'>bbng total visitors</Text>
              <View className='absolute right-2 bottom-0'>
                <MaterialCommunityIcons name='signal-cellular-outline' color={'#834E0060'} size={60} />
              </View>
            </View>
            <View className="w-full h-[100px] p-4 bg-white relative rounded-md">
              <Text className='uppercase text-xs '>references received</Text>
              <Text className="text-black text-2xl my-1">{data.received_references}</Text>
              <Text className='text-xs '>Self</Text>
              <View className='absolute right-2 bottom-1/4'>
                <FontAwesome name='hand-o-left' color={'#80808040'} size={60} />
              </View>
            </View>
            <View className="w-full h-[100px] p-4 bg-orange-400 relative rounded-md">
              <Text className="text-white text-2xl font-bold">₹ {data.chapter_visitors}</Text>
              <Text className='uppercase text-white text-xs  my-2'>dombivli visitors</Text>
              <View className='absolute right-2 bottom-0'>
                <MaterialCommunityIcons name='signal-cellular-outline' color={'#834E0060'} size={60} />
              </View>
            </View>
          </View>
          <View className='grid gap-4 place-items-center mr-[19px] my-4'>
            <View className="w-full h-[120px] p-4 bg-orange-400 relative rounded-md">
              <Text className="text-white text-2xl font-bold">₹ {data.total_onetoones}</Text>
              <Text className='uppercase text-white text-xs  my-2'>bbng total one 2 one</Text>
              <View className='absolute right-2 bottom-0'>
                <MaterialCommunityIcons name='signal-cellular-outline' color={'#834E0060'} size={60} />
              </View>
            </View>
            <View className="w-full h-[100px] p-4 bg-white relative rounded-md">
              <Text className='uppercase text-xs '>business received</Text>
              <Text className="text-black text-2xl my-1">{data.business_received}</Text>
              <Text className='text-xs '>Self</Text>
              <View className='absolute right-2 bottom-1/4'>
                <MaterialCommunityIcons name='receipt' color={'#80808040'} size={60} />
              </View>
            </View>
            <View className="w-full h-[100px] p-4 bg-orange-400 relative rounded-md">
              <Text className="text-white text-2xl font-bold">₹ {data.chapter_onetoones}</Text>
              <Text className='uppercase text-white text-xs my-2'>dombivli one 2 one</Text>
              <View className='absolute right-2 bottom-0'>
                <MaterialCommunityIcons name='signal-cellular-outline' color={'#834E0060'} size={60} />
              </View>
            </View>
          </View>
        </View>
        <View className='px-3'>
          <View className="p-2">
            <View className="w-full p-4 bg-white relative rounded-md pl-6">
              <Text className='mb-4 mx-0 text-xl'>Upcoming Events</Text>
              {
                data.events?.map((item, index) => (
                  <View key={index} className='h-auto border border-gray-300 p-2 flex gap-2 rounded-md'>
                    <Text className="text-black text-xs font-bold">{item.Event.event}</Text>
                    <Text className="text-gray-600 text-xs font-bold">{item.Event.event_venue}</Text>
                    <View className='flex flex-row justify-end pr-2'>
                      <Text className="text-gray-600 text-xs">{item.Event.date} {item.Event.event_time}</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
          <View className="p-2">
            <View className="w-full p-4 bg-white relative rounded-md pl-6">
              <Text className='mb-4 text-xl'>Upcoming Meetings</Text>
              {
                data.meetings?.map((item, index) => (
                  <View key={index} className='h-auto border border-gray-300 p-2 flex gap-2 rounded-md'>
                    <Text className="text-black text-xs font-bold">{item.Meeting.meeting_title}</Text>
                    <Text className="text-gray-600 text-xs font-bold">{item.Meeting.meeting_venue}</Text>
                    <View className='flex flex-row justify-end pr-2'>
                      <Text className="text-gray-600 text-xs">{item.Meeting.date} {item.Meeting.meeting_time}</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
          <View className="p-2">
            <View className="w-full p-4 bg-white relative rounded-md pl-6">
              <Text className='mb-4 text-xl'>Messages</Text>
              {
                data.message?.map((item, index) => (
                  <View key={index} className='h-auto border border-gray-300 p-2 flex gap-2 rounded-md'>
                    <Text className="text-black text-xs font-bold">{item.Message.heading}</Text>
                    <Text className="text-gray-600 text-xs font-bold">{item.Message.message}</Text>
                    <View className='flex flex-row justify-end pr-2'>
                      <Text className="text-gray-600 text-xs">{item.Message.created}</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const dimension = Dimensions.get('window').width;

// <View className="flex-1 justify-center items-center mt-[100px]">
//   <TouchableOpacity className='bg-blue-500 p-4 mt-10' onPress={()=>{ router.navigate('/login') }}>
//     <Text className='text-white'>Go to Login</Text>
//   </TouchableOpacity>
// </View>

// <ScrollView className="">
//   <Text className="text-2xl text-black bg-white" onPress={() => { fetchDashboard() }}>TEST</Text>
