import * as React from 'react';
import { useRouter } from "expo-router";
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const MenuAwal = () => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchOpacityLogo}>
              <View style={styles.containerlogo}>
                    <Image
                        source={require('@/assets/images/LogoFix.png')}
                        style={styles.logo}
                        resizeMode='contain'
                        />
                    <View style={styles.circle}></View>
                </View>
            </TouchableOpacity>
            <Text style={styles.textWelcome}>Selamat Datang!</Text>
            <Text style={styles.doingtext}>Apa yang ingin anda lakukan?</Text>
            {/* Card 1 */}
            <TouchableOpacity onPress={() => router.push("./Onboarding")} style={[styles.card, styles.cardBelajar]}>
                <View style={styles.cardcontent}>
                    <View style={styles.textcard}>
                        <Text style={styles.textcontentatas}>BELAJAR</Text>
                        <Text style={styles.textcontentbawah}>Klik disini untuk belajar mengatasi situasi darurat</Text>
                    </View>
                    <View style={styles.imagecard}>
                        <Image
                            source={require('@/assets/images/GambarBelajar.png')}
                            style={styles.cardImageBelajar}
                            resizeMode='contain'
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {/* Card 2 */}
            <TouchableOpacity onPress={() => router.push("./EmergencyCallScreen")} style={[styles.card, styles.cardEmergency]}>
                <View style={styles.cardcontent}>
                    <View style={styles.textcard}>
                        <Text style={styles.textcontentatas}>DARURAT</Text>
                        <Text style={styles.textcontentbawah}>Klik disini untuk menghubungi 112</Text>
                    </View>
                    <View style={styles.imagecard}>
                        <Image
                            source={require('@/assets/images/GambarAmbulance.png')}
                            style={styles.cardImageAmbulance}
                            resizeMode='contain'
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const CircleInCenter = () => {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
        </View>
        <View style={styles.circle}>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#ffffff',
    },
    containerlogo: {
        zIndex:-2,
        position:'relative',
        justifyContent:'center',
        alignItems:'center',
    },
    logo: {
        position:'absolute',
        width:50,
        height:50,
    },
    circle: {
        zIndex:-1,
        width: 100, // Lebar lingkaran
        height: 100, // Tinggi lingkaran
        borderRadius: 50, // Setengah dari width/height untuk membuat lingkaran
        backgroundColor: '#B71C1C', // Warna merah
    },
    textWelcome: {
        fontFamily:'regular',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#B71C1C',
        marginBottom:30,
    },
    doingtext: {
        fontFamily:'regular',
        marginLeft:-90,
        fontSize:16,
        marginBottom:20,
    },
    card: {
        width: '80%',
        height: '23%',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    touchOpacityLogo: {
        marginBottom: 40,
    },
    cardBelajar: {
        backgroundColor: '#29335C',
    },
    cardEmergency: {
        backgroundColor: '#A8201A',
    },
    cardcontent: {
        width:'100%',
        height:'100%',
        flexDirection: 'row',
    },
    textcontentatas: {
        color: '#FFFFFF',
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'left',
        fontWeight:'bold',
    },
    textcontentbawah: {
        color: '#FFFFFF',
        fontSize: 15,
        marginBottom: 15,
        textAlign: 'left',
    },
    cardImageBelajar: {
        width: 135,
        height: 80,
        marginLeft: 10,
    },
    cardImageAmbulance: {
        width: 120,
        height: 80,
        marginLeft:10,
    },
    textcard: {
        width:'50%',
        height: '100%',
        justifyContent:"center",
        textAlign:"left",
    },
    imagecard: {
        width:'50%',
        height: '100%',
        justifyContent:"center",
        alignItems:"center",
    }
});

export default MenuAwal;