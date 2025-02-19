import { View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback } from 'react-native'
import { Colors } from '@/constants/Colors';
import React, { useState } from 'react'
import BackButton from '@/components/BackButton'
import { useRouter } from "expo-router";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; 
import { auth } from '@/firebaseConfig'; 

export default function ForgotPassInput() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    setLoading(true);
    setModalMessage(''); // Clear previous message
    setIsSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setModalMessage('Password reset email sent. Check your inbox to reset your password.');
      setIsSuccess(true);
    } catch (err) {
      console.error("Error sending password reset email:", err);
      setModalMessage('Terjadi kesalahan saat mengirim email. Tolong pastikan email sesuai.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
      setModalVisible(true); // Show the modal
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if(isSuccess) {
        router.replace('./SignInScreen');
    }
  }

  return (
    <View style={styles.allwrap}>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Lupa Kata Sandi</Text>
        <Text style={styles.par}>
        Masukkan email untuk mengubah password Anda 
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
        {!!sent ? 
        <Text style={styles.sent}>
          Email untuk reset password sudah dikirim. Silakan cek inbox Anda
        </Text> : null
        }
        <TouchableOpacity style={styles.submit} onPress={handleResetPassword}>
          <Text style={styles.buttonText} >Konfirmasi</Text>
        </TouchableOpacity>

        <Modal
        animationType="fade" 
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} 
      >
        <TouchableWithoutFeedback onPressOut={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalCardContent}>
            <Text style={styles.modalWarningQuestion}>{modalMessage}</Text>
          <View style={styles.answerContent}>
            <TouchableOpacity style={styles.meButton} onPress={closeModal}>
              <Text style={styles.meText} >
                OK
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
    allwrap: {
      height: '100%',
      backgroundColor: Colors.white,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.transparencyGrey,
    },
    modalCardContent: {
      width: '85%',
      paddingHorizontal: 37,
      paddingVertical: 12,
      backgroundColor: Colors.white,
      borderRadius: 20,
      textAlign: 'center',
      alignItems: 'center',
    },
    modalWarningQuestion: {
      fontFamily: 'semibold',
      fontSize: 14,
      color: Colors.blue,
      paddingHorizontal: 30,
      textAlign: 'center',
      marginTop: 12,
      marginBottom: 22
    },
    answerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
      paddingHorizontal: 34,
      marginBottom: 4
    },
    meButton: {
      paddingHorizontal: 34,
      paddingVertical: 7,
      backgroundColor: Colors.red,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10,
      shadowColor: Colors.black,
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    meText: {
      color: Colors.white,
      fontFamily: 'semibold',
      fontSize: 14,
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