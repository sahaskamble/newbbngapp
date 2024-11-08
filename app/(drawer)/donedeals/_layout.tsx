import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen
        name='given'
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='received'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  )
}
