import { View, Text } from 'react-native'
import React from 'react'
import Received_references from '@/components/Received_references';
import Dashboard from '@/components/Dash';

export default function received_references() {
  return (
    <Dashboard>
      <Received_references />
    </Dashboard>
  )
}
