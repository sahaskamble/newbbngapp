import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '',
};

export default function RootLayout() {

  // const [isLoaded, setisLoaded] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  if (!loaded) {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Loading please wait...</Text>
      </View>
    );
  }
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4296de',
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="modal" options={{ headerTitle: 'Profile', presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
