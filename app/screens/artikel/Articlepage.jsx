import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'
import { useRouter, useLocalSearchParams } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { WebView } from 'react-native-webview';

const Articlepage = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const {id} = params;
    const [quizStarted, setQuizStarted] = useState(false);
    const [title, setTitle] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [verifikasi, setVerifikasi] = useState('');
    const [dos, setDos] = useState([]);
    const [donts, setDonts] = useState([]);
    const [gambarPenyakit, setGambarPenyakit] = useState('');
    const [gambarDos, setGambarDos] = useState('');
    const [video, setVideo] = useState('');
    const userId = auth.currentUser.uid
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handlePress = () => {
      router.push(`../quiz/Quiz?id=${id}`)
      setQuizStarted(true);
    };

    useEffect(() => {
      setIsLoading(true)
      const checkQuizStatus = async () => {
          if (userId) {
              try {
                  const quizDocRef = doc(db, 'userAnswers', userId, 'articleAnswers', id);
                  const quizDoc = await getDoc(quizDocRef);
                  if (quizDoc.exists() && quizDoc.data().completed) {
                      setQuizStarted(true);
                  }
              } catch (error) {
                  console.error('Error checking quiz status:', error);
              }
          }
      };
      checkQuizStatus();

      const fetchQuestions = async () => {
          try {
              const questionsCollection = collection(db, 'articles_no_cat', id, 'questions');
              const questionSnapshot = await getDocs(questionsCollection);
              const questionList = questionSnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
              }));
              console.log(questionList)
              setQuestions(questionList);
          } catch (error) {
              console.error('Error fetching questions:', error);
          }
      };
      fetchQuestions();
      setIsLoading(false)
  }, [userId, id]);

    useEffect(() => {
      console.log(id)
      setIsLoading(true)
      if (!id) return;
      // console.log("Articlepage ID:", id);
      const fetchData = async () => {
        if (typeof id !== 'string') {
          console.error("ID is not a string:", id);
          return;
      }
      try {
          const docRef = doc(db, "articles_no_cat", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
              const data = docSnap.data();
              setTitle(data.judul);
              setDeskripsi(data.deskripsi);
              setVerifikasi(data.verifikasi);
              setDos(data["do's"] || []);
              setDonts(data["dont's"] || []);
              setGambarPenyakit(data.gambarPenyakit || '');
              setGambarDos(data["gambarDo's"] || '');
              setVideo(data.video);
          } else {
              console.log("No such document!");
          }
      } catch (error) {
          console.error("Error fetching document:", error);
      }
      };
      setIsLoading(false)
      fetchData();
    }, [id]);

    return (
        <ScrollView style={styles.allwrap}>
            <BackButton top={45} color={Colors.red} goHome={true}/>
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
            {!!video ? (
                <WebView
                  style={styles.video}
                  source={{ uri: video }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                />
              ) : (
                <Text>Video loading..</Text>
              )}
            </View>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <View style={styles.titleRow}>
                    <Text style={styles.sectionTitle}>{title}</Text>
                        <MaterialIcons name="verified" size={20} color="#007bff" style={styles.verifiedIcon} />
                    </View>
                </View>
                <Text style={styles.verified}>Diverifikasi oleh : 
                  <Text style={styles.verifiedname}>
                   {verifikasi}
                  </Text>
                </Text>
                <Text style={styles.description}>
                    {deskripsi}
                </Text>

                {!!gambarPenyakit ? (
                  <Image source={{ uri: gambarPenyakit }} style={styles.aedImage} />
                ) : null}
            </View>

            <View style={styles.container}>
                {/* Penanganan Section */}
                <Text style={styles.sectionHeader}>Dont's</Text>
                {donts.length > 0 ? (
                  donts.map((item, index) => (
                    <View key={index} style={styles.card}>
                      <View>
                        <View style={styles.iconContainer}>
                          <MaterialCommunityIcons name="debug-step-into" size={24} color="#A8201A" />
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.cardTitle}>Peringatan {index + 1}</Text>
                          <Text style={styles.cardContent}>{item}</Text>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.cardContent}>No Do's available</Text>
                )}

                <Text style={styles.sectionHeader}>Do's</Text>
                {dos.length > 0 ? (
                  dos.map((item, index) => (
                    <View key={index} style={styles.card}>
                      <View>
                        <View style={styles.iconContainer}>
                          <MaterialCommunityIcons name="debug-step-into" size={24} color="#A8201A" />
                        </View>
                        <View style={styles.textContainer}>
                          <Text style={styles.cardTitle}>Langkah {index + 1}</Text>
                          <Text style={styles.cardContent}>{item}</Text>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.cardContent}>No Do's available</Text>
                )}

                {!!gambarDos ? (
                  <Image source={{ uri: gambarDos }} style={styles.aedImage} />
                ) : null}
            </View>

            <View style={styles.container}>
                <Text style={styles.footerText}>
                        Sudah paham? Yuk kita coba kerjakan kuis ini untuk mempersiapkan diri kalian di tengah situasi darurat!
                      </Text>
                      <TouchableOpacity style={styles.quizButton} onPress={handlePress}>
                        <View style={styles.buttonContent}>
                          <Text style={styles.quizButtonText}>Mulai Kuis</Text>
                        </View>
                          {quizStarted ? (
                            <TouchableOpacity 
                            style={styles.resultContainer}
                            onPress={() =>
                                        router.push({
                                            pathname: '../quiz/Summary',
                                            params: { questions: JSON.stringify(questions), id: id },
                                        })}
                            >
                              <Text style={styles.resultText}>Lihat hasil</Text>
                              <Icon name="check-circle" size={20} color={Colors.red} />
                            </TouchableOpacity>
                          ) : null}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => router.back()} style={styles.finishButton}>
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
      justifyContent: 'center',
      marginBottom: 15,
    },
    video: {
      width: 400,
      height: 250,
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
      width: 300,
      height: 300,
      // margin: 8,
      alignSelf: 'center',
      resizeMode: 'contain'
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
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
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
      backgroundColor: Colors.white,
      paddingHorizontal: 7,
      paddingVertical: 5,
      borderRadius: 5
    },
    resultText: {
      color: Colors.blue,
      fontSize: 14,
      marginRight: 8,
      fontFamily: 'bold',
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
      fontFamily: 'semibold'
    },
});

export default Articlepage;