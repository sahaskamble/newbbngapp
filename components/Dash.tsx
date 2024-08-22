import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated, Easing, Image, ScrollView, Alert, BackHandler } from 'react-native';
import { styled } from 'nativewind';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dropdown from './Dropdown';
import NavLink from './NavLink';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const Dashboard = ({ children }: any) => {

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [userinfo, setuserinfo]: any = useState('');
  const sideNavAnimation = useRef(new Animated.Value(0)).current; // Starting value for the sidebar
  const references: any = [
    { name: 'Give New References', path: '/references/new_references' },
    { name: 'Given References', path: '/references/given_references' },
    { name: 'Received References', path: '/references/received_references' },
  ]
  const donedeal: any = [
    { name: 'Business Given', path: '/donedeals/business_given' },
    { name: 'Business Received', path: '/donedeals/business_received' },
  ]
  const onetoone: any = [
    { name: 'New One To Ones', path: '/onetoone/new_onetoone' },
    { name: 'One To One Done', path: '/onetoone/onetoones' },
  ]
  const requirements: any = [
    { name: 'Post your requirements', path: '/requirements/post_form' },
    { name: 'View requirements', path: '/requirements/view_requirements' },
  ]
  const path = usePathname();
  const [isPath, setisPath] = useState('');

  const loaduserinfo = async () => {
    try {
      const info: any = await AsyncStorage.getItem('userData');
      const data = JSON.parse(info);
      setuserinfo(data?.User?.name);
    } catch (e) {
      throw console.error(e);
    }
  }

  const CheckPathRef = () => {
    if (path === '/dashboard' || path === '/') {
      setisPath('Dashboard');
    } else if (path === '/profile') {
      setisPath('Profile')
    } else {
      references.forEach((p: any) => {
        if (p.path === path) {
          setisPath(p.name);
        } else {
          console.log("path not match");
          console.log(path);
        }
      });
    }
  }
  const CheckPathDoneDeals = () => {
    if (path === '/dashboard' || path === '/') {
      setisPath('Dashboard');
    } else if (path === '/profile') {
      setisPath('Profile')
    } else {
      donedeal.forEach((d: any) => {
        if (d.path === path) {
          setisPath(d.name);
        } else {
          console.log("path not match");
          console.log(path);
        }
      });
    }
  }
  const CheckPathOnetoOnes = () => {
    if (path === '/dashboard' || path === '/') {
      setisPath('Dashboard');
    } else if (path === '/profile') {
      setisPath('Profile')
    } else {
      onetoone.forEach((o: any) => {
        if (o.path === path) {
          setisPath(o.name);
        } else {
          console.log("path not match");
          console.log(path);
        }
      });
    }
  }
  const CheckPathReq = () => {
    if (path === '/dashboard' || path === '/') {
      setisPath('Dashboard');
    } else if (path === '/profile') {
      setisPath('Profile')
    } else {
      requirements.forEach((r: any) => {
        if (r.path === path) {
          setisPath(r.name);
        } else {
          console.log("path not match");
          console.log(path);
        }
      });
    }
  }

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

  useEffect(() => {
    Animated.timing(sideNavAnimation, {
      toValue: isSideNavOpen ? 1 : 0,
      duration: 200, // Duration of the animation
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    loaduserinfo();
    CheckPathRef();
    CheckPathDoneDeals();
    CheckPathOnetoOnes();
    CheckPathReq();
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
      <StatusBar barStyle={"default"} backgroundColor={'#2b81d8'} />

      {/* Top Navbar */}
      <StyledView className="flex-row justify-between items-center bg-[#2b81d8] p-3 px-4 pt-10">
        <StyledTouchableOpacity onPress={toggleSideNav}>
          <Ionicons name="menu" size={30} color="white" />
        </StyledTouchableOpacity>
        <StyledView>
          <StyledText className='text-white text-lg font-bold'>{isPath}</StyledText>
        </StyledView>
        <StyledTouchableOpacity className='bg-black p-2 rounded-full' onPress={() => { router.navigate('/profile') }}>
          <Ionicons name="person" size={28} color="white" />
        </StyledTouchableOpacity>
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
            left: 0,
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
          <ScrollView 
           contentContainerStyle={{
              padding: 12,
            }}
          >
            <NavLink icon='dashboard' link='/dashboard' routename='Dash board' />
            <Dropdown routename='References' icon='bell-o'>
              {
                references.map((links: any, index: any) => (
                  <TouchableOpacity key={index} onPress={() => { closeSideNav(); router.navigate(links.path); }}>
                    <StyledText key={index} className="text-lg mb-4">{links.name}</StyledText>
                  </TouchableOpacity>
                ))
              }
            </Dropdown>
            <Dropdown routename='Done deals' icon='envelope-o'>
              {
                donedeal.map((links: any, index: any) => (
                  <TouchableOpacity key={index} onPress={() => { closeSideNav(); router.navigate(links.path); }}>
                    <StyledText key={index} className="text-lg mb-4">{links.name}</StyledText>
                  </TouchableOpacity>
                ))
              }
            </Dropdown>
            <Dropdown routename='One To Ones' icon='heart-o'>
              {
                onetoone.map((links: any, index: any) => (
                  <TouchableOpacity key={index} onPress={() => { closeSideNav(); router.navigate(links.path); }}>
                    <StyledText key={index} className="text-lg mb-4">{links.name}</StyledText>
                  </TouchableOpacity>
                ))
              }
            </Dropdown>
            <Dropdown routename='Requirements' icon='heart-o'>
              {
                requirements.map((links: any, index: any) => (
                  <TouchableOpacity key={index} onPress={() => { closeSideNav(); router.navigate(links.path); }}>
                    <StyledText key={index} className="text-lg mb-4">{links.name}</StyledText>
                  </TouchableOpacity>
                ))
              }
            </Dropdown>
            <StyledView className="mt-4">
              <StyledTouchableOpacity onPress={handleLogout} className="bg-red-500 p-3 rounded-full">
                <StyledText className="text-center text-lg text-white font-semibold">
                  Log Out
                </StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </ScrollView>
        </Animated.View >
      )
      }
    </StyledView >
  );
};

export default Dashboard;
