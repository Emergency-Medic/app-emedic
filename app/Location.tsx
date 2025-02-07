import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import { useNavigation, useRouter } from "expo-router";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import * as Loc from 'expo-location';

import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
			/>

			{/* Contain Location */}
			<View style= {styles.container2}> 
				<View style={styles.bukaMapsButton}>
					<TouchableOpacity style={styles.bukaMapsContainer}>
						<View style={styles.bukaMapsIcon}>
							<Entypo name="location-pin" size={20} color={Colors.white} />
						</View>

						<View style={styles.bukaMapsText}> 
							<Text style={styles.bukaMaps}>Buka Maps</Text>
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.friendInfo}>  
					<View style={styles.friendInfoContainer}> 
						<View style={styles.Icon}>
							<MaterialIcons name="directions-run" size={40} color={Colors.red} />
						</View>
						<View style={styles.friendInfoText}> 
							<Text style={styles.keterangan}> 
								Lokasi Natasya
							</Text>
							<Text style={styles.subKeterangan}> 
								Jl.Pakuan No.3, Sumur Batu, Kec.Babakan Madang, Kabupaten Bogor, Jawa Barat 16810
							</Text>
						</View>
					</View>

					<View style={styles.line}/>

					<View style={styles.subInfo}> 
						<Text style={styles.keterangan}>
							Jarak dari lokasi saya 
						</Text>
						<Text style={styles.subKeterangan}>
							1.4 km
						</Text>
					</View>
				</View>

			</View>
			
		</View>
	); 
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: Colors.white,
  },
  maps: {
	position: "absolute",  // Biar map ada di belakang
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
	width: '100%',
	height: '100%',
  },
  container2: {
	zIndex: 2,
	marginTop: 450, 
	padding: 20,
  },
  bukaMapsButton: {
	height: 40,
	width: 148, 
	backgroundColor: Colors.red,
	borderRadius: 46,
	alignItems: 'center',
	justifyContent: 'center',
	elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  }, 
  bukaMapsContainer: {
	alignItems: 'center',
	flexDirection: 'row',
	justifyContent: 'space-between'
  }, 
  bukaMapsIcon: {
	marginRight: 10, 
  }, 
  bukaMapsText: {
	marginLeft: 10, 
  },
  bukaMaps: {
	fontFamily: 'semi-bold',
	color: Colors.white,
	fontSize: 14, 
  },
  friendInfo: {
	marginTop: 13, 
	padding: 20, 
	height: 154,
	width: 350, 
	backgroundColor: Colors.white, 
	borderRadius: 29, 
	// alignItems: 'center', 
	justifyContent: 'flex-start', 
	elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  }, 
  friendInfoContainer: {
	// padding: ,
	justifyContent: 'space-between',
	flexDirection: 'row', 
	// alignItems: 'center',
	marginRight: 32, 
  }, 
  Icon:{
	padding: 10, 
  },
  friendInfoText: {
	paddingBottom: 10, 
	marginRight: 32,  
  },
  keterangan: {
	color: Colors.red, 
	fontFamily: 'bold', 
	fontSize: 20,
  },
  subKeterangan: {
	fontFamily: 'regular', 
	color: Colors.blue, 
	fontSize: 12, 
  },
  line: {
	height: 1,
	width: 300,  
	backgroundColor: Colors.black, 
  },
  subInfo: {
	paddingBlockStart:10, 
	padding: 10, 
  },

});