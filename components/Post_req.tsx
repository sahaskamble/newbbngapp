import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, BackHandler, ActivityIndicator } from 'react-native';
import 'nativewind';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const Post_req = () => {

  const today = new Date();
  const [Heading, setHeading] = useState('');
  const [Requirement, setRequirement] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Details, setDetails] = useState(false);

  const sendFormData = async () => {
    setisLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${Username}:${Password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const response = await fetch('https://bbmoapp.bbnglobal.net/api/requirements/post', {
        method: 'POST',
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          "Requirement": {
            "Heading": Heading,
            "requirement": Requirement
          }
        }),
      });

      const result = await response.json();
      if (result) {
        console.log(result, "test");
        Alert.alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setisLoading(false);
    }
  };

  const loadUserdata = async () => {
    const username: any = await AsyncStorage.getItem('username');
    const password: any = await AsyncStorage.getItem('password');
    setUsername(username);
    setPassword(password);
    setDetails(true);
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
    loadUserdata();
  }, []);

  // console.log(Username," ",Password)
  console.log(Details);

  if (isLoading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <View className='px-10 py-6 bg-white flex justify-center items-center rounded-md' style={{ elevation: 5 }}>
          <ActivityIndicator color={'#3e70c9'} size={50} />
        </View>
      </View>
    )
  } else {
    return (
      <View className="bg-blue-500 flex-1 justify-between">
        <ScrollView className="bg-white h-[80%] w-full px-4 py-4 " scrollToOverflowEnabled={true}>
          <View className="flex gap-4">
            <Text className="text-black text-lg bg-gray-100 border-gray-300 border w-full p-3 mt-7">Post your Requirement</Text>
            <View>
              <Text className="text-lg my-2">Heading</Text>
              <TextInput
                defaultValue={Heading}
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setHeading(e)
                }}
              />
            </View>
            <View>
              <Text className="text-lg my-2">Requirement</Text>
              <TextInput
                defaultValue={Requirement}
                multiline={true}
                numberOfLines={3}
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setRequirement(e)
                }}
              />
            </View>
          </View>
          <View className='w-full h-auto my-4 px-4 pb-4 flex flex-row'>
            <TouchableOpacity onPress={() => { sendFormData() }} className="bg-cyan-500 p-2 w-[100px] mr-2 inline-flex flex-row justify-center items-center rounded-md"><Text className='text-lg text-white'>Post</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Post_req;
