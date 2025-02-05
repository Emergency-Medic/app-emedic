import { Stack } from 'expo-router';

export default function ArtikelLayout() {
    return (
      <Stack>
        <Stack.Screen name="awal" options={{ headerShown: false }} />
        <Stack.Screen name="Articlepage" options={{ headerShown: false }} />
      </Stack>
    );
  }
  