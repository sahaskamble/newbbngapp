import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated, Easing, Image, ScrollView, Pressable } from 'react-native';
import { styled } from 'nativewind';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Href, Link, router, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
type links = {
  name: string;
  path: Href<string | object>;
}

const Dashboard = ({ children }: any) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [userinfo, setuserinfo]: any = useState('');
  const sideNavAnimation = useRef(new Animated.Value(0)).current; // Starting value for the sidebar
  const navlinks: links[] = [
    { name: 'Dashboard', path: '/' },
    { name: 'Given References', path: '/given_references' },
    { name: 'Give New References', path: '/new_references' },
    { name: 'Received References', path: '/received_references' },
    { name: 'One to ones', path: '/onetoones' },
    { name: 'Requirements', path: '/requirements' },
    { name: 'Logout', path: '/profile' },
  ];
  const path = usePathname();

  const loaduserinfo = async () => {
    try {
      const info = await AsyncStorage.getItem('username');
      setuserinfo(info);
    } catch (e) {
      throw console.error(e);
    }
  }

  useEffect(() => {
    Animated.timing(sideNavAnimation, {
      toValue: isSideNavOpen ? 1 : 0,
      duration: 300, // Duration of the animation
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    loaduserinfo();
  }, [isSideNavOpen, userinfo]);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const closeSideNav = () => {
    if (isSideNavOpen) {
      setIsSideNavOpen(false);
    }
  };

  const sideNavTranslateX = sideNavAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-250, 0], // Change -250 to the width of your sidebar
  });

  const sideNavOpacity = sideNavAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <StyledView className="flex-1">
      {/* Adjust the status bar */}
      <StatusBar barStyle={'dark-content'} backgroundColor={'#2b81d8'} />

      {/* Top Navbar */}
      <StyledView className="flex-row justify-between items-center bg-[#2b81d8] p-4 pt-10">
        <StyledTouchableOpacity onPress={toggleSideNav}>
          <Ionicons name="menu" size={28} color="white" />
        </StyledTouchableOpacity>
        <StyledText className="text-white text-lg uppercase">{path! ? 'dashboard' : path.slice(1, 20)}</StyledText>
      </StyledView>
      <StyledView className="flex-1">

        {/* Main Content */}
        <StyledView className="flex-1">
          {children}
        </StyledView>
      </StyledView>

      {/* Side Navbar */}
      {isSideNavOpen && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 3,
            height: '100%',
            width: '80%',
            opacity: sideNavOpacity,
            transform: [{ translateX: sideNavTranslateX }],
            zIndex: 50,
            paddingTop: 40,
          }}
          className={`bg-gray-100`}
        >
          <View className="flex justify-center items-center bg-gray-300 rounded-full w-[40px] h-[40px] m-2" style={{
            position: 'absolute',
            top: 30,
            right: 0,
            zIndex: 60,
          }}>
            <Ionicons onPress={closeSideNav} name="close" size={28} color="#000" />
          </View>
          <View className='flex justify-center items-center mb-4'>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
              source={require('@/assets/images/user_acc.jpg')}
            />
            <View className='flex items-center'>
              <Text className='text-[#2b81d8] text-xl font-bold'>
                Welcome
              </Text>
              <Text className='text-[#2b81d8] text-xl font-bold'>{userinfo}</Text>
            </View>
          </View>
          <ScrollView>
            {
              navlinks.map((links, index) => (
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? '#2b81d870' : 'transparent',
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 5,
                    },
                  ]}
                  onPress={() =>{
                    router.navigate(links.path);
                    closeSideNav();
                  }}
                >
                    <View className='w-[30px] h-[30px] mx-3'>
                      <FontAwesome name='dashboard' size={30} />
                    </View>
                    <StyledText className="text-lg mb-4">{links.name}</StyledText>
                </Pressable>
              ))
            }
          </ScrollView>
        </Animated.View >
      )
      }
    </StyledView >
  );
};

export default Dashboard;
