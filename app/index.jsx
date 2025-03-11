import { useFonts } from "expo-font";
import { View, Platform, Alert, AppRegistry } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MenuAwal from "./MenuAwal";
import React, { useEffect, useState } from "react";
import Home from "./(tabs)/Home";
import { auth, db, app } from '@/firebaseConfig';
import { useRouter, useRootNavigationState } from "expo-router";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import * as Linking from 'expo-linking';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import * as TaskManager from 'expo-task-manager';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging';
import messaging from '@react-native-firebase/messaging';

// const messaging = getMessaging(); // Gunakan API modular
// onBackgroundMessage(messaging, async (remoteMessage) => {
//   console.log('Message handled in the background!', remoteMessage);
// });

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

Notifications.addNotificationResponseReceivedListener(response => {
  const { latitude, longitude, action } = response.notification.request.content.data;

  if (action === "open_map" && latitude && longitude) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  }
});

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

// Definisikan task untuk menerima notifikasi saat aplikasi mati
TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    if (error) {
      console.log("error occurred");
    }
    if (data) {
      console.log("data-----", data);
    }
  }
);

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

Notifications.setNotificationHandler({
  handleNotification: async () => {
    console.log("📩 Notifikasi diterima di foreground!");
    return {
      shouldShowAlert: true, 
      shouldPlaySound: true, 
      shouldSetBadge: false,
    };
  },
});

console.log("Done")


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
  const [user, setUser] = useState(null); // Track the authenticated user
  const rootNavigationState = useRootNavigationState();

  useEffect( () => {
    if (!rootNavigationState?.key) return;
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(false);
      setUser(user);
      
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists() || !userSnap.data().pushToken) {
          // Jika pushToken tidak ada, ulangi pendaftaran notifikasi
          await registerForPushNotificationsAsync(user.uid);
        }

        setTimeout(() => {
          router.replace("./(tabs)/Home"); // Arahkan ke halaman Home jika sudah login
        }, 100);
      } else {
        setTimeout(() => {
          router.replace("./MenuAwal");
        }, 100);
      }
    });

    const unsubs = messaging().onMessage(async remoteMessage => {
      if (remoteMessage?.data?.action === "open_map") {
        const { latitude, longitude } = remoteMessage.data;
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url);
      }
    });

    // return unsubs;

    const setupNotificationChannel = async () => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
          sound: 'alarm.wav',
          enableLights: true,
          enableVibrate: true,
          fullScreenIntent: true
        });
      }
    };

    // const channels = await Notifications.getNotificationChannelsAsync();
    // console.log("🔊 Notifikasi Channels:", channels);

    
    setupNotificationChannel();
    Notifications.registerTaskAsync('MED_REMINDER_HANDLER');

    const checkPermissions = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      console.log("🔍 Status izin notifikasi:", status);
  
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        console.log("📌 Status izin setelah permintaan:", newStatus);
      }
    };
  
    checkPermissions();
  
    // Fungsi untuk mendaftarkan push notification
    const registerForPushNotificationsAsync = async (uid) => {
      if (!uid) return;

      if (Device.isDevice) {
        let { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          status = newStatus;
        }

        if (status !== 'granted') {
          Alert.alert('Gagal mendapatkan token push untuk mengirim notifikasi! Silakan coba lagi.');
          return registerForPushNotificationsAsync(uid); // Ulangi permintaan izin
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;
        const userRef = doc(db, "users", uid);
        try {
          await setDoc(userRef, { pushToken: token }, { merge: true });
          console.log("Push token saved successfully.");
        } catch (error) {
          console.error("Error saving push token:", error);
        }
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

    const foregroundSubscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("🎯 Notifikasi diterima di foreground:", notification);
  
      // Untuk menampilkan alert agar notifikasi terlihat
      Alert.alert(notification.request.content.title, notification.request.content.body);
    });

    // Tambahkan listener untuk notifikasi
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("📩 Notifikasi ditekan:", response);
      const { latitude, longitude, formattedAddress, name } = response.notification.request.content.data;
      console.log(latitude, longitude)
      if (latitude && longitude) {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url);
      }
      // if (latitude && longitude) {
      //   router.push({
      //     pathname: "/Location",
      //     params: { latitude, longitude, formattedAddress, name },
      //   });
      // }
    });

    return () => {
      unsubscribe();
      subscription.remove();
      foregroundSubscription.remove();
      unsubs
    };
}, [router]);


  return (
      <View>
        {!!user ? <Home /> : <MenuAwal />}
      </View>
  );
}
AppRegistry.registerComponent('index', () => index);