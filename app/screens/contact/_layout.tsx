import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
      <Stack>
        <Stack.Screen name="Contactpage" options={{ headerShown: false }} />
        <Stack.Screen name="ApproveFriend" options={{ headerShown: false }} />
        <Stack.Screen name="SendRequest" options={{ headerShown: false }} />
      </Stack>
    );
  }
  