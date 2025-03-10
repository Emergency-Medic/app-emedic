import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Articlepage from '../artikel/Articlepage';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

const ScoreScreen = () => {
  const params = useLocalSearchParams();
    const { id, questions, userAnswers } = params;
    const parsedQuestions = JSON.parse(questions);
    const parsedUserAnswers = JSON.parse(userAnswers);
    const user = auth.currentUser

    const updateUserProgress = async (userId, articleId, score) => {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
  
      if (userDoc.exists()) {
          let completedQuizzes = userDoc.data().completedQuizzes || [];
  
          if (score === 100 && !completedQuizzes.includes(articleId)) {
              completedQuizzes.push(articleId);
              await updateDoc(userRef, { completedQuizzes });
          }
      }
    };

    const calculateScore = () => {
        let score = 0;
        parsedQuestions.forEach((question, index) => {
            if (question.correctAnswer === parsedUserAnswers[index]) {
                score++;
            }
        });
        return (score / parsedQuestions.length) * 100;
    };

    const score = calculateScore();
    const articleId = id; // Gunakan ID artikel dari params

    useEffect(() => {
        if (user && score === 100) {
            updateUserProgress(user.uid, articleId, score);
        }
    }, [user, score]);

  return (
    <View style={styles.container}>
      <View style={styles.navigationButtons2}>
      </View>
      <View style={styles.bluebackground}>
        <Text style={styles.title}>{score < 100 ? 'COBA LAGI' : 'SELAMAT!'}</Text>
        <View style={styles.profileIcon}>
          <FontAwesome name="trophy" size={150} color="#FFB636" />
        </View>
        <Text style={styles.score}>Nilai Anda :</Text>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreValue}>{score}</Text>
          <Text style={styles.scoreTotal}>/ 100</Text>
        </View>
      </View>
      <Image
          source={require('@/assets/images/Maskot.png')}
          style={styles.maskot}
          resizeMode='contain'
      />
      <Text style={styles.seeAnswer}>Yuk lihat jawabannya!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
                pathname: './Summary',
                params: { questions: questions, userAnswers: userAnswers, id: id },
            })
        }
        >
          <Text style={styles.buttonText}>Lihat Jawaban {'>'}</Text>
      </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
      style={styles.DoneButton} 
      onPress={() => router.replace(`../artikel/Articlepage?id=${articleId}`)}
      >
        <Text style={styles.buttonTextWhite}>Selesai</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
    // flex: ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    fontFamily: 'bold',
  },
  score: {
    fontSize: 20,
    marginVertical: 5,
    color: '#fff',
    fontFamily: 'regular'
  },
  scoreValue: {
    fontSize: 70,
    color: '#fff',
    fontFamily: 'semibold',
  },
  buttonContainer: {
    marginVertical: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 10,
  },
  skipText: {
    fontSize: 13,
    color: '#A8201A',
    fontFamily: 'semibold',
  },
  navigationButtons2: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 30,
    right: 30,
    justifyContent: 'space-between',
  },
  bluebackground:{
    backgroundColor: '#29335C',
    padding: 50,
    borderRadius: 25,
    marginTop: 0,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  profileIcon:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  scoreTotal: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'semibold'
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  maskot: {
    position: 'absolute',
    bottom: 290,
    left: 5,
    height: 120,  // Atur tinggi gambar sesuai kebutuhan
    width: 180,   // Atur lebar gambar sesuai kebutuhan
  },
  button: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -15,
  },
  button2: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  seeAnswer:{
    marginTop: 90,
    fontSize: 15,
    fontFamily: 'regular',
  },
  buttonText: {
    color: '#A8201A',
    fontSize: 12,
    fontFamily: 'semibold',
    marginTop: 0,
    padding: 0,
  },
  finishButton: {
    backgroundColor: '#FF6347',
  },
  DoneButton: {
    backgroundColor: '#A8201A', // Warna tombol Sign Up
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 30,
    width: '80%',
  },
  buttonTextWhite: {
    color: '#fff',
    fontFamily: 'semibold'
  },
});

export default ScoreScreen;