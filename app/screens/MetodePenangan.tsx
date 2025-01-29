import React, { useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Button } from 'react-native';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MetodePenangan(){
	const router = useRouter();

	return(
		<ScrollView style={styles.container}>  
			<StatusBar style='dark' translucent={true} /> 
			<TouchableOpacity style={styles.headerIcon} onPress={() => router.push('../(tabs)/Home')}> 
				<Ionicons name="arrow-back-circle-sharp" size={22} color={Colors.red} />
			</TouchableOpacity> 
			<View style={styles.rekomendasiPembelajaranTitle}>
         		 <Text style={styles.titleText}>Rekomendasi Pembelajaran</Text>
        	</View>
        	
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.kategoriSection}> 
				<View style={styles.sectionBerada}> 
        		    <Text style={styles.keteranganBerada}>Semua</Text> 
          		</View>
         		 <View style={styles.section}> 
        		    <Text style={styles.keterangan}>Kategori 1</Text> 
          		</View>
          		<View style={styles.section}> 
            		<Text style={styles.keterangan}>Kategori 2</Text> 
          		</View>
         	 	<View style={styles.section}> 
            		<Text style={styles.keterangan}>Kategori 3</Text> 
          		</View>
	        </ScrollView>
        	
			<ScrollView style={styles.cartContainer}>
          		<View style={styles.cart}> 
            		<View style={styles.pictureSection}>
						<MaterialIcons name="verified" size={14} color={Colors.white} />
             			<Image source={require( 'C:/Project/app-emedic/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
            		</View>
					<View style={styles.textSection}>
              			<Text style={styles.judul}> 
                			Penanganan penderita epilepsi 
              			</Text>
              			<Text style={styles.kataKunci}>
            			    Kata Kunci: Henti, Jantung, Pernapasan, CPR
             			 </Text>
						<Text style={styles.deskripsi}>
            			    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            			  </Text>

						<View style={styles.pelajariSection}> 
            			    <Text style={styles.pelajariText}> 
            		    	  Pelajari
            		    	</Text>
            		    	<View style={styles.pelajariIcon}> 
            		    	  <MaterialIcons name="article" size={10} color="black" />
            		    	</View>
              			</View>
            		</View>  
          		</View>

          		<View style={styles.cart2}> 
            		<View style={styles.pictureSection}>
              			<MaterialIcons name="verified" size={14} color={Colors.white} />
              			<Image source={require( 'C:/Project/app-emedic/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
            		</View>
            		<View style={styles.textSection}>
              			<Text style={styles.judul}> 
                			Penanganan penderita epilepsi 
              			</Text>
              			<Text style={styles.kataKunci}>
                			Kata Kunci: Henti, Jantung, Pernapasan, CPR
              			</Text>
              			<Text style={styles.deskripsi}>
                			Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              			</Text>

              			<View style={styles.pelajariSection}> 
                			<Text style={styles.pelajariText}> 
                  				Pelajari
                			</Text>
                			<View style={styles.pelajariIcon}> 
                  				<MaterialIcons name="article" size={10} color="black" />
                			</View>
              			</View>
            		</View>
          		</View>

				  <View style={styles.cart}> 
            		<View style={styles.pictureSection}>
						<MaterialIcons name="verified" size={14} color={Colors.white} />
             			<Image source={require( 'C:/Project/app-emedic/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
            		</View>
					<View style={styles.textSection}>
              			<Text style={styles.judul}> 
                			Penanganan penderita epilepsi 
              			</Text>
              			<Text style={styles.kataKunci}>
            			    Kata Kunci: Henti, Jantung, Pernapasan, CPR
             			 </Text>
						<Text style={styles.deskripsi}>
            			    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            			  </Text>

						<View style={styles.pelajariSection}> 
            			    <Text style={styles.pelajariText}> 
            		    	  Pelajari
            		    	</Text>
            		    	<View style={styles.pelajariIcon}> 
            		    	  <MaterialIcons name="article" size={10} color="black" />
            		    	</View>
              			</View>
            		</View>  
          		</View>

          		<View style={styles.cart2}> 
            		<View style={styles.pictureSection}>
              			<MaterialIcons name="verified" size={14} color={Colors.white} />
              			<Image source={require( 'C:/Project/app-emedic/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
            		</View>
            		<View style={styles.textSection}>
              			<Text style={styles.judul}> 
                			Penanganan penderita epilepsi 
              			</Text>
              			<Text style={styles.kataKunci}>
                			Kata Kunci: Henti, Jantung, Pernapasan, CPR
              			</Text>
              			<Text style={styles.deskripsi}>
                			Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              			</Text>

              			<View style={styles.pelajariSection}> 
                			<Text style={styles.pelajariText}> 
                  				Pelajari
                			</Text>
                			<View style={styles.pelajariIcon}> 
                  				<MaterialIcons name="article" size={10} color="black" />
                			</View>
              			</View>
            		</View>
          		</View>
				  <View style={styles.cart}> 
            		<View style={styles.pictureSection}>
						<MaterialIcons name="verified" size={14} color={Colors.white} />
             			<Image source={require( 'C:/Project/app-emedic/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
            		</View>
					<View style={styles.textSection}>
              			<Text style={styles.judul}> 
                			Penanganan penderita epilepsi 
              			</Text>
              			<Text style={styles.kataKunci}>
            			    Kata Kunci: Henti, Jantung, Pernapasan, CPR
             			 </Text>
						<Text style={styles.deskripsi}>
            			    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            			  </Text>

						<View style={styles.pelajariSection}> 
            			    <Text style={styles.pelajariText}> 
            		    	  Pelajari
            		    	</Text>
            		    	<View style={styles.pelajariIcon}> 
            		    	  <MaterialIcons name="article" size={10} color="black" />
            		    	</View>
              			</View>
            		</View>  
          		</View>

          		<View style={styles.cart2}> 
            		<View style={styles.pictureSection}>
              			<MaterialIcons name="verified" size={14} color={Colors.white} />
              			<Image source={require( 'C:/Project/app-emedic/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
            		</View>
            		<View style={styles.textSection}>
              			<Text style={styles.judul}> 
                			Penanganan penderita epilepsi 
              			</Text>
              			<Text style={styles.kataKunci}>
                			Kata Kunci: Henti, Jantung, Pernapasan, CPR
              			</Text>
              			<Text style={styles.deskripsi}>
                			Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              			</Text>

              			<View style={styles.pelajariSection}> 
                			<Text style={styles.pelajariText}> 
                  				Pelajari
                			</Text>
                			<View style={styles.pelajariIcon}> 
                  				<MaterialIcons name="article" size={10} color="black" />
                			</View>
              			</View>
            		</View>
          		</View>
				  <View style={styles.cart}> 
            		<View style={styles.pictureSection}>
						<MaterialIcons name="verified" size={14} color={Colors.white} />
             			<Image source={require( 'C:/Project/app-emedic/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
            		</View>
					<View style={styles.textSection}>
              			<Text style={styles.judul}> 
                			Penanganan penderita epilepsi 
              			</Text>
              			<Text style={styles.kataKunci}>
            			    Kata Kunci: Henti, Jantung, Pernapasan, CPR
             			 </Text>
						<Text style={styles.deskripsi}>
            			    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            			  </Text>

						<View style={styles.pelajariSection}> 
            			    <Text style={styles.pelajariText}> 
            		    	  Pelajari
            		    	</Text>
            		    	<View style={styles.pelajariIcon}> 
            		    	  <MaterialIcons name="article" size={10} color="black" />
            		    	</View>
              			</View>
            		</View>  
          		</View>

          		<View style={styles.cart2}> 
            		<View style={styles.pictureSection}>
              			<MaterialIcons name="verified" size={14} color={Colors.white} />
              			<Image source={require( 'C:/Project/app-emedic/assets/images/undraw_injured_9757 1.png')} style={styles.image}></Image>
            		</View>
            		<View style={styles.textSection}>
              			<Text style={styles.judul}> 
                			Penanganan penderita epilepsi 
              			</Text>
              			<Text style={styles.kataKunci}>
                			Kata Kunci: Henti, Jantung, Pernapasan, CPR
              			</Text>
              			<Text style={styles.deskripsi}>
                			Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              			</Text>

              			<View style={styles.pelajariSection}> 
                			<Text style={styles.pelajariText}> 
                  				Pelajari
                			</Text>
                			<View style={styles.pelajariIcon}> 
                  				<MaterialIcons name="article" size={10} color="black" />
                			</View>
              			</View>
            		</View>
          		</View>
        	</ScrollView>  
	  </ScrollView>  
	);  
  };  
	
  const styles = StyleSheet.create({  
	container: {  
	  flex: 1,  
	  backgroundColor: Colors.white,  
	  padding: 20,
	},
	headerIcon: {
		padding: 20,  
		justifyContent: 'flex-start', 
		alignItems: 'flex-start', 	
	},
	rekomendasiPembelajaranTitle: {
		marginLeft: 20,
		marginRight: 20,  
		flexDirection: 'row', 
		justifyContent: 'space-between', 
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
		borderRadius:5,  
		flexDirection: 'row',

	  },
	  sectionBerada:{
		width: 69, 
		height: 23, 
		backgroundColor: Colors.red,
		borderRadius: 5,
		alignItems: 'center', 
		justifyContent: 'center',
		marginTop: 10,  
		marginRight: 10, 
	  },
	  section:{
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
		marginTop: 20, 
		marginLeft:20, 
		marginRight: 20,
		borderRadius: 20,  
	  },
	  cart: {
		width: 310, 
		height: 94, 
		backgroundColor: Colors.blue,
		borderRadius: 20, 
		flexDirection: 'row', 
		alignContent: 'center', 
		justifyContent: 'center', 
		marginTop: 10, 
	  }, 
	  pictureSection: {
		flexDirection: 'column',  
		alignItems:'flex-start', 
		justifyContent: 'center',
		marginLeft: 32,  
	  },
	  image: { 
		width: 42, 
		height: 42, 
		justifyContent: 'center', 
		alignItems: 'center', 
	  },
	  textSection: {
		marginLeft: 10,  
		justifyContent: 'flex-start', 
	  },
	  judul: {
		color: Colors.white, 
		fontFamily: 'semibold', 
		fontSize: 12, 
		marginTop: 10, 
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
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'flex-end',  
		marginRight: 32, 
		marginTop: 10, 
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
	  cart2: {
		width: 310, 
		height: 94, 
		backgroundColor: Colors.red,
		borderRadius: 20, 
		flexDirection: 'row', 
		alignContent: 'center', 
		justifyContent: 'center', 
		marginTop: 10,  
	  },
});  