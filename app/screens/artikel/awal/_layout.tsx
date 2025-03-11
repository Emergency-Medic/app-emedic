import React from 'react';
import { Stack } from 'expo-router';

export default function AwalLayout() {
    return (
      <Stack>
        <Stack.Screen name="Slider" options={{ headerShown: false }} />
        <Stack.Screen name="SliderTahapA" options={{ headerShown: false }} />
        <Stack.Screen name="SliderTahapB" options={{ headerShown: false }} />
        <Stack.Screen name="SliderTahapC" options={{ headerShown: false }} />
      </Stack>
    );
  }
  