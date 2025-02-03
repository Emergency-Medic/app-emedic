import React, { useState } from 'react'
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import BackButton from '@/components/BackButton'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather'

export default function RegisterScreen() {
    const [namaDepan, setNamaDepan] = useState('')
    const [namaBelakang, setNamaBelakang] = useState('')
    const [username, setUsername] = useState('')
    const [phonenum, setPhonenum] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')

    const [showPass, setShowPass] = useState(false)  
    const [showConfPass, setShowConfPass] = useState(false)  

    const router = useRouter();

    return (
        <ScrollView style={styles.allwrap}>
            <StatusBar backgroundColor={Colors.red} translucent={false}/>
            <View style={styles.container}>
                <BackButton color='white'/>
                <Text style={styles.title}>Daftar</Text>
            </View>
            <View style={styles.wrapper}>

                <View>
                    <View style={styles.wrapnama}>
                        <View style={styles.wrapdalam}>
                            <Text style={styles.titleName}>Nama Depan</Text>
                            <TextInput 
                            placeholder='Nama Depan'
                            value={namaDepan}
                            onChangeText={setNamaDepan}
                            style={styles.inputnama}
                            />
                        </View>
                        <View style={styles.wrapdalam}>
                            <Text style={styles.titleName}>Nama Belakang</Text>
                            <TextInput 
                            placeholder='Nama Belakang'
                            value={namaBelakang}
                            onChangeText={setNamaBelakang}
                            style={styles.inputnama}
                            />
                        </View>
                    </View>
                    <View style={styles.wrapform}>
                        <Text style={styles.titleName}>Username</Text>
                        <TextInput
                        placeholder='Isi dengan username Anda'
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        />
                    </View>
                    <View style={styles.wrapform}>
                        <Text style={styles.titleName}>No. Telepon</Text>
                        <TextInput
                        placeholder='Isi dengan nomor telepon Anda'
                        value={phonenum}
                        onChangeText={setPhonenum}
                        style={styles.input}
                        />
                    </View>
                    <View style={styles.wrapform}>
                        <Text style={styles.titleName}>Alamat Email</Text>
                        <TextInput
                        placeholder='Isi dengan email Anda'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        />
                    </View>
                    <View style={styles.wrapform}>
                        <Text style={styles.titleName}>Kata Sandi</Text>
                        <TextInput
                        placeholder='Isi dengan kata sandi Anda'
                        secureTextEntry={!showPass}
                        value={password}
                        onChangeText={setPassword} 
                        style={styles.input}
                        />
                        <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeIcon}>
                            <Feather name={showPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapform}>
                        <Text style={styles.titleName}>Konfirmasi Kata Sandi</Text>
                        <TextInput
                        placeholder='Isi dengan kata sandi Anda'
                        secureTextEntry={!showConfPass}
                        value={confPass}
                        onChangeText={setConfPass} 
                        style={styles.input}
                        />
                        <TouchableOpacity onPress={() => setShowConfPass(!showConfPass)} style={styles.eyeIcon}>
                            <Feather name={showConfPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.submit} onPress={() => router.push('../(tabs)/Home')}>
                        <Text style={styles.buttonText} >Daftar</Text>
                    </TouchableOpacity>
                    <View style={styles.belumwrap}>
                        <Text style={styles.belumAda}>
                            Sudah punya akun? {" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.push("./SignInScreen")}>
                            <Text style={styles.daftarskrg} >Masuk</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style= {styles.atau}>atau</Text>
                    <TouchableOpacity style={styles.google} onPress={() => console.log("Masuk dengan Google")}>
                        
                        <Image source={require('../../assets/images/sign in/google.png')} style={styles.googleImg}></Image>
                        
                        <Text style={styles.googletxt}>Daftar dengan Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  allwrap: {
      height: '100%',
      backgroundColor: '#FFFFFF'
  },
  container: {
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#A8201A',
      width: '100%',
      alignItems: 'center'
  },
  wrapper: {
      margin: 20,
      paddingTop: 20
  },
  wrapform: {
      marginBottom: 18
  },
  title: {
      fontSize: 20,
      fontFamily: 'bold',
      color: '#FFFFFF'
  },
  titleName: {
      color: '#6C6C6C',
      fontSize: 12,
      fontFamily: 'light',
      marginBottom: 5
  },
  wrapnama: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 18,
    alignItems: 'center',
    gap: 25
  },
  wrapdalam: {
    flex: 1,
  },
  inputnama: {
      padding: 9,
      paddingLeft: 15,
    fontSize: 14,
      borderWidth: .3,
      borderRadius: 30,
  },
  input: {
      padding: 9,
      paddingLeft: 15,
      borderWidth: .3,
      borderRadius: 30,
      fontSize: 14,
  },

  eyeIcon: {
    position: 'absolute',
    left: 310,
    top: 34
},

  forgotPass: {
      // width: '100%'
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginTop: 7,
      right: 0
  },
  forgotPassTxt: {
      fontSize: 10,
      fontFamily: 'bold',
      color: '#A8201A'
  },
  submit: {
      backgroundColor: '#A8201A',
      borderRadius: 30,
      padding: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
  },
  buttonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontFamily: 'semibold'
  },
  belumwrap: {
      width: '100%',
      height: '100%',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
      alignSelf: 'center',
      alignContent: 'center'
  },
  belumAda: {
      fontFamily: 'light',
      fontSize: 10,
      color: '#13070C',
      marginTop: 10,
      textAlign: 'center',
  },
  atau: {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: 10,
      fontFamily: 'regular',
      marginTop: 85,
      marginBottom: 10,
      color: '#6C6C6C'
  },
  daftarskrg: {
      color: '#A8201A',
      fontSize: 10,
      fontFamily: 'bold',
      textDecorationLine: 'underline',
      alignItems: 'center',
      justifyContent: 'center',
  },
  google: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
      gap: 10,
      borderWidth: .5,
      borderColor: '#13070C',
      borderRadius: 30,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
  },
  googleImg: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
  },
  googletxt: {
      fontSize: 16,
      color: '#13070C',
      fontFamily: 'regular'
  }
})

