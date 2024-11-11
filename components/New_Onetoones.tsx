import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, BackHandler, ActivityIndicator } from 'react-native';
import 'nativewind';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const New_OneToOne = () => {

  const today = new Date();
  const [chapters, setchapters]: any = useState([]);
  const [members, setmembers]: any = useState([]);
  const [mem, setmem] = useState({});
  const todysdate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
  const [_date, setDate] = useState(todysdate);
  const [chapter, setChapter] = useState('');
  const [member, setMember] = useState('');
  const [remarks, setRemarks] = useState('');
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
      const response = await fetch('https://bbmoapp.bbnglobal.net/api/OneToOnes/edit', {
        method: 'POST',
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          "OneToOne": {
            "date": _date,
            "chapter_id": chapter,
            "member_id": member,
            "remarks": remarks,
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

  const fetchChapter = async () => {
    setisLoading(true);
    try {
      console.log("uname", Username)
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${Username}:${Password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/chapters/index`, {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow"
      });

      const data1 = await res.json();
      if (data1) {
        setchapters(data1.chapters)
      }
    } catch (e) {
      throw console.error(e);
    }
    finally {
      setisLoading(false);
    }
  }

  const fetchmembers = async () => {
    setisLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${Username}:${Password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/members/getmembers/${chapter}`, {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow"
      });
      const data1 = await res.json();
      setmem(data1);
      if (mem) {
        if (data1) {
          setmembers(data1.members);
        }
      }
    } catch (e: any) {
      throw console.error(e);
    }
    finally {
      setisLoading(false);
    }
  }

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
    if (Details) {
      fetchChapter();
      if (chapter) {
        fetchmembers();
      }
    }
  }, [Details, chapter]);

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
            <Text className="text-black text-lg bg-gray-200 border-gray-300 border w-full p-3 mt-7">Refferal Details</Text>
            <View>
              <Text className="text-lg">Date</Text>
              <TextInput
                defaultValue={_date}
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setDate(e)
                }}
              />
            </View>
          </View>

          <View className="flex gap-4 py-8">
            <Text className="text-black text-lg bg-gray-200 border-gray-300 border w-full p-3 mt-7">Reference</Text>
            <View>
              <Text className="text-lg">Chapter{' '}<Text className="text-red-500">*</Text></Text>
              <Picker
                selectedValue={chapter}
                onValueChange={(itemValue) => setChapter(itemValue)}
                style={{
                  height: 50,
                }}
              >
                <Picker.Item label='--select--' value='0' />
                {
                  chapters?.map((chap: any, index: any) => {
                    return (
                      <Picker.Item key={index} label={chap.Chapter?.chapter} value={chap.Chapter?.id} />
                    )
                  })
                }
              </Picker>
            </View>
            <View>
              <Text className="text-lg">Member{' '}<Text className="text-red-500">*</Text></Text>
              <Picker
                selectedValue={member}
                onValueChange={(itemValue) => { setMember(itemValue) }}
                style={{
                  height: 50,
                }}
              >
                <Picker.Item label='--select--' value='0' />
                {
                  members?.map((mem: any, index: any) => {
                    return (
                      <Picker.Item key={index} label={mem.Member?.name} value={mem.Member?.id} />
                    )
                  })
                }
              </Picker>
            </View>
            <View>
              <Text className="text-lg">Remarks</Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setRemarks(e);
                }}
              />
            </View>
          </View>
          <View className='w-full h-auto my-4 px-4 pb-4 flex flex-row'>
            <TouchableOpacity onPress={() => { sendFormData() }} className="bg-blue-500 p-2 w-[100px] mr-2 inline-flex flex-row justify-center items-center rounded-md"><Text className='text-lg text-white'>save</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => null} className="bg-red-500 p-2 w-[100px] inline-flex justify-center items-center rounded-md"><Text className='text-lg text-white'>cancel</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default New_OneToOne;
