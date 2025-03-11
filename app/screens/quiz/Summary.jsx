import React, {useEffect, useState}from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import BackButton from '@/components/BackButton'
import { db, auth } from '@/firebaseConfig';
import { Colors } from '@/constants/Colors';
import { collection, getDoc, doc, setDoc } from 'firebase/firestore';

const Summary = () => {
    const params = useLocalSearchParams();
    const { questions, quizStarted  } = params;
    const parsedQuestions = JSON.parse(questions);
    const [userAnswers, setUserAnswers] = useState([]);
    const userId = auth.currentUser ? auth.currentUser.uid : 'guest';
    const articleId = params.id; 
    const [score, setScore] = useState(0);

    useEffect(() => {
      console.log(params.id)
        const fetchUserAnswers = async () => {
            try {
                const quizDocRef = doc(db, 'userAnswers', userId, 'articleAnswers', articleId);
                const quizDoc = await getDoc(quizDocRef);
                if (quizDoc.exists()) {
                  const data = quizDoc.data();
                  console.log(data.answers)
                    setUserAnswers(data.answers);
                    calculateScore(data.answers);
                }
            } catch (error) {
                console.error('Error fetching user answers:', error);
            }
        };
        fetchUserAnswers();
    }, [userId, articleId]);

    const calculateScore = (answers) => {
        let correctAnswers = 0;
        parsedQuestions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                correctAnswers++;
            }
        });
        const calculatedScore = (correctAnswers / parsedQuestions.length) * 100;
        setScore(calculatedScore);
    };
  return (
    <ScrollView style={styles.allwrap}>
      <BackButton top={45} color={Colors.red}/>
    <View style={styles.container}>
        <View style={styles.bluebackground}>
            <View style={styles.flexContainer}>
            <View style={styles.profileIcon}>
                <FontAwesome name="trophy" size={100} color="#FFB636" />
            </View>
            <View style={styles.flexbetween}>
            <Text style={styles.score}>{score < 100 ? '' : 'Selamat! ' }Nilai Anda :</Text>
            
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreValue}>{score}</Text>
                <Text style={styles.scoreTotal}>/ 100</Text>
            </View>
            </View>
        </View>
      </View>
      <Image
          source={require('@/assets/images/Maskot.png')}
          style={styles.maskot}
          resizeMode='contain'
      />
      <Text style={styles.seeAnswer}>Yuk lihat jawabannya!</Text>
      {parsedQuestions.map((question, index) => (
                    <View key={index} style={styles.kotakjawaban}>
                        <View style={styles.textkotakjawaban}>
                            <Text style={styles.textjawaban}>{question.text}</Text>
                        </View>
                        {question.options.map((option, optionIndex) => (
                            <View
                                key={optionIndex}
                                style={[
                                    styles.isikotakjawaban,
                                    userAnswers[index] === optionIndex && question.correctAnswer === optionIndex
                                        ? styles.isikotakjawabanbenar
                                        : userAnswers[index] === optionIndex
                                        ? styles.isikotakjawabansalah
                                        : question.correctAnswer === optionIndex
                                        ? styles.isikotakjawabanbenar
                                        : styles.isikotakjawaban,
                                ]}
                            >
                                <Text style={styles.isitextjawaban}>{option}</Text>
                            </View>
                        ))}
                    </View>
                ))}

    <TouchableOpacity style={styles.DoneButton} onPress={() => router.replace(`../artikel/Articlepage?id=${articleId}`)}>
              <Text style={styles.buttonTextWhite}>Selesai</Text>
    </TouchableOpacity>
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    allwrap: {
      height: '100%',
      backgroundColor: '#fff'
  },
  container: {
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: '100%',
      alignItems: 'center'
  },
  score: {
    fontSize: 15,
    marginVertical: 5,
    color: '#fff',
    fontFamily: 'bold'
  },
  scoreValue: {
    fontSize: 50,
    color: '#fff',
    fontFamily: 'semibold',
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
   borderRadius: 25,
    marginTop: 90,
    justifyContent: 'center',
    padding:20,
  },
  profileIcon:{
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  scoreTotal: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'semibold',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  maskot: {
    position: 'absolute',
    top:240,
    left: 400,
    height: 90,  // Atur tinggi gambar sesuai kebutuhan
    width: 150,   // Atur lebar gambar sesuai kebutuhan
  },
  seeAnswer:{
    marginTop: 20,
    fontSize: 12,
    fontFamily: 'regular',
    marginBottom: 0,
    padding: 0,
  },
  flexContainer:{
    flexDirection: 'row',
  },
  flexbetween:{
    marginLeft:30,
  },
  kotakjawaban:{
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 30,
    height: 350,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowRadius: 3.84,
    elevation: 5,
  },
  isikotakjawaban: {
    marginBottom: 20,
    height:'12%',
    width:'90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  isikotakjawabanbenar: {
    marginBottom: 20,
    height:'12%',
    width:'90%',
    backgroundColor: '#EEFAE6',
    borderColor:'#019F01',
    borderWidth:2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  isikotakjawabansalah: {
    marginBottom: 20,
    height:'12%',
    width:'90%',
    backgroundColor: '#FFE7E7',
    borderColor:'#A8201A',
    borderWidth:2,
    borderRadius: 10,
    shadowColor: '#000',
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  textkotakjawaban: {
    paddingBottom: 20,
    padding:15,
    textAlign:'justify',
    justifyContent:"space-between",
    alignItems:'flex-start'
  },
  textjawaban: {
    padding:5,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'semibold',
  },
  isitextjawaban: {
    fontSize: 12,
    fontFamily:'reguler',
  },
  DoneButton: {
    backgroundColor: '#A8201A', // Warna tombol Sign Up
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
    marginTop: 50,
    width: '90%',
  },
  buttonTextWhite: {
    color: '#fff',
    fontFamily: 'semibold'
  },
});

export default Summary;