import React, { useState, useEffect } from 'react'
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import BackButton from '@/components/BackButton'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebaseConfig';
import { signInWithGoogle, handleGoogleSignIn, signInUser } from "../services/authService";


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

    const [firstFocused, setFirstFocused] = useState(false);
    const [lastFocused, setLastFocused] = useState(false);
    const [unameFocused, setUnameFocused] = useState(false)
    const [phoneFocused, setPhoneFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const [confPassFocused, setConfPassFocused] = useState(false);

    const router = useRouter();

    const [errors, setErrors] = useState({});

    const DEFAULT_PROFILE_PIC = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

    // useEffect(() => {
    //         handleGoogleSignIn();
    //       }, []);
        
    //     const handleGSignIn = async () => {
    //         try {
    //           await signInWithGoogle();
    //         } catch (error) {
    //           Alert.alert("Login Error", error.message);
    //         }
    //     };

    const formatPhoneNumber = (phone) => {
        if (phone.startsWith('0')) {
          return `+62${phone.slice(1)}`;
        }
        return phone; // Jika sudah dalam format internasional (+62), tidak perlu diubah
      };

    // memeriksa apakah username sudah digunakan
    const checkUsernameExists = async (username) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty; // Jika ada hasil, berarti username sudah dipakai
    };

    const validateForm = async () => {
        setErrors({})
        let errors = {}
        if (!namaDepan.trim()) errors.namaDepan = "Nama depan wajib diisi";
        if (!namaBelakang.trim()) errors.namaBelakang = "Nama belakang wajib diisi";

        if (!username.trim()) {
            errors.username = 'Username wajib diisi';
        } 

        if (!phonenum.trim()) {
            errors.phonenum = "Nomor telepon wajib diisi";
        } else if (!/^(?:\+62|0)8[1-9][0-9]{6,10}$/.test(phonenum)) {
            errors.phonenum = "Nomor telepon harus dimulai dari +62 atau 0 dan memiliki panjang 8-12 digit";
        }
        if (!email.trim()) {
            errors.email = "Email wajib diisi";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Format email tidak valid";
        }
        if (!password.trim()) {
            errors.password = "Kata sandi wajib diisi";
        } else if (password.length < 6) {
            errors.password = "Kata sandi minimal 6 karakter";
        }
        if (confPass !== password) {
            errors.confPass = "Konfirmasi kata sandi tidak cocok";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
            

    const registerUser = async (firstName, lastName, username, phone, email, password) => {
        try {
          // 1. Check if username exists
          const usernameDocRef = doc(db, "usernames", username);
          const usernameDocSnapshot = await getDoc(usernameDocRef);
      
          if (usernameDocSnapshot.exists()) {
            // Username already exists, handle the error
            setErrors((prevErrors) => ({
                ...prevErrors,
                username: 'Username sudah digunakan. Buat username baru yang unik.',
            }));
            throw new Error("Username already taken.");
          } else {
            // 2. Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
      
            // 3. Add user data to "users" collection
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              firstName: firstName,
              lastName: lastName,
              username: username,
              phone: formatPhoneNumber(phone),
              email: email,
              profilePic:  DEFAULT_PROFILE_PIC,
              createdAt: new Date().toISOString(),
            });
      
            // 4. Add username to "usernames" collection
            await setDoc(doc(db, "usernames", username), { uid: user.uid });
            // console.log(docRef.id)
            console.log('User registered successfully!', userCredential.user);
          }
        } catch (error) {
          console.error("Error registering user:", error.message);
          throw error;
        }
      }
      

    const handleRegister = async () => {
        const isValid = await validateForm(); // 🔹 Pastikan menunggu validasi selesai
        if (!isValid) return;
        
        try {
          await registerUser(namaDepan, namaBelakang, username, phonenum, email, password);
        //   Alert.alert("Success", "User registered successfully!");
          router.replace('../(tabs)/Home')
        } catch (error) {
        //   Alert.alert("Error", error.message);
            if (error.code === 'auth/email-already-in-use') {
                setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Email sudah terdaftar di akun lain. Gunakan email lain',
                }));
            } else {
                console.error("Error registering user:", error.message);
            }
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
                            {!!errors.namaDepan ? <Text style={styles.errorText}>{errors.namaDepan}</Text> : null}
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
                            {!!errors.namaBelakang ? <Text style={styles.errorText}>{errors.namaBelakang}</Text> : null}
                        </View>
                    </View>
                    <View style={styles.wrapform}>
                        <Text 
                        style={[
                            styles.titleName,
                            unameFocused && {
                                color: Colors.red,
                                fontFamily: 'regular'
                            }
                        ]}>
                            Username
                        </Text>
                        <TextInput
                        placeholder='Isi dengan username Anda'
                        value={username}
                        onFocus={() => setUnameFocused(true)}
                        onBlur={() => setUnameFocused(false)} 
                        onChangeText={setUsername}
                        style={[
                            styles.input,
                            unameFocused && {
                                borderColor: Colors.red,
                            }
                        ]}
                        />
                        {!!errors.username ? <Text style={styles.errorText}>{errors.username}</Text> : null}
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
                        {!!errors.phonenum ? <Text style={styles.errorText}>{errors.phonenum}</Text> : null}
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
                        {!!errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
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
                        {!!errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
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
                        {!!errors.confPass ? <Text style={styles.errorText}>{errors.confPass}</Text> : null}
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
                    <TouchableOpacity style={styles.google}>
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
  },
  errorText: {
    color: Colors.red,
    fontSize: 10,
    fontFamily: 'light'
  }
})

