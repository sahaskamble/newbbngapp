import React, { useEffect, useState } from 'react'
import "nativewind";
import Dashboard from '@/components/Dash';
// import Login from '@/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import DashBoard from '@/components/DashBoard';

export default function Index() {

  // const [isDashboard, setisDashboard] = useState(false);
  const [isLoggedIn, setisLoggedIn]: any = useState('');

  const getLog = async () => {
    const log: any = await AsyncStorage.getItem('isLoggedIn');
    setisLoggedIn(log);
  }

  useEffect(() => {

    getLog();

  }, [])

  console.log(isLoggedIn)

  if (isLoggedIn === "false" || isLoggedIn === null) {
    router.navigate('/login');
  } else {
    return (
      <Dashboard>
        <DashBoard />
      </Dashboard>
    )
  }
}
