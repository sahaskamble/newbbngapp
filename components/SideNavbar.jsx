import { View, Text, Image, ScrollView, Pressable, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import 'nativewind';
import { FontAwesome, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SideNavbar() {

  const [isOpen1, setisOpen1] = useState(false);
  const [isOpen2, setisOpen2] = useState(false);
  const [isOpen3, setisOpen3] = useState(false);
  const [isOpen4, setisOpen4] = useState(false);
  const [closeNav, setcloseNav] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [userData, setuserData] = useState([]);
  const [data, setdata] = useState({});

  const fetchcreds = async () => {
    const uname = await AsyncStorage.getItem('username');
    const pass = await AsyncStorage.getItem('password');
    const Data = await AsyncStorage.getItem('userData');
    const userD = JSON.parse(Data);
    setusername(uname);
    setpassword(pass);
    setuserData(userD);
  }

  const fetchProfilePic = async () => {
    try {

      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/files/member/${userData.profile_pic_dir}/${userData.profile_pic}`);
      const data = await res.json();
      setdata(data);
    } catch (e) {
      throw console.error(e);

    }
  }

  const logout = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    router.navigate('/login');
  }

  useEffect(() => {
    fetchcreds();
  }, [])

  console.log(data)

  return (
    <>
      <View className='relative z-50'>
        <View className='bg-blue-500 absolute w-full h-[60px] flex-row justify-between items-center px-4'>
          <Pressable onPress={() => { closeNav ? setcloseNav(false) : setcloseNav(true) }}>
            <FontAwesome name='bars' size={35} color={'#fff'} />
          </Pressable>
          <Pressable
            onPress={() => {
              router.push('/profile')
            }}
          >
            <View className='bg-white my-6 w-[50px] h-[50px] rounded-full inline-flex justify-center items-center'>
              <FontAwesome name="user-o" size={30} />
            </View>
          </Pressable>
        </View>
      </View>
      <View className={`${closeNav ? 'left-0' : 'left-[-500px]'} w-[80%] h-full bg-white duration-500 absolute z-50 top-0 px-4`}>
        <Pressable onPress={() => { closeNav ? setcloseNav(false) : setcloseNav(true) }} className='fixed flex justify-center items-end p-2'>
          <FontAwesome name='close' size={40} color={'#3387cd'} />
        </Pressable>
        <View className='flex justify-center items-center mt-4'>
          <Image
            style={{
              width: 100,
              height: 100,
            }}
            source={require('@/assets/images/logo.png')}
          />
          <Text className='text-blue-500 text-xl'>Welcome, Amarnath Sathe</Text>
        </View>
        <ScrollView className='h-full mt-4'>
          <View className='flex h-full justify-between'>
            <View className=''>
              <View className='mb-3'>
                <Text onPress={() => { router.navigate('/dashboard') }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='dashboard' size={25} />{"  "} Dashboard</Text>
              </View>
              <View className='mb-3'>
                <Text onPress={() => { isOpen1 ? setisOpen1(false) : setisOpen1(true) }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='bell-o' size={25} />{"  "} References </Text>
                {
                  isOpen1 ? (
                    <View className='text-blue-500 px-4'>
                      <TouchableOpacity onPress={()=>{router.navigate('/given_references')}}>
                        <Text className='text-blue-500 my-2'>Given References</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{router.navigate('/new_references')}}>
                        <Text className='text-blue-500 my-2 '>Give New References</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>{router.navigate('/received_references')}}>
                        <Text className='text-blue-500 my-2 '>Received References</Text>
                      </TouchableOpacity>
                    </View>
                  ) : ('')
                }
              </View>
              <View className='mb-3'>
                <Text onPress={() => { isOpen2 ? setisOpen2(false) : setisOpen2(true) }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='envelope' size={25} />{"  "} Done Deals</Text>
                {
                  isOpen2 ? (
                    <View className='text-blue-500 px-4'>
                      <TouchableOpacity className='text-blue-500 my-2'>
                        <Text className='text-blue-500'>Given References</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Give New References</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Received References</Text>
                      </TouchableOpacity>
                    </View>
                  ) : ('')
                }
              </View>
              <View className='mb-3'>
                <Text onPress={() => { isOpen3 ? setisOpen3(false) : setisOpen3(true) }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='heart-o' size={25} />{"  "} One to Ones</Text>
                {
                  isOpen3 ? (
                    <View className='text-blue-500 px-4'>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2'>Mark Done Deals</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Business Given</Text>
                      </TouchableOpacity>
                    </View>
                  ) : ('')
                }
              </View>
              <View className='mb-3'>
                <Text onPress={() => { isOpen4 ? setisOpen4(false) : setisOpen4(true) }} className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='heart-o' size={25} />{'  '} Requirements</Text>
                {
                  isOpen4 ? (
                    <View className='text-blue-500 px-4'>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2'>Mark Done Deals</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text className='text-blue-500 my-2 '>Business Given</Text>
                      </TouchableOpacity>
                    </View>
                  ) : ('')
                }
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}
// <View className='mb-3'>
//   <Text
//     onPress={() => {
//       logout()
//     }}
//     className='px-4 py-2 bg-blue-500 text-white text-lg rounded-md'><FontAwesome name='sign-out' size={25} />{"  "} Logout</Text>
// </View>
// <Image style={{ width: 50, height: 50, backgroundColor: '#fff', borderRadius: 50 }} source={require('@/assets/images/logo.png')} />
