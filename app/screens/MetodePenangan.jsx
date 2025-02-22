import React, { useState, useEffect } from "react";
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import BackButton from "@/components/BackButton";

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
	const [articles, setArticles] = useState([]);

	// Function to fetch data from Firebase for the selected category
	const fetchData = async () => {
		const categoryDocuments = data[selectedCategory];  // Menggunakan data[selectedCategory]
		const fetchedArticles = [];
	
		for (const docId of categoryDocuments) {
		  const docRef = doc(db, "articles_no_cat", docId);
		  const docSnap = await getDoc(docRef);
	
		  if (docSnap.exists()) {
			const data = docSnap.data();
			fetchedArticles.push({
			  id: docId,
			  title: data.judul,
			  keywords: data.katakunci,
			  description: data.deskripsi,
			  image: data.gambarPenyakit,
			});
		  }
		}
		setArticles(fetchedArticles);
	};
	
	useEffect(() => {
		fetchData(); // Memanggil fetchData saat kategori berubah
	}, [selectedCategory]);
	
	const renderCategoryInfo = () => {
		return articles.map((item) => {
			const backgroundColor = articles.indexOf(item) % 2 === 0 ? Colors.blue : Colors.red; // Gunakan index dalam array articles
			const formattedKeywords = item.keywords.join(', ');
			const truncateDescription = (description) => {
				const words = description.split(' ');  // Pisahkan berdasarkan spasi
				const truncated = words.slice(0, 10).join(' ');  // Ambil 20 kata pertama
				return words.length > 10 ? truncated + '...' : truncated;  // Jika lebih dari 20 kata, tambahkan "..."
			  };

			return ( 
				<View style={[styles.cart, { backgroundColor }]} key={item.id}> 
					<View style={styles.pictureSection}>
						<MaterialIcons name="verified" size={16} color={Colors.white} />
						<Image source={{ uri: item.image }} style={styles.image} />
					</View>
					<View style={styles.textSection}>
						<Text style={styles.judul}>{item.title}</Text>
						<Text style={styles.kataKunci}>Kata Kunci: {formattedKeywords}</Text>
						<Text style={styles.deskripsi}>{truncateDescription(item.description)}</Text>
						<TouchableOpacity 
							style={styles.pelajariSection} 
							onPress={() => router.push(`../screens/artikel/Articlepage?id=${item.id}`)} // Menambahkan id artikel ke URL
							>
							<Text style={styles.pelajariText}>Pelajari</Text>
							<View style={styles.pelajariIcon}>
								<MaterialIcons name="article" size={10} color="black" />
							</View>
						</TouchableOpacity>
					</View>  
				</View>
			);
		}); 
	}; 

	return (
		<View style={styles.container}>  
			<BackButton color={Colors.red} top={45}/>
			<StatusBar barStyle='dark-content' translucent={true} />
			<View style={styles.rekomendasiPembelajaranTitle}>
				<Text style={styles.titleText}>Rekomendasi Pembelajaran</Text>
			</View>
			
			<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.kategoriSection} contentContainerStyle={styles.kategoriContent}> 
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
	keterangan: {
		fontSize: 9, 
		fontFamily: 'regular', 
		color: '#ACACAC',
	},
	cartContainer: {
		marginTop: 20, 
		marginLeft: 20, 
		marginRight: 20,
		borderRadius: 20,
		height: '100%'
	},
	cartContent: {
		paddingBottom: 20,
		justifyContent: 'flex-start',
		alignItems: 'center'
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
		marginTop: 10,
		borderRadius: 10,
	},
	textSection: {
		flex: 1,
		justifyContent: 'center', 
		marginTop: 5,
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
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'flex-end',  
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
