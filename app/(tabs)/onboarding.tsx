import React, { useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OnboardingScreen = () => {
  const swiperRef = useRef(null);

  return (
    <Swiper
      ref={swiperRef}
      loop={true}
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
          blurRadius={1}
        >
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>E-Medic</Text>
          <Text style={styles.description}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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

      {/* Slide 2 */}
      <View style={styles.slide}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1649260257600-8908e14752c2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
          style={styles.backgroundImage}
          blurRadius={1}
        >
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>E-Medic</Text>
          <Text style={styles.description}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Your Emergency Assistant</Text>
          <Text style={styles.description}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipText}>Skip {'>'}{'>'}</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>E-Medic</Text>
          <Text style={styles.description}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5, // Apply opacity to background only
    width: '100%',
  },
  contentContainer: {
    position: 'absolute',
    bottom: 140,
    left: 30,
    right: 30,
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#fff',
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
  prevButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  nextButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  nextButton2: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    left: 420,
  },
  buttonText: {
    color: '#A8201A',
    fontSize: 16,
    fontWeight: '900',
  },
});

export default OnboardingScreen;
