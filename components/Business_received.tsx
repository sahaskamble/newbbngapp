import { View, Text, ScrollView, TextInput, BackHandler, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Business_given() {
  const [isLoading, setisLoading] = useState(false);
  const [Data, setData]: any = useState([]);
  const [Search, setSearch] = useState('');

  const fetchGiven = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      console.log(username, " ", password);
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);

      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/ThankYouSlips/index/given`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      });

      const data = await res.json();
      if (data) {
        console.log(data);
        setData(data);
      }
    } catch (err) {
      throw console.error(err);
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();

  }, [])

  useEffect(() => {
    fetchGiven();
  }, []);

  const filteredData = Data.data?.filter((list: any) => {
    // Search logic based on name, chapter, or any other relevant field
    const searchLower = Search.toLowerCase();
    return (
      list.Member?.name?.toLowerCase().includes(searchLower) ||
      list.Chapter?.chapter?.toLowerCase().includes(searchLower) ||
      list.ThankYouSlip?.date?.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <View className='px-10 py-6 bg-white flex justify-center items-center rounded-md' style={{ elevation: 5 }}>
          <ActivityIndicator color={'#3e70c9'} size={50} />
        </View>
      </View>
    );
  }
  return (
    <View className='flex-1 w-full bg-gray-200'>
      <View className='px-2 py-2'>
        <View className='flex-row items-center border border-gray-300 px-3 rounded-lg bg-white'>
          <TextInput
            placeholder='Search'
            placeholderTextColor={'gray'}
            className='text-lg my-2 flex-1'
            value={Search}
            onChangeText={setSearch} // Update Search state
          />
          <Ionicons name='search' color={'gray'} size={28} />
        </View>
      </View>
      <ScrollView className='px-2'>
        {
          filteredData?.map((list: any, index: number) => (
            <View
              key={index}
              className='my-2 py-2 px-4 bg-white'
            >
              <Text className='text-lg font-bold'>No.{index + 1}</Text>
              <View className='sm:flex-row justify-between items-start gap-3 my-1'>
                <Text className='text-lg'><Text className='font-bold'>Date : </Text>{list.ThankYouSlip?.date}</Text>
                <Text className='text-lg'><Text className='font-bold'>Chapter : </Text>{list.Chapter?.chapter}</Text>
              </View>
              <View className='sm:flex justify-between items-start gap-3 my-1'>
                <Text className='text-lg'><Text className='font-bold'>From : </Text>{list.Reference?.name_of_referral}</Text>
                <Text className='text-lg'><Text className='font-bold'>Amount : </Text>{list.ThankYouSlip?.amount}</Text>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

