import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import BackButton from "@/components/BackButton";
import useFetchArticles from '@/hooks/useFetchArticles';
import ArticleCard from "@/components/cards/ArticleCard";

const data = {  
	semuaKategori: [
		'fraktur', 'gigitanular', 'hentijantung', 'kesetrum', 'lukatusuk', 'mimisan', 'pingsan', 'seranganjantung', 'terkilirdanmemar', 'tersedak', 'sakitkepala', 'pendarahan', 'lukabakar'
	],
	kategori1: [  
		'mimisan', 'terkilirdanmemar', 'sakitkepala'
	],  
	kategori2: [  
		'fraktur', 'lukatusuk', 'pingsan', 'lukabakar'
	],  
	kategori3: [  
		'gigitanular', 'hentijantung', 'kesetrum', 'seranganjantung', 'tersedak', 'pendarahan' 
	],  
};  

export default function MetodePenangan() {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState('semuaKategori');
	const { articles, isLoading } = useFetchArticles(selectedCategory, data);

	
	const renderCategoryInfo = () => {
        return articles.map((item, index) => (
          <ArticleCard key={item.id} item={{ ...item, index }} isLast={index === articles.length - 1} />
        ));
    };

	return (
		<View style={styles.container}>  
			<BackButton color={Colors.red} top={45}/>
			<StatusBar barStyle='dark-content' translucent={true} />
			<View style={styles.rekomendasiPembelajaranTitle}>
				<Text style={styles.titleText}>Rekomendasi Pembelajaran</Text>
			</View>
			
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.kategoriSection} contentContainerStyle={styles.kategoriContent}> 
				<TouchableOpacity style={selectedCategory === 'semuaKategori' ? styles.sectionBerada : styles.section} onPress={() => setSelectedCategory('semuaKategori')}> 
					<Text style={selectedCategory === 'semuaKategori' ? styles.keteranganBerada : styles.keterangan}>Semua</Text> 
				</TouchableOpacity>
				<TouchableOpacity style={selectedCategory === 'kategori1' ? styles.sectionBerada : styles.section} onPress={() => setSelectedCategory('kategori1')}> 
					<Text style={selectedCategory === 'kategori1' ? styles.keteranganBerada : styles.keterangan}>Kategori 1</Text> 
				</TouchableOpacity>
				<TouchableOpacity style={selectedCategory === 'kategori2' ? styles.sectionBerada : styles.section} onPress={() => setSelectedCategory('kategori2')}> 
					<Text style={selectedCategory === 'kategori2' ? styles.keteranganBerada : styles.keterangan}>Kategori 2</Text> 
				</TouchableOpacity>
				<TouchableOpacity style={selectedCategory === 'kategori3' ? styles.sectionBerada : styles.section} onPress={() => setSelectedCategory('kategori3')}> 
					<Text style={selectedCategory === 'kategori3' ? styles.keteranganBerada : styles.keterangan}>Kategori 3</Text> 
				</TouchableOpacity>
			</ScrollView>
			
			<ScrollView 
				style={styles.cartContainer}
				contentContainerStyle={styles.cartContent}
			>
				{renderCategoryInfo()}
			</ScrollView>  
		</View>  
	);  
}  

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
		marginTop: 80,
		justifyContent: 'space-between', 
	}, 
	titleText: {
		fontFamily: 'bold', 
		fontSize: 15, 
		color: Colors.blue, 
	}, 
	kategoriSection: {
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 5,  
		flexDirection: 'row',
	},
	kategoriContent: {
		paddingBottom: 10,
	},
	sectionBerada: {
		width: 69, 
		height: 23, 
		backgroundColor: Colors.red,
		borderRadius: 5,
		alignItems: 'center', 
		justifyContent: 'center',
		marginTop: 10,  
		marginRight: 10, 
	},
	section: {
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
	verifiedIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		color: '#fff',
		right: 0,
	},
	keterangan: {
		fontSize: 9, 
		fontFamily: 'regular', 
		color: '#ACACAC',
	},
	cartContainer: {
		marginTop: 20, 
		marginLeft: 5, 
		marginRight: 20,
		borderRadius: 20,
		height: '100%',
		width: '100%',
		gap: 10,
	},
	cartContent: {
		paddingBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: 10
	},
	cart: {
		width: '100%', 
		// height: 94, 
		borderRadius: 20, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'flex-start', 
		marginTop: 10, 
		// paddingHorizontal: 10,
		paddingHorizontal: 25,
		paddingVertical: 10,
		// position: 'relative',
	}, 
	pictureSection: {
		flexDirection: 'column',  
		alignItems: 'left', 
		justifyContent: 'center',
		marginRight: 15,
	},
	image: { 
		width: 42, 
		height: 62, 
		justifyContent: 'center', 
		alignItems: 'center', 
		// marginTop: 10,
		borderRadius: 10,
	},
	textSection: {
		flex: 1,
		justifyContent: 'center', 
		marginTop: 5,
	},
	verifiedContent: {
		marginBottom: 70,
		marginLeft: 10,
		// width: 10,
	},
	judul: {
		color: Colors.white, 
		fontFamily: 'semibold', 
		fontSize: 12, 
		marginBottom: 5, 
	}, 
	kataKunci: {
		color: Colors.white, 
		fontFamily: 'italic', 
		fontSize: 8,
		marginBottom: 5, 
	}, 
	deskripsi: {
		color: Colors.white, 
		fontFamily: 'regular', 
		fontSize: 10, 
		marginBottom: 5, 
	}, 
	pelajariSection: {
	width: 215,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',  
    marginRight: 32, 
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
});
