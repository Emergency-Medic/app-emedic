import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
      <Stack>
        <Stack.Screen name="MakeSchedule" options={{ headerShown: false }} />
        <Stack.Screen name="EditSchedule" options={{ headerShown: false }} />
      </Stack>
    );
  }
  