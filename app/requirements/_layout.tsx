import React from 'react'
import { Stack } from 'expo-router'

export default function ReferenceLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='post_form' />
      <Stack.Screen name='view_requirements' />
    </Stack>
  )
}
