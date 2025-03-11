import React from 'react';
import { Slot, Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="SignInScreen" options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterScreen" options={{ headerShown: false }}/>
      <Stack.Screen name="ForgotPassInput" options={{ headerShown: false }}/>
    </Stack>
  );
}
