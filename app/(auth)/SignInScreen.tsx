import React, {useState} from 'react'
import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import BackButton from '@/components/BackButton'
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';

export default function SignInScreen() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();
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
                        <Text style={styles.titleName}>Username</Text>
                        <TextInput
                        placeholder='Isi dengan username Anda'
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                        />
                    </View>
                    <View>
                        <Text style={styles.titleName}>Kata Sandi</Text>
                        <TextInput
                        placeholder='Isi dengan kata sandi Anda'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword} 
                        style={styles.input}
                        
                        />
                        <View style={styles.forgotPass}>
                            <TouchableOpacity onPress={() => router.push('./ForgotPass')} >
                                <Text style={styles.forgotPassTxt}>Lupa Kata Sandi?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.submit} onPress={() => router.push('../(tabs)/Home')}>
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
                    <TouchableOpacity style={styles.google} onPress={() => console.log("Masuk dengan Google")}>
                        
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

