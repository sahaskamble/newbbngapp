import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function OneToOnes() {
  const [isLoading, setisLoading] = useState(false);
  const [Data, setData]: any = useState([]);
  const [Search, setSearch] = useState('');

  const fetchOnes = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      console.log(username, " ", password);
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);

      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/OneToOnes`, {
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
    fetchOnes();
  }, []);

  const filteredData = Data.meetings?.filter((list: any) => {
    // Search logic based on name, chapter, or any other relevant field
    const searchLower = Search.toLowerCase();
    return (
      list.Member?.name?.toLowerCase().includes(searchLower) ||
      list.Chapter?.chapter?.toLowerCase().includes(searchLower) ||
      list.OneToOne?.date?.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text className='text-xl text-gray-600'>Loading...</Text>
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
              <View className='my-1'>
                <Text className='text-lg font-bold'>From : {list.Member?.name}</Text>
                <View className='flex-row items-center gap-2 my-2'>
                  <Text className='bg-cyan-400 text-white px-1'>{list.OneToOne?.date}</Text>
                  <Text className='bg-green-400 text-white px-1'>{list.OneToOne?.status}</Text>
                </View>
                <Text className='my-2'>{list.OneToOne?.remarks}</Text>
                <View className='flex-row items-center my-2'>
                  <Ionicons name='phone-portrait' size={20} />
                  <Text>: {list.Member?.mobile_1}</Text>
                </View>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

