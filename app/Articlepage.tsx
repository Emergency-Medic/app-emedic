import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import YoutubePlayer from 'react-native-youtube-iframe'; // buat video YouTube
// import Video from 'react-native-video'; // buat video lokal

const Articlepage = () => {
    const router = useRouter();
    const [quizStarted, setQuizStarted] = useState(false);
    const handlePress = () => {
      setQuizStarted(true);
    };
    return (
        <ScrollView style={styles.allwrap}>
            <StatusBar backgroundColor={Colors.white} translucent={false}/>
            <View style={styles.header}>
                <View style={styles.container}>
                    <View>
                      <BackButton color={Colors.red}/>
                    </View>
                    <Text style={styles.title}>Halaman Materi</Text>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Henti Jantung</Text>
                <Text style={styles.verified}>Di verifikasi oleh : 
                  <Text style={styles.verifiedname}>
                   Dr. Yuan, Dr. Devi
                  </Text>
                </Text>
                <Text style={styles.description}>
                    Henti jantung adalah kondisi darurat ketika jantung tiba-tiba berhenti berdetak, menghentikan aliran darah ke otak dan organ vital, yang bisa berakibat fatal jika tidak segera ditangani.
                </Text>
            </View>

            <View style={styles.container}>
                {/* Penanganan Section */}
                <Text style={styles.sectionHeader}>Penanganan</Text>
                <View style={styles.card}>
                  <View>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons name="debug-step-into" size={24} color='#A8201A' />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>Pastikan Keamanan Lingkungan</Text>
                      <Text style={styles.cardContent}>
                        Pastikan area aman untuk Anda dan korban.
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                  <View>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons name="debug-step-into" size={24} color='#A8201A' />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>Periksa Respons Korban</Text>
                      <Text style={styles.cardContent}>
                      Goyangkan dan panggil korban. Jika tidak merespons, segera lanjutkan ke langkah berikut.
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.card}>
                  <View>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons name="debug-step-into" size={24} color='#A8201A' />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.cardTitle}>Panggil Bantuann</Text>
                      <Text style={styles.cardContent}>
                      Hubungi layanan darurat medis kami. Minta orang lain mencari Automated External Defibrillator (AED) jika tersedia.
                      </Text>
                      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.aedImage} />
                    <Text style={styles.cardContent}>
                      / alat medis yang untuk menganalisis dan memberikan kejutan listrik secara otomatis kepada seseorang yang mengalami henti jantung.
                     </Text>
                    </View>
                  </View>
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.footerText}>
                        Sudah paham? Yuk kita coba kerjakan kuis ini untuk mempersiapkan diri kalian di tengah situasi darurat!
                      </Text>
                      <TouchableOpacity style={styles.quizButton} onPress={handlePress}>
                        <View style={styles.buttonContent}>
                          <Text style={styles.quizButtonText}>Mulai Kuis</Text>
                          {quizStarted && (
                            <View style={styles.resultContainer}>
                              <Text style={styles.resultText}>Lihat hasil</Text>
                              <Icon name="check-circle" size={20} color="red" />
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => router.push("./MenuAwal")} style={styles.finishButton}>
                        <Text style={styles.finishButtonText}>Selesai</Text>
                      </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    allwrap: {
      height: '100%',
      backgroundColor: Colors.white,
    },
    container: {
      flex: 1
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: Colors.white,
    },
    title: {
      flex: 1,
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'bold',
      color: Colors.blue
    },
    videoContainer: {
      margin: 16,
      borderRadius: 10,
      overflow: 'hidden',
    },
    localVideo: {
      width: '100%',
      height: 200,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'bold',
      paddingHorizontal: 16,
      marginTop: 16,
      color: Colors.red
    },
    verified: {
      fontSize: 14,
      color: '#6C6C6C',
      paddingHorizontal: 16,
      textAlign: 'right',
      fontFamily: 'regular'
    },
    verifiedname: {
      fontSize: 14,
      color: '#6C6C6C',
      paddingHorizontal: 16,
      textAlign: 'right',
      fontFamily: 'bold'
    },
    description: {
      fontSize: 16,
      paddingHorizontal: 16,
      marginVertical: 8,
      fontFamily : 'regular',
      color: Colors.grey
    },
    sectionHeader: {
      fontSize: 18,
      fontFamily: 'bold',
      paddingHorizontal: 16,
      marginTop: 16,
      color: Colors.blue
    },
    card: {
      backgroundColor: Colors.white,
      borderRadius: 10,
      margin: 12,
      padding: 16,
      elevation: 2,
      position: 'relative',
    },
    iconContainer: {
      position: 'absolute', // Membuat ikon tetap di posisi kiri atas
      top: 5,
      width: 30,
      height: 30,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#FBCDCD',
      backgroundColor: Colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: Colors.red,
      fontSize: 12,
      fontWeight: 'bold',
    },
    textContainer: {
      marginLeft: 50, // Memberikan jarak cukup besar agar teks tidak overlap dengan ikon
    },
    cardTitle: {
      fontSize: 16,
      fontFamily: 'bold',
      marginBottom: 4,
      color: Colors.red,
    },
    cardContent: {
      fontSize: 14,
      color: Colors.blue,
      fontFamily: 'regular',
    },
    aedImage: {
      width: 100,
      height: 100,
      margin: 8,
      alignSelf: 'center',
    },
    footerText: {
      fontSize: 14,
      color: Colors.grey,
      paddingLeft: 25,
      marginTop: 16,
      fontFamily: 'regular',
    },
    quizButton: {
      backgroundColor: Colors.blue,
      margin: 16,
      padding: 12,
      borderRadius: 8,
    },
    buttonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    quizButtonText: {
      paddingLeft: 5,
      color: Colors.white,
      fontSize: 16,
      fontFamily: 'bold',
    },
    resultContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8, // Gunakan gap untuk memberi jarak antara teks dan ikon jika mendukung
    },
    resultText: {
      color: Colors.white,
      fontSize: 14,
      marginRight: 8,
    },
    finishButton: {
      backgroundColor: '#A8201A',
      marginHorizontal: 16,
      marginBottom: 32,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    finishButtonText: {
      color: Colors.white,
      fontSize: 20,
      fontFamily: 'bold'
    },
});

export default Articlepage;