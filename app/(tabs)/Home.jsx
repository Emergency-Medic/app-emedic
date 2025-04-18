import React, { useState, useRef, useEffect, useContext } from "react";
import { FlatList, ImageBackground, Modal, ScrollView, View, Image ,  Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Alert, PanResponder } from 'react-native';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import ArticleCard from "@/components/cards/ArticleCard";
import Swiper from 'react-native-swiper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth, db } from '@/firebaseConfig'
import { doc,onSnapshot,getDoc,collection,query,where,Timestamp,} from "firebase/firestore";
import moment from "moment-timezone";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import useUserData from '@/hooks/useUserData'
import { makePhoneCall } from "@/utils/callUtills";
import useFetchArticles from '@/hooks/useFetchArticles';
import useReminders from "@/hooks/useReminders";

const data = {  
  kategori1: [  
    'mimisan', 'terkilirdanmemar', 'sakitkepala'
  ],  
  kategori2: [  
    'fraktur', 'lukatusuk', 'pingsan', 'lukabakar'
  ],  
  kategori3: [  
   'gigitanular', 'hentijantung', 'kesetrum', 'seranganjantung', 'tersedak', 'pendarahan', 'anafilaksis' 
  ],  
};  

export default function Home() {
  const swiperRef = useRef(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('kategori1');
  const { articles, isLoading } = useFetchArticles(selectedCategory, data);
  const todayReminders = useReminders();
  const [sliderValue, setSliderValue] = useState(new Animated.Value(0));
  const [userData, setUserData] = useState(null)
  const { user, name } = useUserData(); 
  
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

      const renderCategoryInfo = () => {
        return articles.map((item, index) => (
          <ArticleCard key={item.id} item={{ ...item, index }} isLast={index === articles.length - 1} />
        ));
      };

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <StatusBar style='dark' translucent={true} />
          {/* Hello, (name) */}
          <View style={styles.header}> 
            <View style={styles.profileSection}> 
              <TouchableOpacity style={styles.profileIcon} onPress={() => router.push('/screens/profile/EditProfile')}>
                <MaterialIcons name="person-outline" size={18} color={Colors.grey} />
              </TouchableOpacity>
              {/* Greating Section */}
              <View style={styles.greatingSection}>
                <Text style={styles.halo}>
                  Halo,
                </Text>
                <Text style={styles.name}> 
                  {name}
                </Text>
              </View>
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
                uri: 'https://mysiloam-api.siloamhospitals.com/public-asset/website-cms/website-cms-16831818208485759.webp',
              }}
              style={styles.backgroundImage}
              blurRadius={0.5}
              borderRadius={10}
            />
            {/* <Text style={styles.headerText}>Tahap Awal Penanganan</Text> */}
            <View style={styles.contentBottomContainer}>
              <View>
                <Text style={styles.title}>Penilaian Awal Situasi</Text>
                <Text style={styles.description}>
                  Ketika ingin membantu korban, gunakan langkah-langkah "DRS" ini!
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push("../screens/artikel/awal/SliderTahapA")} style={styles.nextButtonTap}>
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
                <Text style={styles.title}>Penanganan Masalah</Text>
                <Text style={styles.description}>
                  Setelah menilai situasi, mulai tangani masalah dengan langkah "ABC" ini!
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push("../screens/artikel/awal/SliderTahapB")} style={styles.nextButtonTap}>
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
                uri: 'https://cdn1-production-images-kly.akamaized.net/ecL6Y9yvV56LSWbAtZM8QhmfnpM=/800x450/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/5045878/original/059069700_1733900022-1733894601873_tujuan-pertolongan-pertama.jpg',
              }}
              style={styles.backgroundImage}
              blurRadius={0.5}
              borderRadius={10}
            />
            <View style={styles.contentBottomContainer}>
              <View>
                <Text style={styles.title}>Pengumpulan Informasi</Text>
                <Text style={styles.description}>
                  Setelah korban sadar, lakukan langkah "SAMPLE" ini!
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push("../screens/artikel/awal/SliderTahapC")} style={styles.nextButtonTap}>
                <Text style={styles.nextButtonText}>{'Pelajari >'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.verifiedIcon}>
              <MaterialIcons name="verified" size={24} color="white" />
          </View>
          </View>
          </Swiper>
          </View>


          {/* Content */}
          {/* Rekomendasi Pembelajaran */}
          <View style={styles.rekomendasiPembelajaranTitle}>
            <Text style={styles.titleText}>Rekomendasi Pembelajaran</Text>
            <TouchableOpacity onPress={() => router.push('../screens/MetodePenangan')}>
              <Text style={styles.lihatSemua}> Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.kategoriSection} contentContainerStyle={styles.kategoriContent}> 
            <TouchableOpacity style={selectedCategory === 'kategori1' ? styles.sectionBerada : styles.section} onPress={() => setSelectedCategory('kategori1')}> 
              <Text style={selectedCategory === 'kategori1' ? styles.keteranganBerada : styles.keterangan}>Kategori 1</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={selectedCategory === 'kategori2' ? styles.sectionBerada : styles.section} onPress={() => setSelectedCategory('kategori2')}> 
              <Text style={selectedCategory === 'kategori2' ? styles.keteranganBerada : styles.keterangan}>Kategori 2</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={selectedCategory === 'kategori3' ? styles.sectionBerada : styles.section} onPress={() => setSelectedCategory('kategori3')}> 
              <Text style={selectedCategory === 'kategori3' ? styles.keteranganBerada : styles.keterangan}>Kategori 3</Text> 
            </TouchableOpacity>
          </ScrollView>
          
          {/* Cart */}  
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.cartContainer}>
            {renderCategoryInfo()}
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} style={styles.cartContainer}>
          <View style={styles.containerobat}>
          {todayReminders.length > 0 ? (
            todayReminders.map((item) => {
              let iconName = 'pill';
              if (item.type === 'Sirup') {
                iconName = 'tint';
              } else if (item.type === 'Tetes') {
                iconName = 'eye-dropper';
              } else if (item.type === 'Injeksi') {
                iconName = 'syringe';
              } else if (item.type === 'Tablet') {
                iconName = 'capsules';
              } else if (item.type === 'Salep') {
                iconName = 'flask'
              }

              return (
                <View key={item.id.toString()} style={styles.cardobat}>
                  <View style={styles.cardContentobat}>
                    {/* Icon Obat */}
                    <View style={styles.iconContainer}>
                      <FontAwesome5 name={iconName} size={30} color="#fff" />
                    </View>
                    <View style={styles.textContentobat}>
                      <Text style={styles.medicineNameobat}>{item.medName}</Text>
                      <Text style={styles.timeobat}>{item.reminders.join(", ")}</Text>
                      <Text style={styles.dosageobat}>{item.dose} {item.doseType}</Text>
                    </View>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.noRemindersContainer}>
              <MaterialIcons name="notifications-off" size={40} color={Colors.grey} />
              <Text style={styles.noRemindersText}>Tidak ada pengingat hari ini</Text>
            </View>
          )}
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
    marginLeft: 32,
    marginRight: 32,  
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
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
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 5,  
		flexDirection: 'row',
	},
	kategoriContent: {
    padding: 10,  
	},
	sectionBerada: {
		width: 69, 
		height: 23, 
		backgroundColor: Colors.red,
		borderRadius: 5,
		alignItems: 'center', 
		justifyContent: 'center',
		marginTop: 10,  
		marginRight: 10, 
	},
	section: {
		width: 69, 
		height: 23, 
		backgroundColor: '#EDEDED',
		borderRadius: 5,
		alignItems: 'center', 
		justifyContent: 'center',
		marginTop: 10,  
		marginRight: 10, 
	},
	keteranganBerada: {	
		fontSize: 9, 
		fontFamily: 'regular', 
		color: Colors.white,
	}, 
	keterangan: {
		fontSize: 9, 
		fontFamily: 'regular', 
		color: '#ACACAC',
	},
  cartContainer: {
    marginTop: 10,  
    marginLeft: 25, 
    marginRight: 30,
    borderRadius: 20,
  },
  cart: {
    backgroundColor: Colors.blue,
    borderRadius: 20, 
  }, 
  contain: {
    flexDirection: 'row',
    alignContent: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 10, 
    paddingVertical: 10,
    marginLeft: 10,
    gap: 5
  }, 
  pictureSection: {
    flexDirection: 'column',  
    alignItems:'flex-start', 
    justifyContent: 'center',
    // marginLeft: 32,  
  },
  image: { 
    width: 42, 
    height: 62, 
    justifyContent: 'center', 
    alignItems: 'center', 
    // marginTop:,
    borderRadius: 10,
  },
  textSection: {
    marginLeft: 5,  
    justifyContent: 'flex-start', 
    marginTop: 5,
    width: 214,
  },
  judul: {
    color: Colors.white, 
    fontFamily: 'semibold', 
    fontSize: 12, 
    marginTop: 5, 
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
    width: 240,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',  
    marginRight: 32,
    // marginTop: 10 
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
  verifiedContent: {
      // width:100,
      marginTop: 10,
      marginright: 40,
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
    width: '90%',
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
  backgroundColor: '#fff',
  top:-30
},
slide: {
  height:205,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  margin: 40,
},
backgroundImage: {
  // flex: 1,
  width: '100%',
  height: '95%',
  margin: 40,
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
  // backgroundColor: '#000',
  opacity: 0.8,
  borderRadius: 10,
  flexDirection: 'row',
  flex: 1,
  paddingHorizontal: 5,
  paddingVertical: 8,
},
title: {
  textAlign: 'left',
  fontSize: 18,
  fontFamily: 'bold',
  color: '#fff',
  marginBottom: 10,
  marginTop: 5,
  marginLeft: 5,
},
description: {
  textAlign: 'left',
  fontSize: 14,
  fontFamily: 'regular',
  color: '#fff',
  lineHeight: 20,
  paddingBottom: 10,
  width: '250',
  marginLeft: 5,
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
  right: 0,
},
verifiedIcon2: {
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  color: '#fff',
  right: 0,
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
  // height: '100%',
  // flex: 1,
  justifyContent: 'center',
  // padding: 20,
  backgroundColor: '#fff',
  flexDirection:'row',
  // flexGrow: 1,
},
titleTextobat:{
  fontFamily: 'bold', 
    fontSize: 15, 
    color: Colors.blue,
    marginLeft:20,
    paddingTop:10
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
iconContainer: {
  width: 40,
  height: 40,
  marginRight: 15,
  justifyContent: 'center',
  alignItems: 'center',
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
noRemindersContainer: {
  justifyContent:'center',
  alignItems:'center',
  // margin: 20,
  width:'350',
  height: 100,
},
noRemindersText: {
  // height: 100,
  justifyContent: "center",
  alignItems: 'center',
  // backgroundColor: '#000',
  fontSize: 16,
  color: Colors.grey,
  textAlign: 'center',
  // marginTop: 10,
},
}); 
