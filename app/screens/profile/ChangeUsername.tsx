import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ChangeUsername() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const router = useRouter();

  const updateUsername = async () => {
    setError('')
      if (!username) {
        setError('Username harus diisi')
        return
      }
      try {
        if (!auth.currentUser) return
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, { username: username })
        router.back()
      } catch (error) {
        console.log('Error updating user', error)
      }
  }
  return (
    <View style={styles.allwrap}>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Ubah Username</Text>
        <Text style={styles.par}>
        Ubah dan pastikan username Anda unik
        </Text>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Username</Text>
          <TextInput
            placeholder='Isi dengan username baru Anda'
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <TouchableOpacity style={styles.submit} onPress={updateUsername}>
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
    errorText: {
      color: Colors.red,
      fontSize: 10,
      fontFamily: 'light'
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