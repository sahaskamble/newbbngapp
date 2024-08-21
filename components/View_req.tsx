import { View, Text, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function View_Requirement() {
  const [isLoading, setisLoading] = useState(false);
  const [Data, setData]: any = useState([]);
  const [Search, setSearch] = useState('');

  const fetchRequirements = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      console.log(username, " ", password);
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);

      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/requirements`, {
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
    fetchRequirements();
  }, []);

  const filteredData = Data.data?.filter((list: any) => {
    // Search logic based on name, chapter, or any other relevant field
    const searchLower = Search.toLowerCase();
    return (
      list.Member?.name?.toLowerCase().includes(searchLower)
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
      <ScrollView className='px-2'>
        {
          Data.requirements?.map((list: any, index: number) => (
            <View
              key={index}
              className='my-2 py-2 px-4 bg-white'
            >
              <View className='sm:flex-row justify-between items-start my-1'>
                <Text className='text-lg font-bold'>{list.Requirement?.heading}</Text>
                <Text className=''>{list.Requirement?.requirement}</Text>
                <View className='flex-row items-center mt-6'>
                  <Ionicons name='person' color={'gray'} size={20} />
                  <Text className='mx-2 text-gray-500'>{list.Member?.name}</Text>
                </View>
              </View>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
}

