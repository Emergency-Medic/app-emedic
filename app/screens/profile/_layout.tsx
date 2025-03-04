import React from 'react';
import { Stack } from 'expo-router';

export default function ProfileLayout() {
    return (
      <Stack>
        <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
        <Stack.Screen name="ChangePass" options={{ headerShown: false }} />
        <Stack.Screen name="ChangeName" options={{ headerShown: false }} />
        <Stack.Screen name="ChangeUsername" options={{ headerShown: false }} />
        <Stack.Screen name="ChangePhone" options={{ headerShown: false }} />
        <Stack.Screen name="ChangeEmail" options={{ headerShown: false }} />
      </Stack>
    );
  }
  