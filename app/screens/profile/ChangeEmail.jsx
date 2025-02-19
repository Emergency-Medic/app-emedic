import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, sendPasswordResetEmail, sendEmailVerification, verifyBeforeUpdateEmail } from 'firebase/auth';

export default function ChangeEmail() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false);
  const [reauthenticated, setReauthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();
  // const currentUser = auth.currentUser;

  const reauthenticate = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      setReauthenticated(true);
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/wrong-password') {
        setError("Password salah");
      }
    }
  }

  const handleEmailUpdate = async () => {
    setLoading(true);
    setError('');
  
    if (!email.trim()) {
      setError('Email harus diisi');
      setLoading(false);
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Format email tidak valid');
      setLoading(false);
      return;
    }
  
    try {
      await updateEmail(auth.currentUser, email);
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, { email: email });
  
      // Alert.alert('Berhasil', 'Email Anda berhasil diubah');
      router.back();
    } catch (error) {
      console.error(error);
      setError(error.message); // Tampilkan error ke user
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.allwrap}>
        {reauthenticated ? <View>
          <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Ubah Alamat Email</Text>
        <Text style={styles.par}>
        Ubah alamat email Anda
        </Text>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Alamat Email</Text>
          <TextInput
            placeholder='Isi dengan email baru Anda'
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            />
            {!!error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
        <TouchableOpacity style={styles.submit} onPress={handleEmailUpdate}>
          <Text style={styles.buttonText}>Konfirmasi</Text>
        </TouchableOpacity>
        </View> :
        <View>
          <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Ubah Alamat Email</Text>
        <Text style={styles.par}>
          Untuk keamanan, masukkan password Anda terlebih dahulu 
        </Text>
        <View style={styles.wrapform}>
          <Text style={styles.titleName}>Password</Text>
          <TextInput
          secureTextEntry={!showPassword}
            placeholder='Isi dengan password Anda'
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            />
            {!!error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submit} onPress={reauthenticate}>
          <Text style={styles.buttonText}>Konfirmasi</Text>
        </TouchableOpacity></View>}
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