import { Stack } from 'expo-router';

export default function AwalLayout() {
    return (
      <Stack>
        <Stack.Screen name="Slider" options={{ headerShown: false }} />
      </Stack>
    );
  }
  