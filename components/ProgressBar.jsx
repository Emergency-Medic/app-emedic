// components/ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.progresSection}>
      <View style={styles.progresTextSection}>
        <Text style={styles.progress}>Progres Anda keseluruhan: </Text>
        <Text style={styles.persentage}>{progress}%</Text>
      </View>
      <View style={styles.progresBar}>
        <View style={[styles.bar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    progresSection: {
		marginTop: 20, 
	}, 
	progresTextSection: {
		flexDirection: 'row',  
		marginBottom: 10, 
	}, 
	progress: {    
		fontSize: 14,
		fontFamily: 'light', 
		color: Colors.red,      
	}, 
	persentage:  {
		fontFamily: 'bold', 
		fontSize: 14,
		color: Colors.red,
	}, 
	progresBar:{
		width: 284, 
		height: 10.16,
		marginBottom: 20,  
		backgroundColor: Colors.white, 
		alignItems: 'flex-start', 
		justifyContent: 'center', 
		borderRadius: 20, 
		elevation: 2,
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.05,
		shadowRadius: 10, 
	}, 
	bar: {
		width: 100, 
		height: 2.9,
		backgroundColor: Colors.red, 
		borderRadius: 20, 
		marginHorizontal: 5
	},
});

export default ProgressBar;