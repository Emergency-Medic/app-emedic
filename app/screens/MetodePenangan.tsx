import React, { useState } from "react";
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const data = {  
	semuaKategori: [
		{  
			id: 1,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},
		{  
			id: 2,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		}, 
		{  
			id: 3,  
			title: "Penanganan henti jantung",  
			keywords: "CPR, Pertolongan Pertama",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 4,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 5,  
			title: "Penanganan pernapasan",  
			keywords: "Asma, Sesak Napas",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},
		{  
			id: 6,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 7,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 8,
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
	],
	kategori1: [  
		{  
			id: 1,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},
		{  
			id: 2,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		}, 
		{  
			id: 3,  
			title: "Penanganan henti jantung",  
			keywords: "CPR, Pertolongan Pertama",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 4,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 5,  
			title: "Penanganan pernapasan",  
			keywords: "Asma, Sesak Napas",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},
		{  
			id: 6,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 7,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 8,
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		}, 
	],  
	kategori2: [  
		{  
			id: 1,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},
		{  
			id: 2,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		}, 
		{  
			id: 3,  
			title: "Penanganan henti jantung",  
			keywords: "CPR, Pertolongan Pertama",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 4,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 5,  
			title: "Penanganan pernapasan",  
			keywords: "Asma, Sesak Napas",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},
		{  
			id: 6,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 7,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 8,
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		}, 
	],  
	kategori3: [  
		{  
			id: 1,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},
		{  
			id: 2,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		}, 
		{  
			id: 3,  
			title: "Penanganan henti jantung",  
			keywords: "CPR, Pertolongan Pertama",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 4,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 5,  
			title: "Penanganan pernapasan",  
			keywords: "Asma, Sesak Napas",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},
		{  
			id: 6,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 7,  
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
		{  
			id: 8,
			title: "Penanganan penderita epilepsi",  
			keywords: "Henti, Jantung, Pernapasan, CPR",  
			description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
			image: require('../../assets/images/undraw_injured_9757 1.png'),  
		},  
	],  
};  

export default function MetodePenangan() {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState('semuaKategori');

	const renderCategoryInfo = () => {
		return data[selectedCategory].map((item) => (
			<View style={styles.cart} key={item.id}> 
				<View style={styles.pictureSection}>
					<MaterialIcons name="verified" size={14} color={Colors.white} />
					<Image source={item.image} style={styles.image} />
				</View>
				<View style={styles.textSection}>
					<Text style={styles.judul}>{item.title}</Text>
					<Text style={styles.kataKunci}>Kata Kunci: {item.keywords}</Text>
					<Text style={styles.deskripsi}>{item.description}</Text>
					<TouchableOpacity style={styles.pelajariSection}>
						<Text style={styles.pelajariText}>Pelajari</Text>
						<View style={styles.pelajariIcon}>
							<MaterialIcons name="article" size={10} color="black" />
						</View>
					</TouchableOpacity>
				</View>  
			</View>
		)); 
	}; 

	return (
		<View style={styles.container}>  
			<StatusBar barStyle='dark-content' translucent={true} />
			<TouchableOpacity style={styles.headerIcon} onPress={() => router.back()}> 
				<Ionicons name="arrow-back-circle-sharp" size={22} color={Colors.red} />
			</TouchableOpacity> 
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
	},
	cartContent: {
		paddingBottom: 20,
	},
	cart: {
		width: '100%', 
		height: 94, 
		backgroundColor: Colors.blue,
		borderRadius: 20, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'flex-start', 
		marginTop: 10, 
		paddingHorizontal: 10,
	}, 
	pictureSection: {
		flexDirection: 'column',  
		alignItems: 'center', 
		justifyContent: 'center',
		marginRight: 10,  
	},
	image: { 
		width: 42, 
		height: 42, 
		justifyContent: 'center', 
		alignItems: 'center', 
	},
	textSection: {
		flex: 1,
		justifyContent: 'center', 
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