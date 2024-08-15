import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import 'nativewind';
import { FontAwesome } from '@expo/vector-icons';

const GiveNewReference = () => {

  const router = useRouter();

  const today = new Date();
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
  const [isTrue, setisTrue] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const sendFormData = async () => {

    try {
      setisLoading(true);
      const response = await fetch('https://bbmoapp.bbnglobal.net/api/references/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
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
        console.log(result);
        setisTrue(true);
      } else {
        setisTrue(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setisTrue(false);
    } finally {
      setisLoading(false);
    }
  };

  console.log([
    {
      References_Details: {
        _date,
        noOfReferences
      },

      References: {
        chapter,
        member,
        nameOfReferral,
        urgency,
        mobile1,
        mobile2,
        addressLine1,
        addressLine2,
        email,
        remarks,
        location,
        pincode
      }
    }
  ])

  if (isLoading) {
    return (
      <View className="flex justify-center items-center">
        <Text className="text-xl text-gray-400">Loading...</Text>
      </View>
    )
  } else {
    return (
      <View className="bg-blue-500 flex-1 justify-between">
        <ScrollView className="bg-white h-[80%] w-full px-4 py-4 " scrollToOverflowEnabled={true}>
          <Text className={`${isTrue ? 'text-green-500 bg-green-200 p-2' : 'text-red-500 bg-red-200 p-2'} text-center my-4`}>{isTrue ? 'True reference is Saved' : ''}</Text>
          <View className="flex gap-4">
            <Text className="text-black text-lg bg-gray-200 border-gray-300 border w-full p-3 mt-7">Refferal Details</Text>
            <View>
              <Text className="text-lg">Date</Text>
              <TextInput
                // defaultValue={_date}
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setDate(e)
                }}
              >{todysdate}</TextInput>
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
              <TextInput
                defaultValue={chapter}
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setChapter(e);
                }}
              />
            </View>
            <View>
              <Text className="text-lg">Member{' '}<Text className="text-red-500">*</Text></Text>
              <TextInput
                defaultValue={member}
                className="p-2 text-lg text-black border border-gray-300"
                onChangeText={(e) => {
                  setMember(e);
                }}
              />
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
            <TouchableOpacity onPress={() => { setisTrue(false) }} className="bg-red-500 p-2 w-[100px] inline-flex justify-center items-center rounded-md"><Text className='text-lg text-white'>cancel</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default GiveNewReference;
