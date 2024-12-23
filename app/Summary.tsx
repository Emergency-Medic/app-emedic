import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type RootStackParamList = {
  Score: undefined;
  AnswerSummary: undefined;
};

type ScoreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Score'>;
type ScoreScreenRouteProp = RouteProp<RootStackParamList, 'Score'>;

type Props = {
  navigation: ScoreScreenNavigationProp;
  route: ScoreScreenRouteProp;
};

const Summary: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.allwrap}>
    <View style={styles.container}>
        <View style={styles.navigationButtons2}>
            <TouchableOpacity onPress={() => router.push("./(auth)/SignInScreen")} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
            </TouchableOpacity>
        </View>
        
        <View style={styles.bluebackground}>
            <View style={styles.flexContainer}>
            <View style={styles.profileIcon}>
                <FontAwesome name="trophy" size={150} color="#FFB636" />
            </View>
            <View style={styles.flexbetween}>
            <Text style={styles.score}>Nilai Anda :</Text>
            
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreValue}>80</Text>
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

      <View style={styles.kotakjawaban}>
            <View style={styles.textkotakjawaban}>
                <Text style={styles.textjawaban}>
                    Yang harus dilakukan pertama kali ketika ingin melakukan CPR adalah...
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    A. Posisikan tangan di dada korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    B. Beri napas buatan ke mulut korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    C. Cek denyut nadi korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    D. Langsung tekan di area dada korban
                </Text>
            </View>
      </View>

      <View style={styles.kotakjawaban}>
      <View style={styles.textkotakjawaban}>
                <Text style={styles.textjawaban}>
                    Yang harus dilakukan pertama kali ketika ingin melakukan CPR adalah...
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    A. Posisikan tangan di dada korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    B. Beri napas buatan ke mulut korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    C. Cek denyut nadi korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    D. Langsung tekan di area dada korban
                </Text>
            </View>
      </View>
      <View style={styles.kotakjawaban}>
      <View style={styles.textkotakjawaban}>
                <Text style={styles.textjawaban}>
                    Yang harus dilakukan pertama kali ketika ingin melakukan CPR adalah...
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    A. Posisikan tangan di dada korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    B. Beri napas buatan ke mulut korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    C. Cek denyut nadi korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    D. Langsung tekan di area dada korban
                </Text>
            </View>
      </View>
      <View style={styles.kotakjawaban}>
      <View style={styles.textkotakjawaban}>
                <Text style={styles.textjawaban}>
                    Yang harus dilakukan pertama kali ketika ingin melakukan CPR adalah...
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    A. Posisikan tangan di dada korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    B. Beri napas buatan ke mulut korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    C. Cek denyut nadi korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    D. Langsung tekan di area dada korban
                </Text>
            </View>
      </View>
      <View style={styles.kotakjawaban}>
      <View style={styles.textkotakjawaban}>
                <Text style={styles.textjawaban}>
                    Yang harus dilakukan pertama kali ketika ingin melakukan CPR adalah...
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    A. Posisikan tangan di dada korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    B. Beri napas buatan ke mulut korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    C. Cek denyut nadi korban
                </Text>
            </View>
            <View style={styles.isikotakjawaban}>
                <Text>
                    D. Langsung tekan di area dada korban
                </Text>
            </View>
      </View>
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
    fontSize: 20,
    marginVertical: 5,
    color: '#fff',
    fontFamily: 'bold'
  },
  scoreValue: {
    fontSize: 70,
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
    padding: 30,
    borderRadius: 25,
    marginTop: 100,
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
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
    marginTop: 40,
    fontSize: 15,
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
    marginTop: 20,
    height: 350,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowRadius: 3.84,
    elevation: 5,
  },
  isikotakjawaban: {
    marginBottom: 20,
    height:'12%',
    width:'80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  textkotakjawaban: {
    paddingBottom: 20,
  },
  textjawaban: {
    padding:20,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'semibold'
  }
});

export default Summary;
