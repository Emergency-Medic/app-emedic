import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function NewPass() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showNewPass, setShowNewPass] = useState(false)  
  const [showConfPass, setShowConfPass] = useState(false)  

  const router = useRouter();
  return (
    <View style={styles.allwrap}>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Buat Kata Sandi Baru</Text>
        <Text style={styles.par}>
          Buat kata sandi baru yang kuat, aman, namun dapat diingat oleh Anda
        </Text>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Kata Sandi Baru</Text>
          <TextInput
            placeholder='Isi dengan password baru'
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry={!showNewPass}
            />
            <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)} style={styles.eyeIcon}>
              <Feather name={showNewPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
            </TouchableOpacity>
        </View>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Konfirmasi Kata Sandi Baru</Text>
          <TextInput
            placeholder='Konfirmasi password baru'
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            secureTextEntry={!showConfPass}
            />
            <TouchableOpacity onPress={() => setShowConfPass(!showConfPass)} style={styles.eyeIcon}>
              <Feather name={showConfPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submit} onPress={() => router.push('./SignInScreen')}>
          <Text style={styles.buttonText}>Konfirmasi</Text>
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

    eyeIcon: {
      position: 'absolute',
      left: 300,
      top: 35
    },

    wrapform: {
      marginBottom: 18,
      marginHorizontal: 25
    },
    titleName: {
      color: Colors.grey,
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
      borderColor: Colors.grey
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