import React from 'react'
import { Stack } from 'expo-router'

export default function ReferenceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='business_given' />
      <Stack.Screen name='business_received' />
    </Stack>
  )
}
