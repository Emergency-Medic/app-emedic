import { Stack } from 'expo-router';

export default function QuizLayout() {
    return (
      <Stack>
        <Stack.Screen name="Quiz" options={{ headerShown: false }} />
        <Stack.Screen name="ScoreScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Summary" options={{ headerShown: false }} />
      </Stack>
    );
  }
  