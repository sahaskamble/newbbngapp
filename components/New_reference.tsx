import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import 'nativewind';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const GiveNewReference = () => {

  const today = new Date();
  const [chapters, setchapters]: any = useState([]);
  const [members, setmembers]: any = useState([]);
  const [data, setdata] = useState({});
  const [mem, setmem] = useState({});
  const todysdate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
  const [_date, setDate] = useState(todysdate);
  const [noOfReferences, setNoOfReferences] = useState('1');
  const [chapter, setChapter] = useState('');
  const [member, setMember] = useState('');
  const [urgency, setUrgency] = useState('--');
  const [nameOfReferral, setNameOfReferral] = useState('');
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [email, setEmail] = useState('');
  const [remarks, setRemarks] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [location, setLocation] = useState('');
  const [pincode, setPincode] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Message, setMessage] = useState('');
  const [Successfull, setSuccessfull] = useState(false);
  const [Details, setDetails] = useState(false);

  const sendFormData = async () => {
    setisLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${Username}:${Password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const response = await fetch('https://bbmoapp.bbnglobal.net/api/references/edit', {
        method: 'POST',
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          "ReferenceDetail": {
            "id": "",
            "date": _date,
            "no_of_references": noOfReferences
          },
          "Reference": {
            "1": {
              "chapter_id": chapter,
              "to_whom": member,
              "urgency": urgency,
              "name_of_referral": nameOfReferral,
              "mobile_1": mobile1,
              "mobile_2": mobile2,
              "email": email,
              "remarks": remarks,
              "address_line_1": addressLine1,
              "address_line_2": addressLine2,
              "city_id": location,
              "pincode": pincode
            }
          }
        }),
      });

      const result = await response.json();
      if (result) {
        console.log(result, "test");
        setMessage(result.message);
        setSuccessfull(true);
        setTimeout(() => {
          setSuccessfull(false);
        }, 2500);
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
      setdata(data1);
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
    // setisLoading(true);
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
    // finally {
    //   setisLoading(false);
    // }
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
    if (Successfull) {
      return (
        <View className="flex-1 bg-white justify-center items-center">
          <Text className="text-xl text-green-500">{Message}</Text>
        </View>
      )
    }
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-xl text-gray-600">Loading...</Text>
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
              <Text className="text-lg">Name of Refferal{' '}<Text className="text-red-500">*</Text></Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setNameOfReferral(e);
                }}
              />
            </View>
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
              <Text className="text-lg">Urgency</Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setUrgency(e);
                }}
              />
            </View>
            <View>
              <Text className="text-lg">Mobile 1{' '}<Text className="text-red-500">*</Text></Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setMobile1(e);
                }}
              />
            </View>
            <View>
              <Text className="text-lg">Mobile 2</Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setMobile2(e);
                }}
              />
            </View>
            <View>
              <Text className="text-lg">Email</Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300" placeholder="example@gmail.com"
                onChangeText={(e) => {
                  setEmail(e);
                }}
              />
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
            <View>
              <Text className="text-lg">Address Line 1</Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setAddressLine1(e);
                }}
              />
            </View>
            <View>
              <Text className="text-lg">Address Line 2</Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setAddressLine2(e);
                }}
              />
            </View>
            <View>
              <Text className="text-lg">Location</Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300" placeholder='---'
                onChangeText={(e) => {
                  setLocation(e);
                }}
              />
            </View>
            <View>
              <Text className="text-lg">Pincode</Text>
              <TextInput
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setPincode(e);
                }}
              />
            </View>
          </View>
          <View className='w-full h-auto my-4 px-4 pb-4 flex flex-row'>
            <TouchableOpacity onPress={() => { sendFormData() }} className="bg-blue-500 p-2 w-[100px] mr-2 inline-flex flex-row justify-center items-center rounded-md"><Text className='text-lg text-white'>save</Text></TouchableOpacity>
            <TouchableOpacity className="bg-red-500 p-2 w-[100px] inline-flex justify-center items-center rounded-md"><Text className='text-lg text-white'>cancel</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default GiveNewReference;
