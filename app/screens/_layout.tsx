import { Stack } from 'expo-router';

export default function ScreenLayout() {
    return (
      <Stack>
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="artikel" options={{ headerShown: false }} />
        <Stack.Screen name="quiz" options={{ headerShown: false }} />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
        <Stack.Screen name="reminder" options={{ headerShown: false }} />
        <Stack.Screen name="MetodePenangan" options={{headerShown: false}}/>
      </Stack>
    );
  }
  