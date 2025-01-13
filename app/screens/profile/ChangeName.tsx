import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";

export default function ChangeName() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const router = useRouter();
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
        </View>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Nama Belakang</Text>
          <TextInput
            placeholder='Isi dengan nama belakang baru Anda'
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            />
        </ View>
        <TouchableOpacity style={styles.submit} onPress={() => router.back()}>
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