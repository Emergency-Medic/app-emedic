import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
// import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// ini sementara dari link dulu yaa, blm nemu videonya
const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const Articlepage = () => {
    const router = useRouter();
    const [quizStarted, setQuizStarted] = useState(false);
    const handlePress = () => {
      setQuizStarted(true);
    };
    // video
    const player = useVideoPlayer(videoSource, player => {
      player.loop = true;
      player.play();
    });
    // const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    return (
        <ScrollView style={styles.allwrap}>
                      <BackButton top={45} color={Colors.red}/>
            <StatusBar style='dark' translucent={true}/>
            <View style={styles.header}>
                <View style={styles.container}>
                    <View>
                    </View>
                    <Text style={styles.title}>Halaman Materi</Text>
                </View>
            </View>
            {/* video */}
            <View style={styles.videoContainer}>
              <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
              <View style={styles.controlsContainer}>
              </View>
            </View>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <View style={styles.titleRow}>
                        <Text style={styles.sectionTitle}>Henti Jantung</Text>
                        <MaterialIcons name="verified" size={20} color="#007bff" style={styles.verifiedIcon} />
                    </View>
                </View>
                <Text style={styles.verified}>Di verifikasi oleh : 
                  <Text style={styles.verifiedname}>
                   Dr. Deon, Dr. Devi
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
      marginTop:30,
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
      marginTop: 15,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    video: {
      width: 350,
      height: 220,
      borderRadius: 10,
    },
    controlsContainer: {
      margin: 5,
    },
    containerTitle: {
      marginTop: 10,
      flex: 1,
      paddingHorizontal: 16,
    },
    titleRow: {
      flexDirection: 'row', 
      alignItems: 'center', 
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'bold',
      color: Colors.blue, 
      marginRight: 10, 
    },
    verifiedIcon: {
      marginTop: 2, 
    },
    verified: {
      fontSize: 14,
      color: '#6C6C6C',
      paddingHorizontal: 16,
      textAlign: 'right',
      fontFamily: 'regular',
      margin: 5
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
      marginVertical: 10, 
      marginHorizontal: 12,
      padding: 16,
      elevation: 1.75,
      position: 'relative',
    },
    iconContainer: {
      position: 'absolute', 
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
      marginLeft: 45,
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
      gap: 8,
    },
    resultText: {
      color: Colors.white,
      fontSize: 14,
      marginRight: 8,
    },
    finishButton: {
      backgroundColor: '#A8201A',
      marginHorizontal: 16,
      marginTop: 20,
      marginBottom: 32,
      padding: 12,
      borderRadius: 30,
      alignItems: 'center',
    },
    finishButtonText: {
      color: Colors.white,
      fontSize: 20,
      fontFamily: 'bold'
    },
});

export default Articlepage;