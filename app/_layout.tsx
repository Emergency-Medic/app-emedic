import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="EmergencyCallScreen" options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="Articlepage" options={{ headerShown: false }} />
      <Stack.Screen name="Contactpage" options={{ headerShown: false }} />
      <Stack.Screen name="ApproveFriend" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="screens" options={{ headerShown: false }} />
    </Stack>
  );
}
