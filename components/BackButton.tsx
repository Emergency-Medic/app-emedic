import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

interface BackButtonProps {
  color?: string; // Warna teks dan ikon (default: "black")
  onPress?: () => void; // Aksi tambahan (opsional)
  top?: number;
}

const BackButton: React.FC<BackButtonProps> = ({ color = "black", onPress, top }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Jalankan fungsi tambahan jika ada
    } else {
      router.back(); // Default: kembali ke layar sebelumnya
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: 'absolute',
        left: 25,
        top
        // padding: 10,
      }}
    >
      <Ionicons name="arrow-back-circle" size={35} color={color} />

    </TouchableOpacity>
  );
};

export default BackButton;
