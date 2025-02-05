import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="artikel" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
        <Stack.Screen name="reminder" options={{ headerShown: false }} />
        <Stack.Screen name="MetodePenangan" options={{headerShown: false}}/>
      </Stack>
    );
  }
  