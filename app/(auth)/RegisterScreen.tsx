import React, { useState, useEffect } from 'react'
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import BackButton from '@/components/BackButton'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


export default function RegisterScreen() {
    const [namaDepan, setNamaDepan] = useState('')
    const [namaBelakang, setNamaBelakang] = useState('')
    const [phonenum, setPhonenum] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')

    const [showPass, setShowPass] = useState(false)  
    const [showConfPass, setShowConfPass] = useState(false)  

    const [firstFocused, setFirstFocused] = useState(false);
    const [lastFocused, setLastFocused] = useState(false);
    const [phoneFocused, setPhoneFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [confPassFocused, setConfPassFocused] = useState(false);

    const router = useRouter();

    const schema = yup.object().shape({
        namaDepan: yup.string().required("Nama depan wajib diisi"),
        namaBelakang: yup.string().required("Nama belakang wajib diisi"),
        phonenum: yup.string().matches(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka").required("Nomor telepon wajib diisi"),
        email: yup.string().email("Format email tidak valid").required("Email wajib diisi"),
        password: yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
        confPass: yup.string().oneOf([yup.ref('password')], "Konfirmasi password tidak cocok").required("Konfirmasi password wajib diisi"),
      });

      const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      });
            

    const registerUser = async (firstName: string, lastName: string, phone: string, email: string, password: string) => {
        try {
          // Buat user di Firebase Authentication
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
      
          // Simpan data tambahan user ke Firestore
        //   await setDoc(doc(db, "users", user.uid), {
        //     firstName: firstName,
        //     lastName: lastName,
        //     phone: phone,
        //     email: email,
        //     createdAt: new Date().toISOString(),
        //   });

          const docRef = await addDoc(collection(db, "users"), {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            createdAt: new Date().toISOString(),
          });
          
          console.log('User registered successfully!',  userCredential.user);
        } catch (error) {
          console.error("Error registering user:", (error as Error).message);
          throw error;
        }
      };

    const handleRegister = async () => {
        try {
          await registerUser(namaDepan, namaBelakang, phonenum, email, password);
          Alert.alert("Success", "User registered successfully!");
          router.replace('../(tabs)/Home')
        } catch (error) {
          Alert.alert("Error", (error as Error).message);
        }
      };

      useEffect(() => {
        if (auth.currentUser) {
            router.replace("../(tabs)/Home"); // Arahkan ke halaman Home jika sudah login
        }
      }, [router]);

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
                        <Controller control={control} 
                        />
                        <View style={styles.wrapdalam}>
                            <Text style={[
                                styles.titleName, 
                                firstFocused && {
                                    color: Colors.red,
                                    fontFamily: 'regular'
                                }
                            ]}>
                                Nama Depan
                            </Text>
                            <TextInput 
                            placeholder='Nama Depan'
                            value={namaDepan}
                            onChangeText={setNamaDepan}
                            onFocus={() => setFirstFocused(true)}
                            onBlur={() => setFirstFocused(false)} 
                            style={[
                                styles.inputnama,
                                firstFocused && {
                                    borderColor: Colors.red,
                                }
                            ]}
                            />
                        </View>
                        <View style={styles.wrapdalam}>
                            <Text style={[
                                styles.titleName,
                                lastFocused && {
                                    color: Colors.red,
                                    fontFamily: 'regular'
                                }
                            ]}>
                                Nama Belakang
                            </Text>
                            <TextInput 
                            placeholder='Nama Belakang'
                            value={namaBelakang}
                            onFocus={() => setLastFocused(true)}
                            onBlur={() => setLastFocused(false)} 
                            onChangeText={setNamaBelakang}
                            style={[
                                styles.inputnama,
                                lastFocused && {
                                    borderColor: Colors.red,
                                }
                            ]}
                            />
                        </View>
                    </View>
                    <View style={styles.wrapform}>
                        <Text 
                        style={[
                            styles.titleName,
                            phoneFocused && {
                                color: Colors.red,
                                fontFamily: 'regular'
                            }
                        ]}>
                            No. Telepon
                        </Text>
                        <TextInput
                        placeholder='Isi dengan nomor telepon Anda'
                        value={phonenum}
                        onFocus={() => setPhoneFocused(true)}
                        onBlur={() => setPhoneFocused(false)} 
                        onChangeText={setPhonenum}
                        style={[
                            styles.input,
                            phoneFocused && {
                                borderColor: Colors.red,
                            }
                        ]}
                        />
                    </View>
                    <View style={styles.wrapform}>
                        <Text style={[
                            styles.titleName,
                            emailFocused && {
                                color: Colors.red,
                                fontFamily: 'regular'
                            }
                        ]}>
                            Email
                        </Text>
                        <TextInput
                        placeholder='Isi dengan email Anda'
                        value={email}
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)} 
                        onChangeText={setEmail}
                        style={[
                            styles.input,
                            emailFocused && {
                                borderColor: Colors.red,
                            }
                        ]}
                        />
                    </View>
                    <View style={styles.wrapform}>
                        <Text style={[
                            styles.titleName,
                            passFocused && {
                                color: Colors.red,
                                fontFamily: 'regular'
                            }
                        ]}>
                            Kata Sandi
                        </Text>
                        <TextInput
                        placeholder='Isi dengan kata sandi Anda'
                        secureTextEntry={!showPass}
                        value={password}
                        onChangeText={setPassword} 
                        style={[
                            styles.input,
                            passFocused && {
                                borderColor: Colors.red,
                            }
                        ]}
                        onFocus={() => setPassFocused(true)}
                        onBlur={() => setPassFocused(false)} 
                        />
                        <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeIcon}>
                            <Feather name={showPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.wrapform}>
                        <Text style={[
                            styles.titleName,
                            confPassFocused && {
                                color: Colors.red,
                                fontFamily: 'regular'
                            }
                        ]}>
                            Konfirmasi Kata Sandi
                        </Text>
                        <TextInput
                        placeholder='Isi dengan kata sandi Anda'
                        secureTextEntry={!showConfPass}
                        value={confPass}
                        onFocus={() => setConfPassFocused(true)}
                        onBlur={() => setConfPassFocused(false)} 
                        onChangeText={setConfPass} 
                        style={[
                            styles.input,
                            confPassFocused && {
                                borderColor: Colors.red,
                            }
                        ]}
                        />
                        <TouchableOpacity onPress={() => setShowConfPass(!showConfPass)} style={styles.eyeIcon}>
                            <Feather name={showConfPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.submit} onPress={handleRegister}>
                        <Text style={styles.buttonText} >Daftar</Text>
                    </TouchableOpacity>
                    <View style={styles.belumwrap}>
                        <Text style={styles.belumAda}>
                            Sudah punya akun? {" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('./SignInScreen')}>
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
      borderColor: Colors.grey
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

