import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList , ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { db, auth } from '@/firebaseConfig';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';


const Quiz = () => {
  const params = useLocalSearchParams();
  const { id } = params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const userId = auth.currentUser.uid

  const totalQuestions = questions.length;

  useEffect(() => {
    console.log("Fetching questions... ID:", id);  // 🔍 Debugging
    
    if (!id) {
        console.log("ID belum tersedia");
        return;
    }
    const fetchQuestions = async () => {
        try {
            const questionsCollection = collection(db, 'articles_no_cat', id, 'questions');
            const questionSnapshot = await getDocs(questionsCollection);
            if (questionSnapshot.empty) {
              console.log("Tidak ada dokumen dalam subkoleksi 'questions'.");
              return;
          }
            const questionList = questionSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Fetched Questions:', questionList);
            setQuestions(questionList);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };
    fetchQuestions();
}, [id]);

const handleAnswer = (answerIndex) => {
  const newAnswers = [...userAnswers];
  newAnswers[currentQuestionIndex] = answerIndex;
  setUserAnswers(newAnswers);
  console.log("📌 Jawaban pengguna:", newAnswers);
  handleNext()
};


  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const saveAnswersToFirestore = async () => {
    try {
        if (auth.currentUser) {
          console.log('User Answers to Save:', userAnswers);
          console.log(userId)
          console.log(id)
          const quizDocRef = doc(db, 'userAnswers', userId, 'articleAnswers', id);
          await setDoc(quizDocRef, {
              answers: userAnswers,
              completed: true, // Set status kuis selesai
          });
          router.push({
              pathname: './ScoreScreen',
              params: {
                  questions: JSON.stringify(questions),
                  userAnswers: JSON.stringify(userAnswers),
                  id: id
              },
          });
        }
    } catch (error) {
        console.error('Error saving answers:', error);
    }
};

    return (
      <ScrollView style={styles.allwrap}>
        <BackButton top={45} color={Colors.red}/>
      <View style={styles.container}>
        {/* <BackButton color={Colors.red} top={45}/> */}
        <Text style={styles.progressText}>
        Soal {currentQuestionIndex + 1} / {totalQuestions}
        </Text>
        <Progress.Bar
        progress={(currentQuestionIndex + 1) / totalQuestions}
        width={300}
        color={'#A8201A'}
        // style={styles.progressBar}
      />
      
      
        {/* <View style={styles.navigationButtons2}>
            <TouchableOpacity onPress={() => router.back()} style={styles.skipButton}>
                <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
            </TouchableOpacity>
        </View> */}
        
          {questions.length > 0 ? (
            <>
              <Text style={styles.textSoal}>{questions[currentQuestionIndex].text}</Text>

              <View style={styles.containerjawaban}>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.cardContent, 
                    userAnswers[currentQuestionIndex] === index ? styles.selectedAnswer : null
                  ]} 
                  onPress={() => handleAnswer(index)}>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <Text>Loading questions...</Text> // Tampilkan pesan loading sementara
          )}

        <View style={styles.navigation}>
          {/* Panah ke kanan (jika index ke-0) */}
          {currentQuestionIndex === 0 ? (
            <>
            {userAnswers.length === questions.length && !userAnswers.includes(undefined) ? (
              <View style={styles.submitButtonEnding}>
                <TouchableOpacity onPress={saveAnswersToFirestore} style={styles.submitButton}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={handleNext} style={styles.elips}>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
            </View>
            </>
          ) : null}

          {/* Panah kiri dan kanan (jika bukan index ke-0) */}
          {currentQuestionIndex > 0 ? (
            <>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={handlePrevious} style={styles.elips}>
                  <Text style={styles.arrow}>{'<'}</Text>
                </TouchableOpacity>
              </View>
              {userAnswers.length === questions.length && !userAnswers.includes(undefined) ? (
              <View style={styles.submitButtonEnding}>
                <TouchableOpacity onPress={saveAnswersToFirestore} style={styles.submitButton}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            ) : null}
              {currentQuestionIndex < totalQuestions - 1 ? (
                <>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={handleNext} style={styles.elips}>
                    <Text style={styles.arrow}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
                </>
              ) : null}
            </>
          ) : null}
          
        </View>

      </View>
      </ScrollView>
    )
};

const styles = StyleSheet.create({
  allwrap: {
    height: '100%',
    backgroundColor: '#fff'
},
    container:{
      paddingTop:'30%',
      // justifyContent:"center",
      alignItems:"center",
      textAlign:'center',
      width:"100%",
      backgroundColor:'#fff'
    },
    navigationButtons2: {
      flexDirection: 'row',
      position: 'absolute',
      top: 30,
      left: 30,
      right: 30,
      justifyContent: 'space-between',
    },
    skipButton: {
      position: 'absolute',
      top: 30,
      right: 10,
    },
    skipText: {
      fontSize: 13,
      color: '#A8201A',
      fontFamily: 'semibold',
    },
    textSoal: {
      paddingLeft:'5%',
      paddingRight:'5%',
      paddingBottom:'10%',
      paddingTop:'10%',
      fontFamily: 'semibold',
      fontSize: 20,
    },
    optionText : {
      fontFamily: 'regular'
    },
    containerjawaban: {
      height: '50%',
      width: '80%',
      backgroundColor: '#fff',
    },
    cardContent:{
      
      textAlign:'left',
      marginTop:20,
      height:'20%',
      width:'100%',
      backgroundColor:'#fff',
      borderRadius:20,
      justifyContent:'center',
      paddingHorizontal:'8%',
      shadowColor:'#000',
      elevation: 2,
      borderWidth: 1,
      borderColor: Colors.white,
      borderWidth: 1
    },
    selectedAnswer : {
      borderColor: Colors.blue,
      backgroundColor: Colors.lightBlue
    },
    navigationButtons: {
      backgroundColor: '#A8201A',
      marginTop: 20,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    navigation:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 65,
      width: '80%',
    },
    navButtonText:{
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'bold',
      fontSize: 16,
    },
    navButton: {
      backgroundColor: '#A8201A',
      marginTop: 20,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    elips:{
      backgroundColor: '#A8201A',
      marginTop: 0,
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrow:{
      fontSize: 16,
      fontFamily: 'bold',
      color: '#fff',
    },
    progressText:{
      fontFamily: 'regular',
      fontSize: 13,
      marginBottom: 5,
      textAlign: 'left',
    },
    submitButton: {
      backgroundColor: '#A8201A', // Warna tombol Submit
      width: 200,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center',
    },
    submitText: {
      color: '#fff', // Warna teks Submit
      fontSize: 16,
      fontFamily: 'bold', // Gaya teks
    },
    submitButtonEnding: {
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center',
      width:'100%',
    },
});

export default Quiz;