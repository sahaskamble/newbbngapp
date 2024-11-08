import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, router } from 'expo-router';
import { Alert, BackHandler, Image, LayoutAnimation, Platform, Pressable, Text, TouchableNativeFeedback, View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList, DrawerView } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Api_Url } from '@/constants/host_name';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


function CustomeDraweComp(props: any) {

  // Function to schedule a local notification
  async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "From  BBNGlobal Team 👏",
        body: 'Welcome to new BBNGlobal mobile app',
        sound: true,
      },
      trigger: { seconds: 0.5 }, // Notification will appear after 5 seconds
    });
    // console.warn(notification)
  }
  const OBTask = [
  ]

  const drawerMenu = [
    {
      id: '1',
      title: 'OB Tasks',
      icon: 'grid-outline',
      MenuList: [
        { id: '1', name: 'Chapter Meeting', path: '/(drawer)/obtask' },
      ],
      role: '10'
    },
    {
      id: '2',
      title: 'References',
      icon: 'notifications-outline',
      MenuList: [
        { id: '1', name: 'New References', path: '/(drawer)/references/new' },
        { id: '2', name: 'Given References', path: '/(drawer)/references/given' },
        { id: '3', name: 'Received References', path: '/(drawer)/references/received' },
      ],
    },
    {
      id: '3',
      title: 'Done Deals',
      icon: 'mail-outline',
      MenuList: [
        { id: '1', name: 'Business Given', path: '/(drawer)/donedeals/given' },
        { id: '2', name: 'Business Received', path: '/(drawer)/donedeals/received' },
      ],
    },
    {
      id: '4',
      title: 'One to Ones',
      icon: 'heart-outline',
      MenuList: [
        { id: '1', name: 'New One to One', path: '/(drawer)/onetoone/new' },
        { id: '2', name: 'One to One Done', path: '/(drawer)/onetoone/done' },
      ],
    },
    {
      id: '5',
      title: 'Requirements',
      icon: 'heart-outline',
      MenuList: [
        { id: '1', name: 'Post your Requirement', path: '/(drawer)/requirements/post' },
        { id: '2', name: 'View Requirement', path: '/(drawer)/requirements/view' },
      ],
    },
  ]

  const [menuIndex, setMenuIndex] = useState(-1);
  // const [menuIndex_1, setMenuIndex_1] = useState(-1);
  const [UserData, setUserData] = useState<any>([]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('isUserLoggedIn', JSON.stringify(false));
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('isMessageGone');
      console.log(await AsyncStorage.getItem('isLoggedIn'))
      if (Platform.OS === 'android') {
        Alert.alert(
          'Confirm Logout',
          'Are you sure you want to Logout? You will exit from the app after logout',
          [
            { 'text': 'Cancel', onPress: () => null, style: 'cancel' },
            {
              'text': 'YES', onPress: () => {
                // BackHandler.exitApp()
                scheduleNotification();
                setTimeout(() => {
                  router.push('/login');
                }, 1500)
              }
            },
          ]
        );
      } else {
        Alert.prompt(
          'Confirm Logout',
          'Are you sure you want to Logout? You will exit from the app after logout',
          [
            { 'text': 'Cancel', onPress: () => null, style: 'cancel' },
            {
              'text': 'YES', onPress: () => {
                // BackHandler.exitApp()
                router.push('/login');
              }
            },
          ]
        );
      }
    } catch (error) {
      console.error('Failed to clear AsyncStorage', error);
    }
  };

  const insets = useSafeAreaInsets();
  const [chapter, setchapter] = useState<any>([]);

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData !== null) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        console.log(parsedUserData.User.role_id);
      }

      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const res = await fetch(`${Api_Url}/api/chapters/index`, {
        method: 'GET',
        headers: myHeaders,
      })
      const data = await res.json();
      setchapter(data);
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  useEffect(() => {
    loadUserData();
    async function getPermissions() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to Show notification is not granted');
      }
    };

    getPermissions();
  }, [])

  return (
    <View style={{ flex: 1, }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={true}
      >
        <View className='flex-row justify-center items-center my-2 py-3'>
          <Image
            source={{ uri: `${Api_Url}/files/member/profile_pic/${UserData.Member?.profile_pic_dir}/${UserData.Member?.profile_pic}` }}
            width={80}
            height={80}
            style={{ borderRadius: 50, marginRight: 20, }}
          />
          <View>
            <Text className='text-xl font-bold'>{UserData.User?.name}</Text>
            <Text className='text-md font-normal'>Welcome, {UserData.User?.name}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
            router.navigate('/(drawer)/')
          }}
          className='my-2 pr-4'
        >
          <View className='flex-row items-center'>
            <View className='flex-1 flex-row items-center'>
              <FontAwesome name='dashboard' size={35} color={'#000'} style={{ marginHorizontal: 13, }} />
              <Text className='text-md font-bold'>Dashboard</Text>
            </View>
          </View>
        </TouchableOpacity>

        {drawerMenu.map((item: any, index: any) => {
          return (
            <TouchableOpacity
              key={index} activeOpacity={0.8}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
                setMenuIndex(menuIndex === index ? -1 : index)
              }}
              className={`my-2 pr-4 ${item.role === '10' ? 'block' : 'none'}`}
            >
              <View className='flex-row items-center'>
                <View className='flex-1 flex-row items-center'>
                  <Ionicons name={item.icon} size={35} color={'#000'} style={{ marginHorizontal: 10, }} />
                  <Text className='text-md font-bold'>{item.title}</Text>
                </View>
                <Ionicons name='chevron-forward-outline' size={30} color={'#000'} />
              </View>
              {menuIndex === index && <View>
                {item.MenuList.map((submenu: any, index: any) => (
                  <TouchableNativeFeedback
                    key={index}
                    onPress={() => {
                      router.navigate(submenu.path);
                    }}
                  >
                    <View className='py-3 px-4'>
                      <Text className='text-md'>{submenu.name}</Text>
                    </View>
                  </TouchableNativeFeedback>
                ))}
              </View>}
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>
      <View style={{ padding: 8 + insets.bottom }}>
        <Pressable
          className='bg-red-500 p-[11px] rounded-md flex-row items-center'
          onPress={handleLogout}
        >
          <Ionicons name='log-out' color={'#fff'} size={28} style={{ marginRight: 20, }} />
          <Text className='text-white font-bold'>Logout</Text>
        </Pressable>
      </View>
    </View >
  );
}

export default function TabLayout() {
  return (
    <Drawer
      drawerContent={CustomeDraweComp}
      screenOptions={{
        drawerActiveBackgroundColor: '#4296de',
        drawerActiveTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#4296de',
        },
        headerTintColor: '#fff',
        headerRight: () => (
          <Link href='/modal' asChild>
            <Ionicons name='person-circle' size={40} color={'#fff'} style={{ marginRight: 12 }} />
          </Link>
        ),
      }}
    >
      <Drawer.Screen
        name='index'
        options={{
          drawerType: 'slide',
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
        }}
      />

      <Drawer.Screen
        name='obtask'
        options={{
          drawerType: 'slide',
          drawerLabel: 'OB Tasks',
          title: 'OB Tasks',
        }}
      />

      <Drawer.Screen
        name='references'
        options={{
          drawerType: 'slide',
          drawerLabel: 'References',
          title: 'References',
        }}
      />

      <Drawer.Screen
        name='donedeals'
        options={{
          drawerType: 'slide',
          drawerLabel: '',
          title: 'Done Deals',
        }}
      />

      <Drawer.Screen
        name='onetoone'
        options={{
          drawerType: 'slide',
          drawerLabel: '',
          title: 'One to Ones',
        }}
      />

      <Drawer.Screen
        name='requirements'
        options={{
          drawerType: 'slide',
          drawerLabel: '',
          title: 'Requirements',
        }}
      />
    </Drawer>
  );
}

// {OBTask.map((ob: any, index: any) => (
//   <TouchableOpacity
//     key={index}
//     activeOpacity={1}
//     onPress={() => {
//       LayoutAnimation.configureNext(LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'))
//       setMenuIndex_1(menuIndex_1 === index ? -1 : index)
//     }}
//     className='my-2 pr-4'
//   >
//     <View className='flex-row items-center'>
//       <View className='flex-1 flex-row items-center'>
//         <Ionicons name='grid-outline' size={30} color={'#000'} style={{ marginHorizontal: 13, }} />
//         <Text className='text-md font-bold'>{ob.title}</Text>
//       </View>
//       <Ionicons name='chevron-forward-outline' size={30} color={'#000'} />
//     </View>
//     {menuIndex_1 === index && <View>
//       {ob.MenuList.map((submenu: any, index: any) => (
//         <TouchableNativeFeedback
//           key={index}
//           onPress={() => {
//             router.navigate(submenu.path);
//           }}
//         >
//           <View className='py-3 px-4'>
//             <Text className='text-md'>{submenu.name}</Text>
//           </View>
//         </TouchableNativeFeedback>
//       ))}
//     </View>}
//   </TouchableOpacity>
// ))}

