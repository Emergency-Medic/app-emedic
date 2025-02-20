import React from 'react';
import { Stack } from 'expo-router';

export default function ContactLayout() {
    return (
      <Stack>
        <Stack.Screen name="Contactpage" options={{ headerShown: false }} />
        <Stack.Screen name="ApproveFriend" options={{ headerShown: false }} />
        <Stack.Screen name="SendRequest" options={{ headerShown: false }} />
      </Stack>
    );
  }
  