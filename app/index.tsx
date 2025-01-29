import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import EmergencyCallScreen from "./EmergencyCallScreen";
import MenuAwal from "./MenuAwal";
import React, {useEffect} from "react";
import Onboarding from "./Onboarding"
import SignInScreen from './(auth)/SignInScreen'
import RegisterScreen from './(auth)/RegisterScreen'
import Quiz from "./Quiz"
import Summary from "./Summary";
import ScoreScreen from "./ScoreScreen";
import Flashcard from "./FlashCard";
import Homepagelayanan from "./Homepagelayanan";
import SearchPage from "./SearchPage"
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
  useEffect(() => {
    if (auth.currentUser) {
        router.replace("./(tabs)/Home"); // Arahkan ke halaman Home jika sudah login
    }
  }, [router]);
  return (
    <View>
      <SearchPage />
      {/* <Homepagelayanan /> */}
      {/* <Quiz /> */}
      {/* <MenuAwal /> */}
      {/* <Contactpage /> */}
    </View>
  );
}
