import React, { useState } from 'react';
import { Text, View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Accordion({ title, items, isActive, onPress, iconName }: any) {
  const [expanded, setExpanded] = useState(false);
  const [heightAnimation] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    setExpanded(!expanded);
    if (!expanded) {
      Animated.timing(heightAnimation, {
        toValue: 100, // Adjust this value according to the content's height
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(heightAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    onPress(); // Trigger active state change
  };

  return (
    <View className='py-2 px-[11px]'>
      <Pressable
        onPress={toggleAccordion}
        style={{
          flexDirection: 'row',
          padding: 12,
          borderRadius: 5,
          backgroundColor: isActive ? '#4296de' : 'transparent',
        }}
      >
        <View className='flex-1 flex-row'>
          <Ionicons name={iconName} size={24} color={isActive ? '#fff' : '#000'} style={{ marginRight: 20 }} />
          <Text style={{ fontSize: 15, color: isActive ? '#fff' : '#000' }}>{title}</Text>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color={isActive ? '#fff' : '#000'} />
      </Pressable>

      {expanded && (
        <Animated.View style={{ height: heightAnimation }}>
          <View style={{ paddingHorizontal: 16 }}>
            {items.map((item: any, index: any) => (
              <Link key={index} href={item.href} asChild>
                <Text onPress={() =>{ isActive = '' }} style={{ paddingVertical: 8 }}>
                  {item.name}
                </Text>
              </Link>
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
}
