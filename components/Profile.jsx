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
  const [initials, setInitials] = useState('');

  useEffect(() => {
    loadUserData();
    if (userData != null) {
      const fullname = userData.User.name;
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      await AsyncStorage.removeItem('userData');
      console.log(await AsyncStorage.getItem('isLoggedIn'))
      Alert.alert(
        'Confirm Exit',
        'Are you sure you want to Exit?',
        [
          {
            'text': 'Exit', onPress: () => {
              BackHandler.exitApp()
            }
          },
        ]
      );
    } catch (error) {
      console.error('Failed to clear AsyncStorage', error);
    }
  };


  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-200">
        <Text className="text-xl text-gray-500">Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Profile Picture */}
      <StyledView className="items-center mt-8 mb-4">
        <StyledView className='flex justify-center items-center w-[100px] h-[100px] bg-zinc-800 rounded-full'>
          <StyledText
            className='text-white text-4xl font-bold'
          >
            {initials}
          </StyledText>
        </StyledView>
      </StyledView>

      {/* User Info */}
      <StyledView className="items-center mb-8">
        <StyledText className="text-2xl font-semibold mb-2">{userData.User?.name}</StyledText>
        <StyledText className="text-gray-500 mb-2">{userData.User?.email}</StyledText>
        <StyledText className="text-gray-500 mb-2">{userData.Member?.organization_website}</StyledText>
        <StyledText className="text-gray-500 text-lg mb-2">{userData.Member?.organization_description}</StyledText>
      </StyledView>

      {/* Action Buttons */}
      <StyledView className="mt-4">

        <StyledTouchableOpacity onPress={handleLogout} className="bg-red-500 p-4 rounded-full">
          <StyledText className="text-center text-white font-semibold">
            Logout
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </ScrollView>
  );
};

export default ProfilePage;



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
