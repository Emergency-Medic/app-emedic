import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebaseConfig"; // atau lokasi auth Anda

export const usePreventBackToSignIn = () => {
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      // Jika user sudah login, cegah kembali ke halaman login
      if (auth.currentUser) {
        return true; // Cegah default back action
      }
      return false; // Jika user belum login, biarkan back bekerja
    };

    // Menambahkan listener untuk back button
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    // Bersihkan listener ketika komponen tidak digunakan
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, []);

  return null; // Hook ini tidak perlu return apa-apa
};
