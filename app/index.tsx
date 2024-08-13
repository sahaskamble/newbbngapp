import React, { useEffect, useState } from 'react'
import "nativewind";
import DashBoard from '@/components/DashBoard';
import SplashScreen from '@/components/SplashScreen';

export default function Index() {

  const [isDashboard, setisDashboard] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setisDashboard(true);
    }, 3000);

  }, [])

  if (isDashboard) {
    return (
      <DashBoard />
    )
  } else {
    return (
      <SplashScreen />
    )
  }
}
