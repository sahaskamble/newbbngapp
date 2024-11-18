import { View, Text, ScrollView, RefreshControl, StyleSheet, Button, TouchableOpacity, TextInput, Modal, BackHandler, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Api_Url } from '@/constants/host_name';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDate, formatTime } from '@/components/FormatDate';
import { Picker } from '@react-native-picker/picker';

type MeetTime = {
  hour: string;
  min: string;
  meridian: string;
};

export default function chaptermeeting() {

  const [meetings, setmeetings]: any = useState([]);
  const [chapters, setchapters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [meetDate, setmeetDate] = useState('');
  const [chapterId, setchapterId] = useState('');
  const [meetTime, setmeetTime] = useState<MeetTime>({
    hour: '',
    min: '',
    meridian: ''
  });
  const [meetTitle, setmeetTitle] = useState('');
  const [meetVenue, setmeetVenue] = useState('');
  const [Search, setSearch] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isDateVisible, setisDateVisible] = useState(false);
  const [isTimeVisible, setisTimeVisible] = useState(false);

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
        setisModalOpen(!isModalOpen)
      }

    } catch (e: any) {
      throw console.error(e);
    }
  }

  function handleShowDate() {
    setisDateVisible(!isDateVisible);
  }

  function handleShowTime() {
    setisTimeVisible(!isTimeVisible);
  }

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
      <View className="flex-1 justify-center items-center bg-gray-300">
        <View className='px-10 py-6 bg-white flex justify-center items-center rounded-md' style={{ elevation: 5 }}>
          <ActivityIndicator color={'#3e70c9'} size={50} />
        </View>
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
          <View style={styles.SearchBar}>
            <TextInput
              placeholder='Search'
              placeholderTextColor={'gray'}
              className='text-lg my-2 flex-1 px-4 py-1'
              value={Search}
              onChangeText={setSearch} // Update Search state
            />
          </View>
          <View
            style={{ marginVertical: 10, }}
          >
            <Picker
              selectedValue={chapterId}
              onValueChange={(itemValue) => { setchapterId(itemValue) }}
              style={{
                height: 50,
                backgroundColor: '#fff',
                elevation: 4,
                borderRadius: 20
              }}
            >
              <Picker.Item label='--Select Only When Adding Meeting--' value='0' />
              {
                chapters?.map((chap: any, index: any) => {
                  console.log(chap)
                  return (
                    <Picker.Item key={index} label={chap?.Chapter?.chapter} value={chap.Chapter?.id} />
                  )
                })
              }
            </Picker>
          </View>
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
        <View className='p-4'>
          <Text className='text-xl font-bold'>Add Chapter Meeting</Text>
        </View>
        <View style={{ paddingHorizontal: 15, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date</Text>
            <View style={styles.SearchInputContainer}>
              <TextInput
                placeholder='Select Date'
                style={styles.SearchInput}
                defaultValue={meetDate}
              />
              <TouchableOpacity
                onPress={handleShowDate}
                className='p-3'
              >
                <MaterialIcons name='date-range' size={24} color={'black'} />
              </TouchableOpacity>
            </View>
            <DateTimePicker
              isVisible={isDateVisible}
              mode='date'
              onConfirm={(e) => {
                console.log(formatDate(e, 'dd-MM-yyyy'));
                const formatedDate: string = formatDate(e, 'dd-MM-yyyy');
                setmeetDate(formatedDate);
              }}
              onCancel={handleShowDate}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Time</Text>
            <View style={styles.SearchInputContainer}>
              <TextInput
                placeholder='Select Time'
                style={styles.SearchInput}
                defaultValue={
                  meetTime.hour === '' ? '00:00' : `${meetTime.hour}:${meetTime.min} ${meetTime.meridian}`
                }
              />
              <TouchableOpacity
                onPress={handleShowTime}
                className='p-3'
              >
                <Ionicons name="time" size={24} color={"black"} />
              </TouchableOpacity>
            </View>
            <DateTimePicker
              isVisible={isTimeVisible}
              mode='time'
              onConfirm={(e) => {
                const formatedTime = formatTime(e);
                setmeetTime((time) => ({ ...time, hour: formatedTime.hour, min: formatedTime.minute, meridian: formatedTime.meridian }))
              }}
              onCancel={handleShowTime}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <View style={styles.SearchInputContainer}>
              <TextInput
                placeholder='Enter Meeting Title'
                style={styles.SearchInput}
                className='p-3'
                onChangeText={(e: any) => setmeetTitle(e)}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Meeting Venue</Text>
            <View style={styles.SearchInputContainer}>
              <TextInput
                placeholder='Enter Meeting Venue'
                style={styles.SearchInput}
                className='p-3'
                onChangeText={(e: any) => setmeetVenue(e)}
                multiline={true}
                numberOfLines={3}
              />
            </View>
          </View>
        </View>
        <Pressable
          style={{
            padding: 13,
            margin: 10,
            borderRadius: 7,
            backgroundColor: '#3e70c9',
          }}
          onPress={handleAddMeeting}
        >
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Add Meeting</Text>
        </Pressable>
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
  SearchBar: {
    width: '100%',
    elevation: 6,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  innercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  MeetingTitle: {
    fontSize: 19,
    maxWidth: '80%',
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
    backgroundColor: '#3e70c9',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  inputContainer: {
    width: '100%',
  },
  SearchInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
    borderRadius: 8,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  SearchInput: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  label: {
    fontSize: 18,
  },
})

// <TouchableOpacity style={[styles.MeetingButtons, { backgroundColor: '#3e70c9' }]}>
//   <FontAwesome name='edit' size={25} color={'#fff'} />
// </TouchableOpacity>
