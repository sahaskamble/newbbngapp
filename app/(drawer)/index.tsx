import DashBoard from '@/components/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Linking, Platform, Text, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function IndexPage() {

  // const [userData, setuserData] = useState<Array>([]);
  const [isLoggedIn, setisLoggedIn] = useState<boolean | null>(null);

  function handleOkPress() {
    router.push('/login');
  }

  // Function to schedule a local notification
  async function scheduleNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "From  BBNGlobal Team 👏",
        body: 'Welcome to new BBNGlobal mobile app',
        sound: true,
      },
      trigger: { seconds: 3 }, // Notification will appear after 5 seconds
    });
    // console.warn(notification)
  }

  useEffect(() => {
    async function getPermissions() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to Show notification is not granted');
      }
    };

    getPermissions();
  }, [])

  useEffect(() => {

    let isMounted = true; // Variable to track if the component is mounted

    async function loadUserInfo() {
      try {
        const loggedIn: any = await AsyncStorage.getItem('isUserLoggedIn');
        let log = JSON.parse(loggedIn);

        if (isMounted) {
          if (log !== true || log === null) {
            Platform.OS === 'android' ? (
              Alert.alert(
                'Please Login Again',
                'User details are not saved',
                [
                  {
                    text: 'Cancel',
                    onPress: () => { null },
                    style: 'cancel',
                  },
                  {
                    text: 'GO to Login',
                    onPress: handleOkPress,
                  }
                ],
                { cancelable: false }
              )
            ) : (
              Alert.prompt(
                'Please Login Again',
                'User details are not saved',
                [
                  {
                    text: 'Cancel',
                    onPress: () => { null },
                    style: 'cancel',
                  },
                  {
                    text: 'GO to Login',
                    onPress: handleOkPress,
                  }
                ],
              )
            )
          } else {
            setisLoggedIn(log);
          }
          const info = await AsyncStorage.getItem('userData');
          if (info !== null) {
            // setuserData(info);
          } else {
            Platform.OS === 'android' ?
              Alert.alert('User data is not Stored')
              :
              Alert.prompt('User data is not Stored')
          }
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    }

    loadUserInfo();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push('/login');
    }
  }, [isLoggedIn]);

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      // For iOS
      Linking.openURL('app-settings:')
        .catch(() => {
          Alert.alert('Error', 'Unable to open settings');
        });
    } else if (Platform.OS === 'android') {
      // For Android
      Linking.openSettings()
        .catch(() => {
          Alert.alert('Error', 'Unable to open settings');
        });
    }
  };

  if (isLoggedIn) {
    return (
      <>
        <DashBoard />
      </>
    );
  }
  return null;
}
