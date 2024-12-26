import React, { useRef } from 'react';
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OnboardingScreen = () => {
  const swiperRef = useRef(null);
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style='light' translucent={true} backgroundColor='transparent'/>
        <Swiper
        autoplay
        autoplayTimeout={7}
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        paginationStyle={styles.paginationStyle}
        >
        {/* Slide 1 */}
        <View style={styles.slide}>
            <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.backgroundImage}
            blurRadius={2}
            >
            </ImageBackground>

            <View style={styles.navigationButtons2}>
            <TouchableOpacity onPress={() => router.push("./(auth)/SignInScreen")} style={styles.skipButton}>
                <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.contentAboveContainer}>
            <Text style={styles.welcoming}>E-Medic</Text>
            </View>

            <View style={styles.contentMidContainer}>
            <Image
                source={require('@/assets/images/Maskot.png')}
                style={styles.maskot}
                resizeMode='contain'
            />
            </View>

            <View style={styles.contentBottomContainer}>
            <Text style={styles.title}>Informasi Aplikasi</Text>
            <Text style={styles.description}>
                Emedic membantu Anda dalam pertolongan pertama dan menjaga kesehatan Anda.
            </Text>
            </View>

            <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.prevButtonOne} onPress={() => swiperRef.current.scrollBy(-1)}>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={styles.buttonText}>{'>'}</Text>
            </TouchableOpacity>
            </View>
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
            <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1649260257600-8908e14752c2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.backgroundImage}
            blurRadius={1}
            >
            </ImageBackground>

            <View style={styles.navigationButtons2}>
            <TouchableOpacity onPress={() => router.push("./(auth)/SignInScreen")} style={styles.skipButton}>
                <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.contentBottomContainer}>
            <Text style={styles.title}>Pertolongan Pertama</Text>
            <Text style={styles.description}>
                Pelajari cara mencegah dan mengatasi situasi darurat yang Anda alami.
            </Text>
            </View>

            <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={styles.buttonText}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={styles.buttonText}>{'>'}</Text>
            </TouchableOpacity>
            </View>
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
            <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.backgroundImage}
            blurRadius={1}
            >
            </ImageBackground>

            <View style={styles.navigationButtons2}>
            <TouchableOpacity onPress={() => router.push("./(auth)/SignInScreen")}  style={styles.skipButton}>
                <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.contentBottomContainer}>
            <Text style={styles.title}>Asisten Darurat Anda</Text>
            <Text style={styles.description}>
                Hubungi nomor darurat 112 dan teman-teman Anda melalui aplikasi ini.
            </Text>
            </View>

            <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={styles.buttonText}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton} onPress={() => swiperRef.current.scrollBy(1)}>
                <Text style={styles.buttonText}>{'>'}</Text>
            </TouchableOpacity>
            </View>
        </View>

        {/* Slide 4 */}
        
        <View style={styles.slide}>
            <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1629196061269-8efb71330152?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.backgroundImage}
            blurRadius={1}
            >
            </ImageBackground>

            <View style={styles.navigationButtons2}>
            <TouchableOpacity onPress={() => router.push("./(auth)/SignInScreen")}  style={styles.skipButton}>
                <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.contentBottomContainer}>
            <Text style={styles.title}>E-Medic</Text>
            <Text style={styles.description}>
                "Your Emergency Medic, Your Solution"
            </Text>

            {/* Tambahkan Tombol Sign Up dan Log In */}
            <TouchableOpacity onPress={() => router.push("./(auth)/RegisterScreen")}  style={styles.signUpButton}>
                <Text style={styles.buttonTextWhite}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("./(auth)/SignInScreen")}  style={styles.logInButton}>
                <Text style={styles.buttonTextWhite}>Log In</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.navigationButtons}>
            <TouchableOpacity style={styles.prevButton} onPress={() => swiperRef.current.scrollBy(-1)}>
                <Text style={styles.buttonText}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButtonEnd} onPress={() => swiperRef.current.scrollBy(1)}>
            </TouchableOpacity>
            </View>
        </View>
        </Swiper>
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#000000'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5, // Apply opacity to background only
    width: '100%',
  },
  contentBottomContainer: {
    position: 'absolute',
    bottom: 150,
    left: 30,
    right: 30,
    padding: 10,
  },
  contentMidContainer: {
    height:170,
    width:150,
    position: 'absolute',
    justifyContent: 'center', // Menempatkan komponen secara vertikal di tengah
    alignItems: 'center',
  },
  maskot: {
    height: 170,  // Atur tinggi gambar sesuai kebutuhan
    width: 150,   // Atur lebar gambar sesuai kebutuhan
  },
  contentAboveContainer: {
    position: 'absolute',
    top: 130,
    left: 30,
    right: 30,
    padding: 10,
  },
  welcoming: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontFamily: 'extrabold'
  },
  title: {
    textAlign:'center',
    fontSize: 25,
    fontFamily: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'bold'
  },
  description: {
    textAlign:'center',
    fontSize: 14,
    fontFamily: 'regular',
    color: '#fff',
    lineHeight: 20,
    fontFamily: 'regular'
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 10,
  },
  skipText: {
    fontSize: 13,
    fontFamily: 'light',
    color: '#fff',
    fontFamily: 'semibold'
  },
  dotStyle: {
    backgroundColor: '#fff',
  },
  activeDotStyle: {
    backgroundColor: '#A8201A',
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
    justifyContent: 'space-between',
  },
  navigationButtons2: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 30,
    right: 30,
    justifyContent: 'space-between',
  },
  prevButtonOne: {

  },
  prevButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    width:40,
  },
  nextButtonEnd: {

  },
  nextButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    width:40,
  },
  nextButton2: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    left: 420,
  },
  buttonText: {
    textAlign:'center',
    color: '#A8201A',
    fontSize: 16,
    fontWeight: '900',
    fontFamily: 'extrabold'
  },
  signUpButton: {
    backgroundColor: '#A8201A', // Warna tombol Sign Up
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  logInButton: {
    backgroundColor: '#A8201A', // Warna tombol Log In
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
  },
  buttonTextWhite: {
    color: '#fff',
  },
});

export default OnboardingScreen;