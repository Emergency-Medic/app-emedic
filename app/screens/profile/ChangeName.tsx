import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { Colors } from '@/constants/Colors';
import { useUser } from "../../context/UserContext";
import React, { useState, useEffect } from 'react'
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function ChangeName() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errorFirst, setErrorFirst] = useState('')
  const [errorLast, setErrorLast] = useState('')
  const router = useRouter();

  const updateName = async () => {
    setErrorFirst('')
    setErrorLast('')
    if (!firstName) {
      setErrorFirst("Nama depan tidak boleh kosong")
      return
    }
    if (!lastName) {
      setErrorLast("Nama belakang tidak boleh kosong")
      return
    }
    try {
      if (!auth.currentUser) return
      const userDocRef = doc(db, "users", auth.currentUser.uid)
      await updateDoc(userDocRef, { firstName: firstName, lastName: lastName })
      router.back()
    }  catch (error) {
      console.error("Error updating document: ", error);
    }
  }

  return (
    <View style={styles.allwrap}>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Ubah Nama Lengkap</Text>
        <Text style={styles.par}>
        Ubah nama depan dan nama belakang Anda
        </Text>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Nama Depan</Text>
          <TextInput
            placeholder='Isi dengan nama depan baru Anda'
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            />
            {errorFirst ? <Text style={styles.errorText}>{errorFirst}</Text> : null}
        </View>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Nama Belakang</Text>
          <TextInput
            placeholder='Isi dengan nama belakang baru Anda'
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            />
            {errorLast ? <Text style={styles.errorText}>{errorLast}</Text> : null}
        </ View>
        <TouchableOpacity style={styles.submit} onPress={updateName}>
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