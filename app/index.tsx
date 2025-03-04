import { useFonts } from "expo-font";
import { View, Platform, Alert, Linking } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MenuAwal from "./MenuAwal";
import React, { useEffect, useState } from "react";
import Home from "./(tabs)/Home";
import { auth, db } from '@/firebaseConfig';
import { useRouter, useRootNavigationState } from "expo-router";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { collection, doc, setDoc } from 'firebase/firestore';

const Stack = createStackNavigator(); 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function index() {
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
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(false);
      setUser(user);
      console.log(auth.currentUser.uid)
      console.log(user.uid)
      if (auth.currentUser) {
        setTimeout(() => {
          router.replace("./(tabs)/Home"); // Arahkan ke halaman Home jika sudah login
      }, 100);
      } else {
        setTimeout(() => {
          router.replace("./MenuAwal");
        }, 100);
      }
    });
    // Fungsi untuk mendaftarkan push notification
    const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Gagal mendapatkan token push untuk mengirim notifikasi!');
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          try {
            await setDoc(userRef, { pushToken: token }, { merge: true });
            console.log("Push token saved successfully.");
          } catch (error) {
            console.error("Error saving push token:", error);
          }
        }
        console.log(token);
      } else {
        Alert.alert('Harus menggunakan perangkat fisik untuk push notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    };

    registerForPushNotificationsAsync();

    // Tambahkan listener untuk notifikasi
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { latitude, longitude } = response.notification.request.content.data;
      if (latitude && longitude) {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url); // Buka Google Maps dengan lokasi darurat
      }
    });

    // Cleanup semua listener saat komponen di-unmount
    return () => {
      unsubscribe();
      subscription.remove();
    };
  }, [router]);

  return (
      <View>
        {!!user ? <Home /> : <MenuAwal />}
      </View>
  );
}