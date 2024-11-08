import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const ProfilePage = () => {

  const [userData, setUserData]: any = useState(null);
  const [Icon, setIcon] = useState('')
  // const router = useRouter();
  const URL = 'https://bbmoapp.bbnglobal.net';
  const [initials, setInitials] = useState('');
  const [mobile1, setmobile1] = useState('');
  const [mobile2, setmobile2] = useState('');
  const [email, setemail] = useState('');
  const [aliedservices, setaliedservices] = useState('');
  const [category, setcategory] = useState('');
  const [business_tagline, setbusiness_tagline] = useState('');
  const [business_name, setbusiness_name] = useState('');
  const [businessCategory, setbusinessCategoty] = useState('');
  const [business_discription, setbusiness_discription] = useState('');
  const [website, setwebsite] = useState('');
  const [specific_give, setspecific_give] = useState('');
  const [specific_ask, setspecific_ask] = useState('');
  const [address, setaddress] = useState('');

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
    loadUserData();
    if (userData != null) {
      const fullname = userData?.User?.name;
      const word = fullname.split(' ');
      setInitials(word.map((words: any) => words[0]).join(''));
    }
  }, [userData]);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  const handleUpdateProfile = () => {
    router.navigate('/');
  };


  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-200">
        <Text className="text-xl text-gray-700">Loading...</Text>
        <LottieView
          autoPlay
          source={require('@/assets/loader.json')}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView className="bg-gray-300"
      contentContainerStyle={{
        paddingVertical: 10,
        paddingHorizontal: 15,
      }}
    >
      {/* User Info */}
      <StyledView className="bg-white rounded-lg p-3">
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Mobile 1 and 2:</StyledText>
        <TextInput defaultValue={mobile1} className='p-2 text-md text-black bg-gray-300 w-full mb-2' />
        <TextInput defaultValue={mobile2} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Email:</StyledText>
        <TextInput defaultValue={email} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-lg text-gray-700 mb-2">{userData.User?.email}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Business Category:</StyledText>
        <TextInput defaultValue={category} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-lg text-gray-700 mb-2">{userData.Category?.category}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Another Business Category:</StyledText>
        <TextInput defaultValue={businessCategory} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.allied_services}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Business Name:</StyledText>
        <TextInput defaultValue={business_name} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.organization_name}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Business Tagline:</StyledText>
        <TextInput defaultValue={business_tagline} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.business_tagline}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Business Description:</StyledText>
        <TextInput defaultValue={business_discription} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.organization_description}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Address:</StyledText>
        <TextInput defaultValue={address} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-lg text-gray-700 mb-2">{`${userData.Member?.address_line_1}, ${userData.Member?.address_line_2}`}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Website:</StyledText>
        <TextInput defaultValue={website} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-gray-700 mb-2">{userData.Member?.organization_website}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Specific Ask:</StyledText>
        <TextInput defaultValue={specific_ask} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-gray-700 mb-2">{userData.Member?.specific_ask}</StyledText>
        <StyledText className="text-lg text-gray-900 font-bold mr-8">Specific Give:</StyledText>
        <TextInput defaultValue={specific_give} className='p-2 text-md text-black bg-gray-300 w-full' />
        <StyledText className="text-gray-600 mb-2">{userData.Member?.specific_give}</StyledText>
      </StyledView>

      {/* Action Buttons */}
      <StyledView className="mt-4">
        <StyledTouchableOpacity onPress={handleUpdateProfile} className="bg-blue-500 p-3 rounded-full">
          <StyledText className="text-center text-lg text-white font-semibold">
            Update Profile
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

export default ProfilePage;

