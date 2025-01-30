import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import EmergencyCallScreen from "./EmergencyCallScreen";
import MenuAwal from "./MenuAwal";
import React from "react";
import Onboarding from "./Onboarding"
import SignInScreen from './(auth)/SignInScreen'
import RegisterScreen from './(auth)/RegisterScreen'
import Quiz from "./Quiz"
import Summary from "./Summary";
import ScoreScreen from "./ScoreScreen";
import Flashcard from "./FlashCard";
<<<<<<< HEAD
import Homepagelayanan from "./Homepagelayanan";
import SearchPage from "./SearchPage"; 
import Location from "./Location";
=======
import TahapAwal from "./TahapAwal";
import MakeSchedule from "./MakeSchedule";
import EditSchedule from "./EditSchedule";
import Slider from "./Slider";
>>>>>>> e1aba5769659c38028ace166a1265cdf681aa1a0

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
  return (
    <View>
<<<<<<< HEAD
      {/* <SearchPage /> */}
=======
>>>>>>> e1aba5769659c38028ace166a1265cdf681aa1a0
      {/* <Homepagelayanan /> */}
      {/* <Quiz /> */}
      <Slider />
      {/* <Contactpage /> */}
<<<<<<< HEAD
      <Location />
=======
      {/* <MenuAwal /> */}
>>>>>>> e1aba5769659c38028ace166a1265cdf681aa1a0
    </View>
  );
}