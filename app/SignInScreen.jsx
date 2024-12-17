import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native'

export default function SignInScreen() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Masuk</Text>
            </View>
            <View>
                <View>
                    <Text>Username</Text>
                    <TextInput
                    placeholder='Isi dengan username Anda'
                    value={username}
                    onChangeText={setUsername}
                    style={styles.input}
                    />
                </View>
                <View>
                    <Text>Kata Sandi</Text>
                    <TextInput
                    placeholder='Isi dengan kata sandi Anda'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword} 
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={() => console.log("Lupa kata sandi")} style={styles.forgotPass}>
                        <Text style={styles.forgotPassTxt}>Lupa Kata Sandi?</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.submit}>
                    <Text style={styles.buttonText}>Masuk</Text>
                </TouchableOpacity>
                <Text>
                    Belum punya akun? {" "}
                    <Text>Daftar sekarang</Text>
                </Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})