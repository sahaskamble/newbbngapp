import { View, Text, ScrollView, Image, Dimensions, BackHandler, Alert, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import 'nativewind';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Api_Url } from '@/constants/host_name';
import LottieView from 'lottie-react-native';

export default function DashBoard() {

  const [data, setData]: any = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const fetchDashboard = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const res = await fetch(`${Api_Url}/api/dashboard`, {
        method: 'GET',
        headers: myHeaders,
      });
      const data = await res.json();

      if (res.ok) {
        setData(data.data);
        console.log(await AsyncStorage.getItem('isLoggedIn'))
      } else {
        console.log(")I'm failed to fetch");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setisLoading(false);
    }
  }

  function handleRefreshing() {
    setRefreshing(true);
    fetchDashboard();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  useEffect(() => {
    fetchDashboard();

    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 justify-center bg-white items-center">
        <LottieView
          autoPlay
          source={require('@/assets/loader.json')}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    )
  }
  return (
    <>
      <ScrollView
        className='bg-gray-200'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefreshing} />
        }
      >
        <View className="pt-4">
          <Image
            style={{
              width: '94%',
              height: 100,
              marginHorizontal: 'auto',
            }}
            source={{ uri: 'https://bbmoapp.bbnglobal.net/img/banner.jpg' }}
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
                data.events?.map((item: any, index: any) => (
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
                data.meetings?.map((item: any, index: any) => (
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
                data.message?.map((item: any, index: any) => (
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
