import React from 'react';
import { Stack } from 'expo-router';

export default function ReminderLayout() {
    return (
      <Stack>
        <Stack.Screen name="MakeSchedule" options={{ headerShown: false }} />
        <Stack.Screen name="EditSchedule" options={{ headerShown: false }} />
      </Stack>
    );
  }
  