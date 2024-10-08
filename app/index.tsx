import React, { useCallback, useState } from 'react'
import "nativewind";
import Dashboard from '@/components/Dash';
import Login from '@/components/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashBoard from '@/components/DashBoard';
import { useFocusEffect } from '@react-navigation/native';

export default function Index() {

  // const [isDashboard, setisDashboard] = useState(false);
  const [isLoggedIn, setisLoggedIn]: any = useState('');

  const getLog = async () => {
    const log: any = await AsyncStorage.getItem('isLoggedIn');
    setisLoggedIn(log);
  }

  useFocusEffect(() => {
    getLog();
  })

  if (isLoggedIn === 'false' || isLoggedIn === undefined || isLoggedIn === null) {
    return <Login />
  } else {
    return (
      <Dashboard>
        <DashBoard />
      </Dashboard>
    )
  }
}
