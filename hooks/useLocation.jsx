import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import * as Location from "expo-location";

const useLocation = () => { 
	
	const [errorMsg, setErrorMsg] = useState("");
	const [longitude, setLongitude] = useState("");
	const [latitude, setLatitude] = useState("");
	const [city, setCity] = useState("");

	const getUserLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== "granted") {
			setErrorMsg("Permission to access location was denied");
			return;
		}

		let { coords } = await Location.getCurrentPositionAsync({});
		
		if(coords){
			const { latitude, longitude } = coords;
			console.log("Longitude: ", longitude);
			console.log("Latitude: ", latitude);
			setLongitude(longitude);
			setLatitude(latitude);
			let response = await Location.reverseGeocodeAsync({ latitude, longitude });
			if (response.length > 0) {
				setCity(response[0].city || "Unknown City");
			}
			console.log("Location: ", response);
		}
	}; 

	useEffect(() => {
		getUserLocation();
	}, []);

	return {latitude, longitude, city, errorMsg};
}; 

export default useLocation;

const styles = StyleSheet.create({});