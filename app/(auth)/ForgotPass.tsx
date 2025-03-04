import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

export default function ForgotPass() {
  const router = useRouter();
  return (
    <View style={styles.allwrap}>
        <BackButton color={Colors.red} top={45}/>
        <Text style={styles.title}>Lupa Kata Sandi</Text>
        <Text style={styles.par}>
          Pilih salah satu opsi di bawah untuk mengirimkan kode 
        OTP untuk reset kata sandi
        </Text>
        <View style={styles.resetwrap}>
          <TouchableOpacity style={styles.reset}>
            <View style={styles.iconwrap}>
              <MaterialIcons name="email" size={24} color={Colors.red} />
            </View>
            <View style={styles.textwrap}>
              <Text style={styles.btntitle}>Reset via Email</Text>
              <Text style={styles.btnsub}>Kode OTP akan dikirimkan ke email Anda</Text>
            </View>
            <AntDesign name="checkcircle" size={24} color={Colors.red} style={styles.check}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reset}>
            <View style={styles.iconwrap}>
              <MaterialIcons name="sms" size={24} color={Colors.red} />
            </View>
            <View style={styles.textwrap}>
              <Text style={styles.btntitle}>Reset via SMS</Text>
              <Text style={styles.btnsub}>Kode OTP akan dikirimkan ke SMS Anda</Text>
            </View>
            <AntDesign name="checkcircle" size={24} color={Colors.white} style={styles.check}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.submit} onPress={() => router.push('./ForgotPassInput')}>
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
    resetwrap: {
      marginLeft: 25,
      marginRight: 25,
      gap: 18
    },
    reset: {
      borderColor: Colors.red,
      borderWidth: .5,
      borderRadius: 30,
      paddingVertical: 12,
      paddingHorizontal: 22,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      width: '100%',
      gap: 15
    },
    iconwrap: {
      borderRadius: 100,
      shadowColor: Colors.black,
      shadowOffset: {width: -0.5, height: 0.55},
      shadowOpacity: 0.25,
      shadowRadius: 1,
      width: 38,
      height: 38,
      elevation: 1.4,
      backgroundColor: Colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      padding: 7,
      // flex: 1
    },
    textwrap: {
      // marginLeft: 15
      gap: 1,
      flex: 6
    },
    btntitle: {
      fontFamily: 'bold',
      fontSize: 14,
      color: Colors.red,
      
    },
    btnsub: {
      fontFamily: 'light',
      fontSize: 10
    },
    check: {
      flex: 1
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