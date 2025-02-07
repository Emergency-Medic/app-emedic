import React, {useState, useEffect} from 'react'
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import BackButton from '@/components/BackButton'
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import Feather from '@expo/vector-icons/Feather';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { signInWithGoogle, handleGoogleSignIn, signInUser } from "../services/authService";

export default function SignInScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)  
    const [emailFocused, setEmailFocused] = useState(false);
    const [passFocused, setPassFocused] = useState(false);
    const router = useRouter();

    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     handleGoogleSignIn();
    //   }, []);
    
    // const handleGSignIn = async () => {
    //     try {
    //       await signInWithGoogle();
    //     } catch (error) {
    //       Alert.alert("Login Error", error.message);
    //     }
    // };

    const validateForm = () => {
        let errors = {};

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

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const signInUser = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log("Signed in successfully:", user);
      
        } catch (error) {
          // Tangani error
          console.error("Sign In Error:", error);
          throw error;
        }
      };

      const handleSignIn = async () => {
        if (!validateForm()) {
            return; // Jika validasi gagal, hentikan eksekusi
        }
        try {
            await signInUser(email, password)
            // Alert.alert("Success", "User signed in successfully!");
            router.replace('../(tabs)/Home')
        } catch (error) {
            // Alert.alert("Error", error.message);
            if (error.code === 'auth/invalid-credential') {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  password: 'Email atau password salah. Silakan coba lagi',
                }));
              } else {
                console.error("Error registering user:", error.message);
              }
        }
      }

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
                <Text style={styles.title}>Masuk</Text>
            </View>
            <View style={styles.wrapper}>

                <View>
                    <View style={styles.username}>
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
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)} 
                        value={email}
                        onChangeText={setEmail}
                        style={[
                            styles.input,
                            emailFocused && {
                            borderColor: Colors.red,
                            }
                        ]}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>
                    <View>
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
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                        <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeIcon}>
                            <Feather name={showPass ? 'eye-off' : 'eye'} size={20} color={Colors.transparencyGrey} />
                        </TouchableOpacity>
                        <View style={styles.forgotPass}>
                            <TouchableOpacity onPress={() => router.push('./ForgotPass')} >
                                <Text style={styles.forgotPassTxt}>Lupa Kata Sandi?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.submit} onPress={handleSignIn}>
                        <Text style={styles.buttonText} >Masuk</Text>
                    </TouchableOpacity>
                    <View style={styles.belumwrap}>
                        <Text style={styles.belumAda}>
                            Belum punya akun? {" "}
                        </Text>
                        <TouchableOpacity onPress={() => router.push('./RegisterScreen')}>
                            <Text style={styles.daftarskrg} >Daftar sekarang</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style= {styles.atau}>atau</Text>
                    <TouchableOpacity style={styles.google}>
                        
                        <Image source={require('../../assets/images/sign in/google.png')} style={styles.googleImg}></Image>
                        
                        <Text style={styles.googletxt}>Masuk dengan Google</Text>
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
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.red,
        width: '100%',
        alignItems: 'center'
    },
    wrapper: {
        margin: 20,
        paddingTop: 20
    },
    username: {
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
    input: {
        borderWidth: .3,
        borderRadius: 30,
        padding: 9,
        paddingLeft: 15,
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

