import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, BackHandler } from 'react-native';
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

const ProfilePage = () => {

  const [userData, setUserData] = useState(null);
  const [Icon, setIcon] = useState('')
  // const router = useRouter();
  const URL = 'https://bbmoapp.bbnglobal.net';
  const [initials, setInitials] = useState('');

  useEffect(() => {
    loadUserData();
    if (userData != null) {
      const fullname = userData?.User?.name;
      const word = fullname.split(' ');
      setInitials(word.map(words => words[0]).join(''));
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
    router.navigate('/update_profile');
  };


  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-200">
        <Text className="text-xl text-gray-700">Loading...</Text>
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
      {/* Profile Picture */}
      <StyledView className="flex-row items-center bg-white p-3 rounded-lg mb-4">
        <StyledView className='flex justify-center items-center rounded-full'>
          <Image
            source={{ uri: `${URL}/files/member/profile_pic/${userData.Member?.profile_pic_dir}/${userData.Member?.profile_pic}` }}
            resizeMode='cover'
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
            }}
            alt='Profile Pic'
          />
          <Text>Profile Pic</Text>
        </StyledView>
        <StyledView className='mx-4'>
          <StyledText className="text-2xl font-semibold mb-1">{userData.User?.name}</StyledText>
          <StyledText className="text-lg text-gray-700 ">{userData.City?.city}</StyledText>
        </StyledView>
      </StyledView>

      {/* User Info */}
      <StyledView className="bg-white rounded-lg p-3">
        <StyledView className='flex-row items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Mobile:</StyledText>
          <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.mobile_1}</StyledText>
        </StyledView>
        <StyledView className='flex-row items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Email:</StyledText>
          <StyledText className="text-lg text-gray-700 mb-2">{userData.User?.email}</StyledText>
        </StyledView>
        <StyledView className='flex-row items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Logo:</StyledText>
          <StyledView className='flex justify-center items-center rounded-full'>
            <Image
              source={{ uri: `${URL}/files/member/logo/${userData.Member?.logo_dir}/${userData.Member?.logo}` }}
              resizeMode='cover'
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
              alt='Profile Pic'
            />
          </StyledView>
        </StyledView>
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Business Category:</StyledText>
          <StyledText className="text-lg text-gray-700 mb-2">{userData.Category?.category}</StyledText>
        </StyledView> 
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Another Business Category:</StyledText>
          <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.allied_services}</StyledText>
        </StyledView> 
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Business Name:</StyledText>
          <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.organization_name}</StyledText>
        </StyledView>
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Business Tagline:</StyledText>
          <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.business_tagline}</StyledText>
        </StyledView>
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Business Description:</StyledText>
          <StyledText className="text-lg text-gray-700 mb-2">{userData.Member?.organization_description}</StyledText>
        </StyledView>
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Address:</StyledText>
          <StyledText className="text-lg text-gray-700 mb-2">{`${userData.Member?.address_line_1}, ${userData.Member?.address_line_2}`}</StyledText>
        </StyledView>
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Website:</StyledText>
          <StyledText className="text-gray-700 mb-2">{userData.Member?.organization_website}</StyledText>
        </StyledView>
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Specific Ask:</StyledText>
          <StyledText className="text-gray-700 mb-2">{userData.Member?.specific_ask}</StyledText>
        </StyledView>
        <StyledView className='flex-row flex-wrap items-center justify-start my-2'>
          <StyledText className="text-lg text-gray-900 font-bold mr-8">Specific Give:</StyledText>
          <StyledText className="text-gray-600 mb-2">{userData.Member?.specific_give}</StyledText>
        </StyledView>
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

//
// <StyledText
//   className='text-white text-4xl font-bold'
// >
//   {initials}
// </StyledText>
//
// <StyledImage
//   source={{ uri: '' }}
//   className="w-32 h-32 rounded-full"
// />
// <StyledTouchableOpacity className="bg-blue-500 p-4 rounded-full mb-4">
//   <StyledText className="text-center text-white font-semibold">
//     Edit Profile
//   </StyledText>
// </StyledTouchableOpacity>

// import { View, Text, Image, TouchableOpacity } from 'react-native'
// import React, { useEffect } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import SideNavbar from '@/components/SideNavbar';
// import { FontAwesome } from '@expo/vector-icons';
//
// export default function Profile() {
//   return (
//     <>
//       <View className="flex-1 relative top-[30px] bg-gray-200">
//         <SideNavbar />
//         <View className="flex-1 justify-evenly mt-[40px]">
//           <View className="flex items-center my-6">
//             {userData.profile_pic == '' ? (
//               <Image
//                 style={{ width: 80, height: 80 }}
//                 source={{ uri: userData.profile_pic }}
//               />
//             ) : (
//               <View className='border-2 border-black my-6 w-[80px] h-[80px] rounded-full inline-flex justify-center items-center'>
//                 <FontAwesome name="user-o" size={50} />
//               </View>
//             )}
//             <Text className="text-3xl font-bold">{userData.name}</Text>
//           </View>
//           <View className="flex gap-6 items-center h-1/2">
//             <Text className="text-xl italic">&quot;{` ${userData.business_tagline} `}&quot;</Text>
//             <Text className="text-xl font-semibold">{userData.organization_name}</Text>
//             <Text className="text-lg p-4 text-center">{userData.organization_description}</Text>
//           </View>
//           <TouchableOpacity onPress={handleLogout} className="w-[90%] mx-auto mb-10 px-4 p-3 bg-blue-500 rounded-lg inline-flex items-center">
//             <Text className="text-xl text-white">Logout</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// }
