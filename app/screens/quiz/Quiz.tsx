import React, { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList , ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
// import BackButton from '@/components/BackButton';
import { router, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      question: 'Yang harus dilakukan pertama kali ketika ingin melakukan CPR adalah...',
      options: [
        'A. Posisikan tangan di dada korban',
        'B. Beri napas buatan ke mulut korban',
        'C. Cek denyut nadi korban',
        'D. Langsung tekan di area dada korban'
      ]
    },
    {
      question: 'Langkah pertama sebelum menyentuh korban adalah...',
      options: [
        'A. Memastikan area sekitar aman',
        'B. Langsung memanggil bantuan',
        'C. Mengecek respons korban',
        'D. Memberikan tekanan dada'
      ]
    },
    {
      question: 'Ketika memberikan napas buatan, posisi kepala korban harus...',
      options: [
        'A. Menunduk',
        'B. Tegak lurus',
        'C. Ditekuk ke belakang',
        'D. Dimiringkan'
      ]
    },
    {
      question: 'Berapa rasio tekanan dada dan napas buatan yang benar?',
      options: [
        'A. 15:1',
        'B. 30:2',
        'C. 20:2',
        'D. 10:1'
      ]
    },
    {
      question: 'Jika korban mulai bernapas spontan, langkah selanjutnya adalah...',
      options: [
        'A. Melanjutkan tekanan dada',
        'B. Memiringkan posisi korban',
        'C. Memberikan napas buatan lagi',
        'D. Membawa korban ke rumah sakit'
      ]
    }
  ];

  const totalQuestions = questions.length;

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

    return (
      <ScrollView style={styles.allwrap}>
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
      
      
        <View style={styles.navigationButtons2}>
            <TouchableOpacity onPress={() => router.back()} style={styles.skipButton}>
                <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
            </TouchableOpacity>
        </View>
        
        <Text style={styles.textSoal}>{questions[currentQuestionIndex].question}</Text>
        
        {/* Answer Options */}
        <View style={styles.containerjawaban}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.cardContent}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.navigation}>
          {/* Panah ke kanan (jika index ke-0) */}
          {currentQuestionIndex === 0 ? (
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={handleNext} style={styles.elips}>
                <Text style={styles.arrow}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {/* Panah kiri dan kanan (jika bukan index ke-0) */}
          {currentQuestionIndex > 0 ? (
            <>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={handlePrevious} style={styles.elips}>
                  <Text style={styles.arrow}>{'<'}</Text>
                </TouchableOpacity>
              </View>
              {currentQuestionIndex < totalQuestions - 1 ? (
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <TouchableOpacity onPress={handleNext} style={styles.elips}>
                    <Text style={styles.arrow}>{'>'}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </>
          ) : null}
          {currentQuestionIndex === totalQuestions - 1 ? (
            <View style={styles.submitButtonEnding}>
              <TouchableOpacity onPress={() => router.push("./ScoreScreen")} style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
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
      paddingLeft:'8%',
      shadowColor:'#000',
      elevation: 5,
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