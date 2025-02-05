import React, { useRef } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TahapAwal = () => {
  const swiperRef = useRef(null);
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
    height:'40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 30,
  },
  backgroundImage: {
    // flex: 1,
    width: '100%',
    height: '78%',
    margin: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 160,
  },
  contentBottomContainer: {
    position: 'absolute',
    top: 170,
    left: 10,
    right: 10,
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
    top: -180,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationButtons: {
    position: 'absolute',
    top: 340,
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
    top: 80,
    color: '#fff',
    right: 10,
  }
//   headerText: {
//     color: '#000',
//     fontFamily: 'semibold',
//     fontSize: 16,
//     textAlign: 'left',
//     color: '#29335C',
//   }
});

export default TahapAwal;