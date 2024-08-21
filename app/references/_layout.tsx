import React from 'react'
import { Stack } from 'expo-router'

export default function ReferenceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='new_references' />
      <Stack.Screen name='index' />
    </Stack>
  )
}
