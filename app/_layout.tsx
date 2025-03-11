import React from "react";
import { Slot } from "expo-router";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="MenuAwal" options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="EmergencyCallScreen" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="screens" options={{ headerShown: false }} />
      <Stack.Screen name="Location" options={{ headerShown: true }} />
    </Stack>
  );
}
