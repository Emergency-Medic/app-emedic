import React, { useState, useRef } from "react";
import { ImageBackground, Modal, ScrollView, View, Image ,  Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Alert, PanResponder } from 'react-native';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import call from 'react-native-phone-call'; 
import Swiper from 'react-native-swiper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const data = {  
  kategori1: [  
    {  
      id: 1,  
      title: "Penanganan penderita epilepsi",  
      keywords: "Henti, Jantung, Pernapasan, CPR",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('@/assets/images/undraw_injured_9757 1.png'),  
    },  
    {  
      id: 1,  
      title: "Penanganan penderita epilepsi",  
      keywords: "Henti, Jantung, Pernapasan, CPR",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('@/assets/images/undraw_injured_9757 1.png'),  
    },  
  ],  
  kategori2: [  
    {  
      id: 2,  
      title: "Penanganan henti jantung",  
      keywords: "CPR, Pertolongan Pertama",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('@/assets/images/undraw_injured_9757 1.png'),  
    },  
    // Tambahkan lebih banyak item jika perlu  
  ],  
  kategori3: [  
    {  
      id: 3,  
      title: "Penanganan pernapasan",  
      keywords: "Asma, Sesak Napas",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('@/assets/images/undraw_injured_9757 1.png'),  
    },  
    // Tambahkan lebih banyak item jika perlu  
  ],  
};  


export default function Home() {

  const swiperRef = useRef(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('kategori1');

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
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style='dark' translucent={true} />
        {/* Hello, (name) */}
        <View style={styles.header}> 
          <View style={styles.profileSection}> 
            <View style={styles.profileIcon}>
              <MaterialIcons name="person-outline" size={18} color={Colors.grey} />
            </View>
            {/* Greating Section */}
            <View style={styles.greatingSection}>
              <Text style={styles.halo}>
                Halo,
              </Text>
              <Text style={styles.name}> 
                Natasya
              </Text>
            </View>
          </View> 
          <View style={styles.alarmIcon}> 
            <MaterialIcons name="alarm" size={20} color= {Colors.blue} />
          </View>
        </View>

        {/* Content */}
        <View style={styles.containercontent}>
        <StatusBar style="light" translucent={true} backgroundColor="transparent" />
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
            source={{
              uri: 'https://images.unsplash.com/photo-1624638760852-8ede1666ab07?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.backgroundImage}
            blurRadius={0.5}
            borderRadius={10}
          />
          {/* <Text style={styles.headerText}>Tahap Awal Penanganan</Text> */}
          <View style={styles.contentBottomContainer}>
            <View>
              <Text style={styles.title}>Heading 1</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Text>
            </View>
            <TouchableOpacity style={styles.nextButtonTap}>
              <Text style={styles.nextButtonText}>{'Pelajari >'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verifiedIcon}>
            <MaterialIcons name="verified" size={24} color="white" />
        </View>
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1624638760852-8ede1666ab07?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.backgroundImage}
            blurRadius={0.5}
            borderRadius={10}
          />
          <View style={styles.contentBottomContainer}>
            <View>
              <Text style={styles.title}>Heading 2</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Text>
            </View>
            <TouchableOpacity style={styles.nextButtonTap}>
              <Text style={styles.nextButtonText}>{'Pelajari >'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verifiedIcon}>
            <MaterialIcons name="verified" size={24} color="white" />
        </View>
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1624638760852-8ede1666ab07?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.backgroundImage}
            blurRadius={0.5}
            borderRadius={10}
          />
          <View style={styles.contentBottomContainer}>
            <View>
              <Text style={styles.title}>Heading 3</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Text>
            </View>
            <TouchableOpacity style={styles.nextButtonTap}>
              <Text style={styles.nextButtonText}>{'Pelajari >'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.verifiedIcon}>
            <MaterialIcons name="verified" size={24} color="white" />
        </View>
        </View>
        </Swiper>

        {/* Navigation Buttons */}
        {/* <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.prevButton}
          onPress={() => swiperRef.current.scrollBy(-1)}
        >
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => swiperRef.current.scrollBy(1)}
        >
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
        </View> */}
        </View>


        {/* Rekomendasi Pembelajaran */}
        <View style={styles.rekomendasiPembelajaranTitle}>
          <Text style={styles.titleText}>Rekomendasi Pembelajaran</Text>
          <TouchableOpacity onPress={() => router.push('../screens/MetodePenangan')}>
            <Text style={styles.lihatSemua}> Lihat Semua</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.kategoriSection}> 
          <TouchableOpacity style={styles.section}> 
            <Text style={styles.keterangan}>Kategori 1</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.section}> 
            <Text style={styles.keterangan}>Kategori 2</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.section}> 
            <Text style={styles.keterangan}>Kategori 3</Text> 
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.cartContainer}>
          <View style={styles.containerkeseluruhan}>
            <View style={styles.cart}> 
              <View style={styles.pictureSection}>
                <MaterialIcons name="verified" size={14} color={Colors.white} />
                <Image source={require( '@/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
              </View>
              <View style={styles.textSection}>
                <Text style={styles.judul}> 
                  Penanganan penderita epilepsi 
                </Text>
                <Text style={styles.kataKunci}>
                  Kata Kunci: Henti, Jantung, Pernapasan, CPR
                </Text>
                <Text style={styles.deskripsi}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </Text>

                <View style={styles.pelajariSection}> 
                  <Text style={styles.pelajariText}> 
                    Pelajari
                  </Text>
                  <View style={styles.pelajariIcon}> 
                    <MaterialIcons name="article" size={10} color="black" />
                  </View>
                </View>
              </View>  
            </View>
            

            <View style={styles.cart2}> 
              <View style={styles.pictureSection}>
                <MaterialIcons name="verified" size={14} color={Colors.white} />
                <Image source={require( '@/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
              </View>
              <View style={styles.textSection}>
                <Text style={styles.judul}> 
                  Penanganan penderita epilepsi 
                </Text>
                <Text style={styles.kataKunci}>
                  Kata Kunci: Henti, Jantung, Pernapasan, CPR
                </Text>
                <Text style={styles.deskripsi}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                </Text>

                <View style={styles.pelajariSection}> 
                  <Text style={styles.pelajariText}> 
                    Pelajari
                  </Text>
                  <View style={styles.pelajariIcon}> 
                    <MaterialIcons name="article" size={10} color="black" />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Layanan */}
        <View style={styles.containerlayanan}>
          <View style={styles.containerlayananawal}>
            <Text style={styles.titleTextlayanan}>Layanan</Text>
          </View>
            <View style={styles.kotakjawaban}>
                <View style={styles.containerkotak}>
                    <View style={styles.textkotaklayanan}>
                        <Text style={styles.textpanggilandarurat}>Panggilan</Text>
                        <Text style={styles.textpanggilandarurat}>Darurat</Text>
                    </View>
                    <View style={styles.gambarkotaklayanan}>
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

            <Text style={styles.titleTextobat}>Pengingat Obat</Text>
        {/* Pengingat obat */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.cartContainer}>
          <View style={styles.containerobat}>
            <View style={styles.cardobat}>
              <View style={styles.cardContentobat}>
                <Image
                  source={require('@/assets/images/Maskot.png')}
                  style={styles.iconobat}
                />
                <View style={styles.textContentobat}>
                  <Text style={styles.medicineNameobat}>Acetaminophen</Text>
                  <Text style={styles.timeobat}>08:00 AM</Text>
                  <Text style={styles.instructionsobat}>For the treatment of headache</Text>
                  <Text style={styles.dosageobat}>1 before food</Text>
                </View>
              </View>
            </View>

            <View style={styles.cardobat}>
              <View style={styles.cardContentobat}>
                
                <Image
                  source={require('@/assets/images/Maskot.png')}
                  style={styles.iconobat}
                />
                <View style={styles.textContentobat}>
                  <Text style={styles.medicineNameobat}>Acetaminophen</Text>
                  <Text style={styles.timeobat}>08:00 AM</Text>
                  <Text style={styles.instructionsobat}>For the treatment of headache</Text>
                  <Text style={styles.dosageobat}>1 before food</Text>
                </View>
              </View>
            </View>
          </View>    
        </ScrollView>
    </ScrollView>
  ); 
}; 

const styles = StyleSheet.create({
  container: {
    // flex: 1, 
    backgroundColor: Colors.white,
  }, 
  header: {
    marginTop: 20, 
    padding: 32,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  profileSection: {
    flexDirection: 'row', 
    alignItems: 'center', 
  }, 
  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: Colors.lightGrey, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  greatingSection: {
    flexDirection: 'row',
    marginLeft: 15, 
  }, 
  halo: {
    fontFamily: 'light',
    color: Colors.blue,
    fontSize: 20, 
  }, 
  name: {
    marginLeft: 5, 
    fontFamily: 'bold', 
    fontSize: 20, 
    color: Colors.blue,
  }, 
  alarmIcon: {
    alignItems: 'center', 
  }, 
  rekomendasiPembelajaranTitle: {
    // marginTop:5,
    marginLeft: 32,
    marginRight: 32,  
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  }, 
  titleText: {
    fontFamily: 'bold', 
    fontSize: 15, 
    color: Colors.blue, 
  }, 
  lihatSemua: {
    fontFamily: 'regular', 
    fontSize: 10, 
    color: Colors.red,
  }, 
  kategoriSection: {
    marginLeft: 32, 
    flexDirection: 'row', 
  },
  section:{
    width: 69, 
    height: 23, 
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10,  
    marginRight: 10, 
  },
  keterangan: {
    fontSize: 9, 
  },
  cartContainer: {
    // height:0,
    marginTop: 10, 
    marginLeft: 32, 
    marginRight: 32,
    borderRadius: 10,  
  },
  containerkeseluruhan: {
    // height:300,
    flexDirection:'row',
  },
  cart: {
    width: 250, 
    height: 100, 
    backgroundColor: Colors.blue,
    borderRadius: 10, 
    flexDirection: 'row', 
    alignContent: 'center', 
    justifyContent: 'center', 
  }, 
  pictureSection: {
    flexDirection: 'column',  
    alignItems:'flex-start', 
    justifyContent: 'center',
    marginLeft: 32,  
  },
  image: { 
    width: 42, 
    height: 42, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  textSection: {
    marginLeft: 10,  
    justifyContent: 'flex-start', 
  },
  judul: {
    color: Colors.white, 
    fontFamily: 'semibold', 
    fontSize: 12, 
    marginTop: 10, 
  }, 
  kataKunci: {
    color: Colors.white, 
    fontFamily: 'italic', 
    fontSize: 8,
    marginTop: 3, 
  }, 
  deskripsi: {
    color: Colors.white, 
    fontFamily: 'regular', 
    fontSize: 10, 
    marginTop: 5, 
    marginRight: 40, 
  }, 
  pelajariSection: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',  
    marginRight: 32, 
  }, 
  pelajariText: {
    marginRight: 6, 
    fontFamily: 'semibold', 
    fontSize: 12, 
    color: Colors.white, 
  }, 
  pelajariIcon: {
    width: 20,
    height: 20, 
    borderRadius: 20, 
    backgroundColor: Colors.white, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  cart2: {
    width: 250, 
    height: 100, 
    backgroundColor: Colors.red,
    borderRadius: 10, 
    flexDirection: 'row', 
    alignContent: 'center', 
    justifyContent: 'center', 
    marginLeft: 10, 
  },
  containerlayanan: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 250,
    width: '100%',
},
containerlayananawal:{
  alignItems:'flex-start',
  padding:10,
},
titleTextlayanan:{
  fontFamily: 'bold', 
    fontSize: 15, 
    color: Colors.blue,
    
    marginLeft: -165,
    // marginRight: 32,  
    // flexDirection: 'row', 
    // justifyContent: 'space-between', 
},
kotakjawaban: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200 ,
    width: '85%',
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
    gap: 30,
},
textkotaklayanan: {
    justifyContent: 'center',
    textAlign: 'center',
    
},
textpanggilandarurat: {
    color: '#fff',
    fontFamily: 'bold',
    fontSize: 20,
    // marginBottom: 20,
},
gambarkotaklayanan: {
    height: '100%',
    width: '45%',
},
cardImageAmbulance: {
    width: 150,
    height: 120,
    marginLeft: 0,
},
sliderContainer: {
    backgroundColor: 'rgba(127, 23, 23, 0.3)',
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
    color: '#fff',
    fontSize: 15,
    fontFamily: 'medium',
},

// COntent

containercontent: {
  height: 250,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  top:-30
},
slide: {
  height:200,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  margin: 30,
},
backgroundImage: {
  // flex: 1,
  width: '100%',
  height: '100%',
  margin: 20,
  justifyContent: 'center',
  alignItems: 'center',
  // marginTop: 160,
},
contentBottomContainer: {
  position: 'absolute',
  bottom:10,
//  margintop: 150,
  // left: 10,
  // right: 10,
  backgroundColor: '#000F48',
  opacity: 0.8,
  borderRadius: 10,
  flexDirection: 'row',
  flex: 1,
  paddingHorizontal: 15,
  paddingVertical: 5,
},
title: {
  textAlign: 'left',
  fontSize: 25,
  fontFamily: 'bold',
  color: '#fff',
  marginBottom: 10,
  marginTop: 5,
},
description: {
  textAlign: 'left',
  fontSize: 14,
  fontFamily: 'regular',
  color: '#fff',
  lineHeight: 20,
  paddingBottom: 10,
},
dotStyle: {
  backgroundColor: '#D9D9D9',
},
activeDotStyle: {
  backgroundColor: '#A8201A',
},
paginationStyle: {
  position: 'absolute',
  // margintop:50,
  bottom:-20,
  left: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center',
},
navigationButtons: {
  position: 'absolute',
  top: 240,
  left: 30,
  right: 30,
  flexDirection: 'row',
  justifyContent: 'space-between',
},
prevButton: {
  padding: 10,
  backgroundColor: '#A8201A',
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
},
nextButton: {
  padding: 10,
  backgroundColor: '#A8201A',
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
  width: 40,
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontFamily: 'extrabold',
},
nextButtonTap: {
  backgroundColor: '#fff',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  width: 60,
  height: 30,
  marginTop: 55,
  marginLeft: 6,
},
nextButtonText: {
  fontSize: 10,
  fontFamily: 'semibold',
},
verifiedIcon: {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 100,
  color: '#fff',
  right: 10,
},
//   headerText: {
//     color: '#000',
//     fontFamily: 'semibold',
//     fontSize: 16,
//     textAlign: 'left',
//     color: '#29335C',
//   }

// Pengingat obat

containerobat: {
  // flex: 1,
  justifyContent: 'center',
  // padding: 20,
  backgroundColor: '#fff',
  flexDirection:'row',
},
titleTextobat:{
  fontFamily: 'bold', 
    fontSize: 15, 
    color: Colors.blue,
    marginLeft:20,
    padding:10
},
cardobat: {
  backgroundColor: '#3A3D77',
  marginBottom: 15,
  borderRadius: 10,
  padding: 15,
  elevation: 3, // Add shadow effect for Android
  marginRight:10
},
cardContentobat: {
  flexDirection: 'row',
  alignItems: 'center',
},
iconobat: {
  width: 40,
  height: 40,
  marginRight: 15,
},
textContentobat: {
  flex: 1,
},
medicineNameobat: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
},
timeobat: {
  fontSize: 14,
  color: '#fff',
},
instructionsobat: {
  fontSize: 14,
  color: '#fff',
  marginTop: 5,
},
dosageobat: {
  fontSize: 14,
  color: '#fff',
  marginTop: 5,
},
}); 
