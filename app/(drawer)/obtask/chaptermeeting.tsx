import { View, Text, ScrollView, RefreshControl, StyleSheet, Button, TouchableOpacity, TextInput, Modal, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Api_Url } from '@/constants/host_name';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

export default function chaptermeeting() {

  const [meetings, setmeetings]: any = useState([]);
  const [chapters, setchapters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [meetDate, setmeetDate] = useState(new Date());
  const [chapterId, setchapterId] = useState('');
  const [meetTime, setmeetTime] = useState({
    hour: '',
    min: '',
    meridian: ''
  });
  const [meetTitle, setmeetTitle] = useState('');
  const [meetVenue, setmeetVenue] = useState('');
  const [Search, setSearch] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);

  const fetchMeetings = async () => {
    setisLoading(true);
    try {
      const username = await AsyncStorage.getItem('username');
      const password = await AsyncStorage.getItem('password');
      console.log(username, " ", password)
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${username}:${password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const res = await fetch(`${Api_Url}/api/ChapterMeetings`, {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      });

      const data = await res.json();

      if (res.ok) {
        setmeetings(data.meetings)
      } else {
        setmeetings([{ message: 'Data is not fetched' }])
      }

    } catch (e: any) {
      throw console.error(e);
    } finally {
      setisLoading(false);
    }
  }

  const fetchChapter = async () => {
    setisLoading(true);
    try {
      const Username = await AsyncStorage.getItem('username');
      const Password = await AsyncStorage.getItem('password');
      console.log("uname", Username)
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${Username}:${Password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/chapters/index`, {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow"
      });

      const data1 = await res.json();
      if (data1) {
        setchapters(data1.chapters)
      }
    } catch (e) {
      throw console.error(e);
    }
    finally {
      setisLoading(false);
    }
  }

  function handleRefreshing() {
    setRefreshing(true);
    fetchMeetings();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

  async function handleAddMeeting() {
    setisLoading(true);
    try {

      const Username = await AsyncStorage.getItem('username');
      const Password = await AsyncStorage.getItem('password');
      console.log("uname", Username)
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      const authString = btoa(`${Username}:${Password}`);
      myHeaders.append("Authorization", `Basic ${authString}`);
      const res = await fetch(`https://bbmoapp.bbnglobal.net/api/chapters/index`, {
        method: 'POST',
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          "ChapterMeeting": {
            "id": "",
            "chapter_id": chapterId,
            "date": meetDate,
            "meeting_time": {
              "hour": meetTime.hour,
              "min": meetTime.min,
              "meridian": meetTime.meridian
            },
            "meeting_title": meetTitle,
            "meeting_venue": meetVenue
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setTimeout(() => {
          setisLoading(false);
        }, 2000);
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  // let date: Date = new Date();
  //
  // function showMode(currentMode: any) {
  //   DateTimePickerAndroid.open({
  //     value: date,
  //     onChange: (e, d) => { setmeetDate(d) },
  //     mode: currentMode,
  //     is24Hour: false,
  //   })
  // }

  useEffect(() => {
    const backAction = () => {
      router.back();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();

  }, [])

  useEffect(() => {
    fetchMeetings();
    fetchChapter();
  }, [])

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-200">
        <Text className="text-xl text-gray-700">Loading...</Text>
        <LottieView
          autoPlay
          source={require('@/assets/loader.json')}
          style={{
            width: 200,
            height: 200,
          }}
        />
      </View>
    )
  }
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefreshing} />
        }
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
      >
        <View>
          <TextInput
            placeholder='Search'
            placeholderTextColor={'gray'}
            className='text-lg my-2 flex-1'
            value={Search}
            style={styles.SearchInput}
            onChangeText={setSearch} // Update Search state
          />
          <TouchableOpacity
            style={styles.AddMeetingButton}
            onPress={() => { setisModalOpen(!isModalOpen) }}
          >
            <FontAwesome name='plus-circle' size={25} color={'#fff'} />
            <Text style={{ color: '#fff' }}>Add</Text>
          </TouchableOpacity>
        </View>
        {
          meetings.filter((m: any) => m.ChapterMeeting.date.toLowerCase().includes(Search.toLowerCase()) || m.ChapterMeeting.meeting_title.toLowerCase().includes(Search.toLowerCase())).map((meet: any, index: any) => (
            <View
              key={index}
              style={styles.container}
            >
              <View
                style={styles.innercontainer}
              >
                <View>
                  <Text style={styles.MeetingDate}>{meet?.ChapterMeeting.date}</Text>
                  <Text style={styles.MeetingTitle}>{meet?.ChapterMeeting.meeting_title}</Text>
                </View>
                {
                  chapters.filter((c: any) => c.Chapter.id === meet.ChapterMeeting.chapter_id).map((chap: any, index: any) => (
                    <View
                      key={index}
                    >
                      <Text style={styles.ChapterName}>{chap?.Chapter.chapter}</Text>
                    </View>
                  ))
                }
              </View>
              <View style={styles.MeetingButtonsContainer}>
                <TouchableOpacity style={[styles.MeetingButtons, { backgroundColor: '#f59345' }]}>
                  <Text style={{ fontSize: 18, color: '#fff' }}>Edit Attendance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.MeetingButtons, { backgroundColor: '#3e70c9' }]}>
                  <FontAwesome name='edit' size={25} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.MeetingButtons, { backgroundColor: '#f44236' }]}>
                  <FontAwesome name='trash' size={25} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>
      <Modal
        id='AddMeetingModal'
        animationType='slide'
        transparent={false}
        visible={isModalOpen}
        onRequestClose={() => { setisModalOpen(!isModalOpen) }}
      >
        <View style={{ padding: 10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button title='Pick date' />
          <Button title='Pick time' />
          <TextInput
            placeholder='Enter Meeting Title'
            style={styles.SearchInput}
            onChangeText={(e: any) => setmeetTitle(e)}
          />
          <TextInput
            placeholder='Enter Meeting Venue'
            style={styles.SearchInput}
            onChangeText={(e: any) => setmeetVenue(e)}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <Text style={{ padding: 10, margin: 10, backgroundColor: '#3e70c9', color: '#fff' }} onPress={() => { setisModalOpen(!isModalOpen) }}>Test Modal</Text>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 10,
    elevation: 4,
  },
  innercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  MeetingTitle: {
    fontSize: 19,
  },
  MeetingDate: {
    fontSize: 16,
  },
  MeetingChapter: {
    fontSize: 13,
  },
  MeetingButtonsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 10,
  },
  MeetingButtons: {
    padding: 13,
    fontWeight: 'semibold',
    color: '#fff',
    borderRadius: 5,
  },
  ChapterName: {
    fontSize: 18,
  },
  AddMeetingButton: {
    width: '100%',
    marginHorizontal: 'auto',
    marginVertical: 6,
    padding: 12,
    backgroundColor: '#f44236',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  SearchInput: {
    width: '100%',
    marginVertical: 10,
    fontSize: 18,
    padding: 8,
    elevation: 6,
    backgroundColor: '#fff',
  },
})
