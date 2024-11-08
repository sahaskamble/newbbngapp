import React from 'react'
import { Stack } from 'expo-router'

export default function ReferenceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitle: 'Received'
      }}
    >
      <Stack.Screen name='new' />
      <Stack.Screen name='given' />
      <Stack.Screen name='received'
      />
    </Stack>
  )
}
