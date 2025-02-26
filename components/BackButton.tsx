import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

interface BackButtonProps {
  color?: string; // Warna teks dan ikon (default: "black")
  onPress?: () => void; // Aksi tambahan (opsional)
  top?: number;
  left?: number
  goHome?: boolean; // Tambahkan properti goHome
}

const BackButton: React.FC<BackButtonProps> = ({ color = "black", onPress, top, left = 25, goHome = false }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Jalankan fungsi tambahan jika ada
    } else {
        if (goHome) {
          router.replace("/(tabs)/Home"); // Arahkan ke halaman beranda
      } else {
          router.back(); // Kembali ke layar sebelumnya
    }
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        zIndex: 100,
        position: 'absolute',
        left,
        top
        // padding: 10,
      }}
    >
      <Ionicons name="arrow-back-circle" size={35} color={color} />

    </TouchableOpacity>
  );
};

export default BackButton;
