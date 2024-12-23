import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

export default function ForgotPassInput() {
  const [email, setEmail] = useState('')
  const [phonenum, setPhonenum] = useState('')
  const router = useRouter();
  return (
    <View style={styles.allwrap}>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Lupa Kata Sandi</Text>
        <Text style={styles.par}>
        Kami akan mengirimkan kode OTP untuk pemulihan kata sandi melalui email ini
        </Text>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Alamat Email</Text>
          <TextInput
            placeholder='Isi dengan email Anda'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            />
        </View>
        <TouchableOpacity style={styles.submit} onPress={() => router.push('./ForgotPassOTP')}>
          <Text style={styles.buttonText} >Konfirmasi</Text>
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

    wrapform: {
      marginBottom: 18,
      marginHorizontal: 25
    },
    titleName: {
      color: Colors.red,
      fontSize: 12,
      fontFamily: 'bold',
      marginBottom: 5
    },

    input: {
      padding: 9,
      paddingLeft: 15,
      borderWidth: .3,
      borderRadius: 30,
      fontSize: 14,
      borderColor: Colors.red
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
})