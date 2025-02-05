import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import * as Loc from 'expo-location';

const INITIAL_REGION = {
	latitude: -6.6000, 
    longitude: 106.8215,
	latitudeDelta: 0.02,
	longitudeDelta: 0.02,
};

export default function Location() {

	return(
		<View style={styles.container}>
			<StatusBar style="auto" />

			<MapView 
				style={styles.maps}  
				provider={PROVIDER_GOOGLE} 
				initialRegion={INITIAL_REGION}
				showsUserLocation
				showsMyLocationButton
			/>
			
		</View>
	); 
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
  maps: {
	width: '100%',
	height: '100%',
  },

});