import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import OtpTextInput from 'react-native-text-input-otp'
import React, { useState } from "react";

function ForgotPassOTP() {
  const router = useRouter();
  const [otp, setOtp] = useState(''); 
  
  return (
    <View style={styles.allwrap}>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Kode OTP</Text>
        <Text style={styles.par}>
          Silakan masukkan kode OTP yang telah dikirimkan melalui email <Text style={styles.bold}>youremail@gmail.com</Text>
        </Text>
        <View style={styles.otpwrap}>
        <OtpTextInput 
          otp={ otp }
          setOtp={ setOtp }
          digits={4}
          style={styles.otp}
          fontStyle={{ fontSize: 20, fontfamily: 'regular', color: Colors.black }}
          focusedStyle={{ borderColor: Colors.red, borderBottomWidth: 2 }} 
/>
        </View>
        <TouchableOpacity style={styles.submit} onPress={() => router.push('./NewPass')}>
          <Text style={styles.buttonText}>Verifikasi Kode OTP</Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    allwrap: {
      height: '100%',
      backgroundColor: Colors.white,
    },
    title: {
      fontSize: 24,
      fontFamily: 'bold',
      marginTop: 100,
      color: Colors.red,
      marginBottom: 30,
      marginLeft: 25,
    },
    par: {
      fontSize: 14,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 20,
      color: Colors.black,
      lineHeight: 22,
      fontFamily: 'regular'
    },
    otpwrap: {
      marginHorizontal: 44,
    },
    otp: {
      borderWidth: 1,
      borderColor: Colors.grey,
      width: 54,
      height: 56,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center'
      // gap: 20
    },
    submit: {
      marginHorizontal: 25,
      backgroundColor: '#A8201A',
      borderRadius: 30,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'semibold'
    },
    bold: {
      fontFamily: 'bold'
    }
})


export default ForgotPassOTP