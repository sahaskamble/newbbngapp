import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='chaptermeeting' />
    </Stack>
  )
}
