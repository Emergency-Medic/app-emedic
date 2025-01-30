import React, { useRef } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Slider = () => {
    const swiperRef = useRef<Swiper | null>(null);
    const router = useRouter();

  return (
    <View style={styles.container}>
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
            source={{ uri: 'https://images.unsplash.com/photo-1649260257620-3fd04e1952e5?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.imageSlider}
            resizeMode="cover"
            />
            <View>
              <Text style={styles.title}>Heading 1</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Text>
            </View>
            
          </View>
          
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
          
          <View style={styles.contentBottomContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1649260257620-3fd04e1952e5?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.imageSlider}
            resizeMode="cover"
            />
            <View>
              <Text style={styles.title}>Heading 2</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Text>
            </View>
            
          </View>
          
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
          
          <View style={styles.contentBottomContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1649260257620-3fd04e1952e5?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
            style={styles.imageSlider}
            resizeMode="cover"
            />
            <View>
              <Text style={styles.title}>Heading 3</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
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
    height: '40%',
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
    marginBottom: 10,
    marginTop: 5,
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
    top: -280,
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
    height: '200%',
    width: '100%',
    marginBottom: 20,
    marginTop: 50,
  }
//   headerText: {
//     color: '#000',
//     fontFamily: 'semibold',
//     fontSize: 16,
//     textAlign: 'left',
//     color: '#29335C',
//   }
});

export default Slider;
