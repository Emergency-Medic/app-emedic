import React, { useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import { useRouter } from "expo-router";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';

const INITIAL_REGION = {
	latitude: 37.33,
	longitude: -122,
	latitudeDelta: 2,
	longitudeDelta: 2,
};

export default function Location() {
	const router = useRouter();
	return(
		<View>
			<StatusBar style="auto" />
			<MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_REGION} showsUserLocation showsMyLocationButton/>
			
		</View>
	); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
	width: '100%',
    height: '100%',
  }
});