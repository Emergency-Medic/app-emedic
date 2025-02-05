import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import EmergencyCallScreen from "./EmergencyCallScreen";
import MenuAwal from "./MenuAwal";
import React, {useEffect, useState} from "react";
import Onboarding from "./Onboarding"
import SignInScreen from './(auth)/SignInScreen'
import RegisterScreen from './(auth)/RegisterScreen'
import Quiz from "./Quiz"
import Summary from "./Summary";
import ScoreScreen from "./ScoreScreen";
import Flashcard from "./FlashCard";
import Homepagelayanan from "./Homepagelayanan";
import Location from "./Location";
import Home from "./(tabs)/Home";
import { auth, db } from '@/firebaseConfig';
import { useRouter } from "expo-router";

const Stack = createStackNavigator(); 

export default function Index() {
  useFonts({
    'regular': require('.././assets/fonts/Nunito-Regular.ttf'),
    'italic': require('.././assets/fonts/Nunito-Italic.ttf'),
    'light': require('.././assets/fonts/Nunito-Light.ttf'),
    'medium': require('.././assets/fonts/Nunito-Medium.ttf'),
    'semibold': require('.././assets/fonts/Nunito-SemiBold.ttf'),
    'bold': require('.././assets/fonts/Nunito-Bold.ttf'),
    'extrabold': require('.././assets/fonts/Nunito-ExtraBold.ttf'),
    'black': require('.././assets/fonts/Nunito-Black.ttf'),
  })

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Track if loading or checking auth state
  const [user, setUser] = useState<any>(null); // Track the authenticated user

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false); // Stop loading once auth state is checked
      setUser(user); // Set the current user if logged in
      if (user) {
        // If the user is logged in, navigate to Home
        router.replace("./Location");
      } else {
        // If no user, stay on MenuAwal
        router.replace("./MenuAwal");
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [router]);

  // if (isLoading) {
  //   return <LoadingScreen />; // You can use a placeholder or loading spinner here
  // }
  return (
    <View>
      {user ? <Home /> : <MenuAwal />}
    </View>
  );
}
