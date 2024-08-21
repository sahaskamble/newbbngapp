import React from 'react'
import { Stack } from 'expo-router'

export default function OnetooneLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='new_onetoone' />
      <Stack.Screen name='onetoones' />
    </Stack>
  )
}
