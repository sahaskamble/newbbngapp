import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import 'nativewind';
import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, Text, View, Modal, TextInput, BackHandler } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function GivenReferences() {
  const [modalVisible, setModalVisible] = useState(false);
  const [References, setReferences] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [Testimonial, setTestimonial] = useState('');
  const [Id, setId] = useState('');

  const fetchReferences = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      console.log(username, " ", password)
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);

      const response = await fetch(`https://bbmoapp.bbnglobal.net/api/references/index/given`, {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow"
      });

      const data = await response.json();

      // console.log("hellp")
      if (response.status === 200) {
        // console.log(data);
        setdata(data)
        setReferences(data.references);
      } else {
        setReferences([]);
      }
    } catch (e) {
      console.error('JSON parse error Help', e);
    } finally {
      setisLoading(false);
    }
  }

  const AddTestimonial = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);

      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/references/add_testimonial`, {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body: JSON.stringify({
          "Reference": {
            "id": Id,
            "testimonial": Testimonial
          }
        })
      });

      const result = await res.json();
      if (result) {
        console.log(result);
      }
    } catch (err) {
      throw console.error(err)
    } finally {
      setisLoading(false);
    }
  }

  const DeleteReference = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      console.log(authString)

      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/references/delete/${Id}`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      });

      const data = await res.json();
      if (data.success === true) {
        console.log(data);
        fetchReferences();
      }
    } catch (err) {
      throw console.error
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
    fetchReferences();
  }, [])

  // console.log(References, " ", data)
  console.log(Id, "ReferenceId")

  return (
    <View className='flex-1 bg-gray-200'>
      {
        isLoading ? (
          <View className='flex-1 justify-center items-center'>
            <Text className='text-xl text-gray-500'>Loading...</Text>
          </View>
        ) : (
          <View className='px-4 py-2'>
            <ScrollView className='w-full'>
              {References.map((reference, index) => (
                <View key={index} className='w-full bg-white h-auto p-4 text-gray-500 my-2 rounded-lg'>
                  <Text className='text-xl font-bold text-gray-600'>To : {reference.Reference.to_whom}</Text>
                  <View>
                    <Text
                      className='text-lg py-2'
                    >
                      Referral Name : {reference.Reference.name_of_referral} ,
                    </Text>
                    <View className='w-full inline-flex flex-row justify-start items-center'>
                      <Text
                        className='bg-teal-400 text-white p-1'
                      >
                        {reference.Reference.date}
                      </Text>
                      <Text
                        className={`font-bold inline-block p-1 ${reference.Reference.status === 'Business Done' ? 'bg-green-400 text-white' : 'bg-gray-400 text-white'}`}
                      >
                        {reference.Reference.status}
                      </Text>
                    </View>
                    {
                      reference.ReferenceTrack[0].comment === ''
                        ? [] :
                        <Text
                          className='text-black my-2 text-xl'
                        >
                          "
                          {reference.ReferenceTrack[0].comment}
                          "
                        </Text>
                    }
                    <Text className='my-2'>
                      {reference.Reference.address_line_1}
                    </Text>
                    <View className='inline-flex flex-row items-center gap-4 py-2'>
                      <FontAwesome name='paper-plane-o' size={20} color="gray" />
                      <Text className='text-lg text-gray-500'>
                        {reference.Reference.email}
                      </Text>
                    </View>
                    <View className='w-full justify-center items-center'>
                      <View className='w-full flex-row justify-center items-center gap-4 px-2 my-3'>
                        <TouchableOpacity onPress={() => { router.navigate('/new_references') }} className='w-[50%] bg-blue-500 p-2 text-center rounded-md'>
                          <Text className='text-white text-center'>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setId(reference.Reference?.id); DeleteReference(); }} className='w-[50%] bg-red-500 p-2 text-center rounded-md'>
                          <Text className='text-white text-center'>Delete</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity onPress={() => { setModalVisible(true); setId(reference.Reference?.id); }} className='w-full bg-teal-500 p-2 text-center rounded-md'>
                        <Text className='text-white text-center'>Add Testimonial</Text>
                      </TouchableOpacity>
                    </View>
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                    >
                      <StyledView className="flex-1 justify-center items-center bg-[#00000020]">
                        <StyledView className="w-80 bg-white rounded-lg p-6">
                          <StyledText className="text-lg font-bold mb-2">Add Testimonial</StyledText>
                          <TextInput
                            className='text-lg p-2 my-3 bg-gray-300 rounded-lg'
                            defaultValue={Testimonial}
                            onChangeText={(e) => {
                              setTestimonial(e);
                            }}
                          />
                          {/* Button to close the modal */}
                          <StyledView className='flex-row justify-center items-center gap-4'>
                            <StyledTouchableOpacity
                              onPress={() => { AddTestimonial(); setModalVisible(false); setTestimonial('') }}
                              className="p-2 bg-blue-500 rounded"
                            >
                              <StyledText className="text-white text-lg text-center">Save Testimonial</StyledText>
                            </StyledTouchableOpacity>
                            <StyledTouchableOpacity
                              onPress={() => setModalVisible(false)}
                              className="p-2 bg-red-500 rounded"
                            >
                              <StyledText className="text-white text-lg text-center">Cancel</StyledText>
                            </StyledTouchableOpacity>
                          </StyledView>
                        </StyledView>
                      </StyledView>
                    </Modal>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )
      }
    </View>
  );
}

// <TouchableOpacity className='w-[33%] bg-red-500 p-2 text-center rounded-md'>
//   <Text className='text-white text-center'>Delete</Text>
// </TouchableOpacity>
