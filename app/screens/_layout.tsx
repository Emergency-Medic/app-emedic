import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="MetodePenangan" options={{headerShown: false}}/>
      </Stack>
    );
  }
  