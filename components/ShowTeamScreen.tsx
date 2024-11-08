import { View, Text, FlatList, Image, Dimensions, TouchableOpacity, ViewBase } from 'react-native'
import React, { useRef, useState } from 'react';
const { height } = Dimensions.get('window');

export default function ShowTeamScreen({ handleMessage }: any) {

  const ImagesandData1 = [
    { id: 1, name: 'Shripad Kulkarni', link: 'https://www.bbnglobal.net/files/image/shripad-k.jpg', role: 'President' },
    { id: 2, name: 'Mukund Kulkarni', link: 'https://www.bbnglobal.net/files/image/mukund-k.jpg', role: 'Vice President' },
    { id: 3, name: 'Madhura Kumbhejkar', link: 'https://www.bbnglobal.net/files/image/madhura-k.jpg', role: 'Director, Finance & Communication' },
    { id: 4, name: 'Arvind Korhalkar', link: 'https://www.bbnglobal.net/files/image/arvind-k.jpg', role: 'Gen. Secretary & Ex. Director, Sustainance' },
  ]
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [changebtn, setchangebtn] = useState(false);

  const handleNext = () => {
    if (currentIndex < ImagesandData1.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const renderItem = ({ item }: any) => (
    <View className="flex-1 items-center justify-center" style={{ height }}>
      <View className='my-8'>
        <View className='flex-row justify-center items-center gap-3'>
          <View className='w-[40px] h-2 bg-orange-500 rounded'></View>
          <Text className='text-lg text-orange-400'>Our Team</Text>
          <View className='w-[40px] h-2 bg-orange-500 rounded'></View>
        </View>
        <Text className='text-2xl font-semibold'>Team BBN Global</Text>
      </View>
      <Image
        source={{ uri: item.link }}
        className="w-full h-[300]"
        resizeMode="cover"
      />
      <Text className="text-2xl font-bold mt-4">{item.name}</Text>
      <Text className="text-lg">{item.role}</Text>
    </View>
  );

  return (
    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={ImagesandData1}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={height} // Makes sure each item fills the screen height
        decelerationRate="fast"
        className='mb-8'
      />
      <View className="absolute bottom-0 left-0 right-0 p-4">
        {
          currentIndex < ImagesandData1.length - 1 ? (
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-lg items-center"
              onPress={handleNext}
            >
              <Text className="text-white text-lg">Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-lg items-center"
              onPress={handleMessage}
            >
              <Text className="text-white text-lg">Login</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </View>
  );
}
