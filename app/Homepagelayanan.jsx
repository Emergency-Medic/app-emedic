import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, PanResponder, Alert } from 'react-native';
import call from 'react-native-phone-call'; 

const Homepagelayanan = () => {
    const [sliderValue, setSliderValue] = useState(new Animated.Value(0));

    const makePhoneCall = () => {
        const args = {
          number: '112',
          prompt: false,
          skipCanOpen: true
        }
    
        call(args).catch(console.error);
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
            [null, { dx: sliderValue }],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx > 150) {
                
                Alert.alert('Panggilan Darurat', 'Memulai panggilan darurat...');
                makePhoneCall();
                Animated.spring(sliderValue, { toValue: 0, useNativeDriver: false }).start();
            } else {
                Animated.spring(sliderValue, { toValue: 0, useNativeDriver: false }).start();
            }
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.kotakjawaban}>
                <View style={styles.containerkotak}>
                    <View style={styles.textkotaklayanan}>
                        <Text style={styles.textpanggilandarurat}>Panggilan Darurat</Text>
                    </View>
                    <View styles={styles.gambarkotaklayanan}>
                        <Image
                            source={require('@/assets/images/GambarAmbulance.png')}
                            style={styles.cardImageAmbulance}
                            resizeMode='contain'
                        />
                    </View>
                </View>

                {/* Slider */}
                <View style={styles.sliderContainer}>
                    <Animated.View
                        style={[
                            styles.sliderButton,
                            {
                                transform: [{ translateX: sliderValue }],
                            },
                        ]}
                        {...panResponder.panHandlers}
                    >
                        <Text style={styles.sliderArrow}>{'>'}</Text>
                    </Animated.View>
                    <Text style={styles.sliderText}>Geser untuk melakukan panggilan</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        height: '100%',
        width: '100%',
    },
    kotakjawaban: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '25%',
        width: '90%',
        backgroundColor: '#A8201A',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3.84,
        elevation: 5,
    },
    containerkotak: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    textkotaklayanan: {
        justifyContent: 'center',
        textAlign: 'center',
    },
    textpanggilandarurat: {
        color: '#fff',
        fontFamily: 'bold',
        fontSize: 20,
        marginBottom: 20,
    },
    gambarkotaklayanan: {
        height: '100%',
        width: '50%',
    },
    cardImageAmbulance: {
        width: 150,
        height: 120,
        marginLeft: 0,
    },
    sliderContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        flexDirection:'row',
        position:'relative',
        textAlign:'center',
        // marginTop: 20,
        // backgroundColor: '#fff',
        height: 50,
        width: '85%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',

    },
    sliderButton: {
        // opacity:1,
        zIndex:2,
        // marginLeft:15,
        // marginRight:5,
        // position: 'absolute',
        backgroundColor: '#fff',
        height: 40,
        width: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    sliderArrow: {
        fontSize: 18,
        color: '#A8201A',
    },
    sliderText: {
        // opacity:1,
        marginLeft: 5,
        alignItems:'center',
        // position: 'absolute',
        color: '#000',
        fontSize: 15,
        fontFamily: 'medium',
    },
});

export default Homepagelayanan;
