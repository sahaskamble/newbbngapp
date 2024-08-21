import SideNavbar from '@/components/SideNavbar';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'nativewind';
import { useEffect, useState } from 'react';
import { TouchableOpacity, ScrollView, Text, View, SafeAreaView, Modal, TextInput } from 'react-native';

export default function GivenReferences() {

  const today = new Date();
  const todysdate = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
  const [_date, setDate] = useState(todysdate);
  const [References, setReferences] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Takeaction, setTakeaction] = useState(false);

  const fetchReferences = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);

      const response = await fetch(`https://bbmoapp.bbnglobal.net/api/references/index/received`, {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow"
      });

      const data = await response.json();

      if (response.status === 200) {
        setdata(true);
        console.log(data);
        setReferences(data.references);
      } else {
        setReferences([]);
      }
    } catch (e) {
      console.error('JSON parse error Help', e);
    } finally {
      setisLoading(false);
      setdata(false)
    }
  }

  useEffect(() => {
    fetchReferences();
  }, [])

  // console.log(References," ",data)
  console.log(data)

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
                      <View className='w-full flex justify-center items-center gap-4 my-2'>
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible(true);
                            setTakeaction(true);
                          }}
                          className='w-full bg-blue-500 p-2 text-center rounded-md'>
                          <Text className='text-white text-center'>Take Action</Text>
                        </TouchableOpacity>
                        {
                          reference.Reference.status === 'Business Done' ? (
                            <TouchableOpacity
                              onPress={() => {
                                setModalVisible(true);
                              }}
                              className='w-full bg-teal-500 p-2 text-center rounded-md'>
                              <Text className='text-white text-center'>Send Thank you Slip</Text>
                            </TouchableOpacity>
                          ) : ('')
                        }
                      </View>
                    </View>
                    <Modal
                      animationType="fade"
                      transparent={true}
                      visible={modalVisible}
                      onRequestClose={() => setModalVisible(false)}
                    >
                      <View className="flex-1 justify-center items-center bg-[#00000020] p-4">
                        <View className="w-80 bg-white rounded-lg p-6">
                          {
                            Takeaction ? (
                              <View className='my-2'>
                                <View>
                                  <Text>Date</Text>
                                  <TextInput
                                    className='text-lg p-2 my-3 bg-gray-300 rounded-lg'
                                    defaultValue={_date}
                                  />
                                </View>
                                <View>
                                  <Text>Status</Text>
                                  <TextInput
                                    className='text-lg p-2 my-3 bg-gray-300 rounded-lg'
                                  />
                                </View>
                                <View>
                                  <Text>Comment</Text>
                                  <TextInput
                                    className='text-lg p-2 my-3 bg-gray-300 rounded-lg'
                                  />
                                </View>
                              </View>
                            ) : (
                              <View className='my-2'>
                                <View>
                                  <Text>Amount</Text>
                                  <TextInput
                                    className='text-lg p-2 my-3 bg-gray-300 rounded-lg'
                                  />
                                </View>
                                <View>
                                  <Text>narration</Text>
                                  <TextInput
                                    className='text-lg p-2 my-3 bg-gray-300 rounded-lg'
                                  />
                                </View>
                                <View>
                                  <Text>testimonial</Text>
                                  <TextInput
                                    className='text-lg p-2 my-3 bg-gray-300 rounded-lg'
                                  />
                                </View>
                              </View>
                            )
                          }
                          {/* Button to close the modal */}
                          <View className='flex-row justify-center items-center gap-4 py-2 px-4'>
                            <TouchableOpacity
                              onPress={() => { setModalVisible(false) }}
                              className="w-1/2 p-2 bg-blue-500 rounded"
                            >
                              <Text className="text-white text-lg text-center">{Takeaction ? 'Take Action' : 'Send slip'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => { setModalVisible(false); setTakeaction(false); }}
                              className="w-1/2 p-2 bg-red-500 rounded"
                            >
                              <Text className="text-white text-lg text-center">Cancel</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
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
