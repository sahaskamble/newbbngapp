import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashBoard() {

  const [data, setdata] = useState({});
  const [amount, setamount] = useState(0);
  const dbdata = [];
  const username = 'amar@sanmisha.com';
  const password = 'amar123@';

  const fetchDashboard = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      console.log(username, password)
      const res = await fetch('https://bbmoapp.bbnglobal.net/api/dashboard', {
        method: 'GET',
        headers: myHeaders,
      });
      const data = await res.json();

      if (res.ok) {
        setdata(data);
        setamount(data.business_generated[0].amount);
        dbdata.push(data);
        // console.log(dbdata);
      } else {
        console.log(")I'm failed to fetch");
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchDashboard();
  }, [])

  return (
    <SafeAreaView className="">
      <Text className="text-2xl text-black bg-white p-3">DashBoard</Text>
      <View className="h-full">
        <Text className="text-2xl text-black bg-white" onPress={() => { fetchDashboard() }}>TEST</Text>
        <View className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
          <View className="w-full h-[100px] p-4 bg-green-400">
            {
              data.business_generated?.map((item, index) => (
                <Text key={index} className="text-white text-2xl">₹ {item.amount}</Text>
              ))
            }
          </View>
          <Text className="text-white text-2xl">{data.given_references}</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
