import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';

export default function ChangePass() {
  const [oldPass, setOldPass] = useState('')
  const [newPass, setnewPass] = useState('')
  const [confNewPass, setConfNewPass] = useState('')

  const [errorPass, setErrorPass] = useState('')
  const [errorPassNew, setErrorPassNew] = useState('')
  const [errorPassNewConf, setErrorPassNewConf] = useState('')

  const [showOldPass, setShowOldPass] = useState(false)  
  const [showNewPass, setShowNewPass] = useState(false)  
  const [showConfPass, setShowConfPass] = useState(false)  
  const [reauthenticated, setReauthenticated] = useState(false)

  const router = useRouter();

  const reauthenticate = async () => {
    setErrorPass('')
    if (!oldPass) {
      setErrorPass("Kata sandi wajib diisi")
      return
    } else if (oldPass.length < 6) {
      setErrorPass("Kata sandi minimal 6 karakter");
      return
    }
      try {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          oldPass
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
        setReauthenticated(true);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    }

  const handlePassUpdate = async () => {
    setErrorPassNew('')
    setErrorPassNewConf('')

    if (!newPass) {
      setErrorPassNew("Kata sandi baru wajib diisi")
      return
    } else if (newPass.length < 6) {
      setErrorPassNew("Kata sandi minimal 6 karakter");
      return
    }
    if (confNewPass !== newPass) {
      setErrorPassNewConf("Konfirmasi kata sandi tidak cocok")
      return
    } 

    try {
      await updatePassword(auth.currentUser, newPass)
      Alert.alert('Berhasil', 'Password Anda berhasil diubah');
      router.back();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.allwrap}>
      {!reauthenticated ? 
      <View>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Ubah Kata Sandi</Text>
        <Text style={styles.par}>
        Untuk keamanan, masukkan kata sandi lama Anda dahulu
        </Text>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Kata Sandi Lama</Text>
          <TextInput
            secureTextEntry={!showOldPass}
            placeholder='Isi dengan kata sandi lama Anda'
            value={oldPass}
            onChangeText={setOldPass}
            style={styles.input}
            />
            {errorPass ? <Text style={styles.errorText}>{errorPass}</Text> : null}
            <TouchableOpacity onPress={() => setShowOldPass(!showOldPass)} style={styles.eyeIcon}>
              <Feather name={showOldPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submit} onPress={reauthenticate}>
                  <Text style={styles.buttonText}>Konfirmasi</Text>
        </TouchableOpacity>
      </View> : 
      <View>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Ubah Kata Sandi</Text>
        <Text style={styles.par}>
        Ubah kata sandi yang kuat, aman, namun dapat diingat oleh Anda
        </Text>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Kata Sandi Baru</Text>
          <TextInput
            secureTextEntry={!showNewPass}
            placeholder='Isi dengan kata sandi baru Anda'
            value={newPass}
            onChangeText={setnewPass}
            style={styles.input}
            />
            {errorPassNew ? <Text style={styles.errorText}>{errorPassNew}</Text> : null}
            <TouchableOpacity onPress={() => setShowNewPass(!showNewPass)} style={styles.eyeIcon}>
              <Feather name={showNewPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
            </TouchableOpacity>
        </ View>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Konfirmasi Kata Sandi Baru</Text>
          <TextInput
            secureTextEntry={!showConfPass}
            placeholder='Konfirmasi kata sandi baru Anda'
            value={confNewPass}
            onChangeText={setConfNewPass}
            style={styles.input}
            />
            {errorPassNewConf ? <Text style={styles.errorText}>{errorPassNewConf}</Text> : null}
            <TouchableOpacity onPress={() => setShowConfPass(!showConfPass)} style={styles.eyeIcon}>
              <Feather name={showConfPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submit} onPress={handlePassUpdate}>
          <Text style={styles.buttonText}>Konfirmasi</Text>
        </TouchableOpacity>
      </View>
      }
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

    eyeIcon: {
      position: 'absolute',
      left: 300,
      top: 35
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