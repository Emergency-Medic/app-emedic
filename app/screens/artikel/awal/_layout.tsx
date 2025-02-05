import { Stack } from 'expo-router';

export default function Layout() {
    return (
      <Stack>
        <Stack.Screen name="Slider" options={{ headerShown: false }} />
      </Stack>
    );
  }
  