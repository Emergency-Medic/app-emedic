import React, { useRef, useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import BackButton from '@/components/BackButton'
import { Colors } from '@/constants/Colors';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const SliderTahapC = () => {
    const swiperRef = useRef<Swiper | null>(null);
    const router = useRouter();
    const [judul, setJudul] = useState('');
    const [judul_a, setJudulA] = useState('');
    const [judul_b, setJudulB] = useState('');
    const [judul_c, setJudulC] = useState('');
    const [judul_d, setJudulD] = useState('');
    const [judul_e, setJudulE] = useState('');
    const [judul_f, setJudulF] = useState('');
    const [deskripsi_a, setDeskripsiA] = useState('');
    const [deskripsi_b, setDeskripsiB] = useState('');
    const [deskripsi_c, setDeskripsiC] = useState('');
    const [deskripsi_d, setDeskripsiD] = useState('');
    const [deskripsi_e, setDeskripsiE] = useState('');
    const [deskripsi_f, setDeskripsiF] = useState('');
    const [gambar_a, setGambarA] = useState('');
    const [gambar_b, setGambarB] = useState('');
    const [gambar_c, setGambarC] = useState('');
    const [gambar_d, setGambarD] = useState('');
    const [gambar_e, setGambarE] = useState('');
    const [gambar_f, setGambarF] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            const docRef = doc(db, "pengumpulan_informasi", "sample");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()){
                const data = docSnap.data();
                setJudul(data.judul);
                setJudulA(data.tahap_a);
                setJudulB(data.tahap_b);
                setJudulC(data.tahap_c);
                setJudulD(data.tahap_d);
                setJudulE(data.tahap_e);
                setJudulF(data.tahap_f);
                setDeskripsiA(data.deskripsi_a);
                setDeskripsiB(data.deskripsi_b);
                setDeskripsiC(data.deskripsi_c);
                setDeskripsiD(data.deskripsi_d);
                setDeskripsiE(data.deskripsi_e);
                setDeskripsiF(data.deskripsi_f);
                setGambarA(data.gambar_a);
                setGambarB(data.gambar_b);
                setGambarC(data.gambar_c);
                setGambarD(data.gambar_d);
                setGambarE(data.gambar_e);
                setGambarF(data.gambar_f);
            } else {
                console.log("No such document!")
            }
        };
        fetchData();
    }, []);

  return (
    <View style={styles.container}>
      <BackButton color={Colors.red} top={45} />
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
          
          <View style={styles.contentBottomContainer}>
          <Image
            source={{ uri: gambar_a }}
            style={styles.imageSlider}
            resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>{judul_a}</Text>
              <Text style={styles.description}>
                {deskripsi_a}
              </Text>
            </View>
            
          </View>
          
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
          
          <View style={styles.contentBottomContainer}>
          <Image
            source={{ uri: gambar_b }}
            style={styles.imageSlider}
            resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>{judul_b}</Text>
              <Text style={styles.description}>
                {deskripsi_b}
              </Text>
            </View>
            
          </View>
          
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
          
          <View style={styles.contentBottomContainer}>
          <Image
            source={{ uri: gambar_c }}
            style={styles.imageSlider}
            resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>{judul_c}</Text>
              <Text style={styles.description}>
                {deskripsi_c}
              </Text>
            </View>
            
          </View>
         
        </View>

        {/* Slide 4 */}
        <View style={styles.slide}>
          
          <View style={styles.contentBottomContainer}>
          <Image
            source={{ uri: gambar_d }}
            style={styles.imageSlider}
            resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>{judul_d}</Text>
              <Text style={styles.description}>
                {deskripsi_d}
              </Text>
            </View>
            
          </View>
         
        </View>

        {/* Slide 5 */}
        <View style={styles.slide}>
          
          <View style={styles.contentBottomContainer}>
          <Image
            source={{ uri: gambar_e }}
            style={styles.imageSlider}
            resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>{judul_e}</Text>
              <Text style={styles.description}>
                {deskripsi_e}
              </Text>
            </View>
            
          </View>
         
        </View>

        {/* Slide 6 */}
        <View style={styles.slide}>
          
          <View style={styles.contentBottomContainer}>
          <Image
            source={{ uri: gambar_f }}
            style={styles.imageSlider}
            resizeMode="contain"
            />
            <View>
              <Text style={styles.title}>{judul_f}</Text>
              <Text style={styles.description}>
                {deskripsi_f}
              </Text>
            </View>
            
          </View>
         
        </View>
      </Swiper>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.prevButton}
          onPress={() => swiperRef.current?.scrollBy(-1)}
        >
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => swiperRef.current?.scrollBy(1)}
        >
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  slide: {
    height: '70%',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 30,
    marginTop: 100,
    borderRadius: 10, // Opsional, agar shadow lebih smooth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Untuk Android
},
  contentBottomContainer: {
    position: 'absolute',
    left: 10,
    right: 10,
    opacity: 0.8,
    borderRadius: 10,
    flexDirection: 'column',
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    textAlign: 'left',
    fontSize: 25,
    fontFamily: 'bold',
    color: '#000',
    marginBottom: 0,
    marginTop: 0,
  },
  description: {
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'regular',
    color: '#000',
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
    top: 665,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationButtons: {
    position: 'absolute',
    top: 750,
    left: 30,
    right: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
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
  imageSlider: {
    height: 300,
    width: '100%',
    marginBottom: 10,
    marginTop: 30,
  }
//   headerText: {
//     color: '#000',
//     fontFamily: 'semibold',
//     fontSize: 16,
//     textAlign: 'left',
//     color: '#29335C',
//   }
});

export default SliderTahapC;