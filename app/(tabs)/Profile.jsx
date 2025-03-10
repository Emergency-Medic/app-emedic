import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';    
import { Colors } from '@/constants/Colors';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { signOut } from "firebase/auth";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { auth, db } from "@/firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserData from '@/hooks/useUserData'

  
const Profile = ({ modalVisible, setModalVisible }) => {    
	const router = useRouter();
	const handleSignOut = () => {
		signOut(auth).then(() => {
			router.replace('/MenuAwal')
		}).catch((error) => {
			console.log(error);
		})
	}
	const [lastReadArticle, setLastReadArticle] = useState(null)
	const [modalHeight, setModalHeight] = useState(610);
	const [articleUpdated, setArticleUpdated] = useState(false);
	const { name, username, completedQuizzes } = useUserData(); 
	const progress = Math.round((completedQuizzes.length / 13) * 100)

	const loadLastRead = useCallback(async () => {
        try {
            const storedArticle = await AsyncStorage.getItem('lastRead');
            const parsedArticle = storedArticle ? JSON.parse(storedArticle) : null;
            setLastReadArticle(parsedArticle); // Directly set the state
            setModalHeight(parsedArticle ? 590 : 500); // Set modal height based on article
        } catch (error) {
            console.error("Error loading lastRead:", error);
            setLastReadArticle(null);
            setModalHeight(500);
        }
    }, []);
	
		useEffect(() => {
			loadLastRead(); // Reload when articleUpdated changes
		}, [articleUpdated, loadLastRead]); // Add articleUpdated as a dependency

		const handleArticlePress = async (article) => {
			try {
				await AsyncStorage.setItem('lastRead', JSON.stringify(article));
				setLastReadArticle(article); // Update state directly after setting AsyncStorage
				setModalHeight(610); // Update modal height
				router.push(`../screens/artikel/Articlepage?id=${article?.id}`);
			} catch (error) {
				console.error("Error saving lastRead:", error);
			}
		};

		  const renderLastRead = () => {
			if (!lastReadArticle) {
				return (
					<View style={styles.noRemindersContainer}>
						<FontAwesome5 name="exclamation" size={20} color="black" />
						<Text style={styles.noRemindersText}>Belum ada artikel yang dikunjungi</Text>
					</View>
				);
			}
	
			const formattedKeywords = lastReadArticle?.keywords?.join(', ') ?? '';
			const truncateDescription = lastReadArticle?.description ? (description => {
				const words = description.split(' ');
				const truncated = words.slice(0, 7).join(' ');
				return words.length > 7 ? truncated + '...' : truncated;
			})(lastReadArticle.description) : '';
	
			return (
				<View style={[styles.cart, { backgroundColor: Colors.blue }]}>
					<Text>
						<MaterialIcons name="verified" size={20} color={Colors.white} style={styles.verifiedContent} />
					</Text>

					<View style={styles.cart2}>
						<Image source={{ uri: lastReadArticle?.image }} style={styles.image} />
						<Text style={styles.judul}>{lastReadArticle?.title}</Text>
						<Text style={styles.kataKunci}>Kata Kunci: {formattedKeywords}</Text>
						<Text style={styles.deskripsi}>{truncateDescription}</Text>
						<TouchableOpacity
							style={styles.pelajariSection}
							// onPress={() => router.push(`../screens/artikel/Articlepage?id=${lastReadArticle?.id}`)}
							onPress={() => handleArticlePress(lastReadArticle)}
						>
							<Text style={styles.pelajariText}>Pelajari</Text>
							<View style={styles.pelajariIcon}>
								<MaterialIcons name="article" size={10} color="black" />
							</View>
						</TouchableOpacity>
					</View>
          </View>
      );
  };

	return (    
		<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
			<TouchableWithoutFeedback onPressOut={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					<View style={[styles.modalContent, { height: modalHeight }]}>
						{/* Header */}
						<View style={styles.header}>
							<Text style={styles.eMedicId}>Username</Text>
							<View style={styles.idCircle}>
								<Text style={styles.userId}>{username}</Text>
							</View>
						</View>

						<TouchableOpacity style={styles.profileSection} onPress={() => router.push('/screens/profile/EditProfile')}>
							<View style={styles.profileContainer}>
								<View style={styles.profileIcon}>
									<MaterialIcons name="person-outline" size={14} color={Colors.grey}/>
								</View>
								<Text style={styles.userName}>{name}</Text>
							</View>
							<AntDesign name="right" size={15} color={Colors.blue} />
						</TouchableOpacity>
						
						{/* Progress Section */}
						<View style={styles.progresSection}>
							<View style={styles.progresTextSection}>
								<Text style={styles.progress}>Progres Anda keseluruhan: </Text>
								<Text style={styles.persentage}>{progress}%</Text>
							</View>
							<View style={styles.progresBar}>
								<View style={[styles.bar, { width: `${progress}%` }]}>
								</View> 
							</View>
						</View>
						
						{/* Last Read */}
						<View style={styles.bookmarkContainer}>
                            <Text style={styles.eMedicId}>Terakhir Dikunjungi</Text>
                            <ScrollView style={{marginTop: 10}} contentContainerStyle={{alignItems: 'center'}}>
                                {renderLastRead()}
                            </ScrollView>
                        </View>
						{/* Friend */}
						<TouchableOpacity style={styles.friendSection} onPress={() => router.push('../screens/contact/Contactpage')}>
							<MaterialCommunityIcons name="contacts" size={20} color={Colors.blue} />
							<Text style={styles.teman}>Teman</Text>
						</TouchableOpacity>
						{/* Log Out */}
						<TouchableOpacity onPress={handleSignOut} style={styles.logOutSection}>
							<Text style={styles.logOut}>Log Out</Text>
						</TouchableOpacity>
					</View>
				</View>
	  		</TouchableWithoutFeedback>
    	</Modal>
  );    
};    
  
const styles = StyleSheet.create({    
  modalContainer: {    
    flex: 1,
	justifyContent: 'center', 
	alignItems: 'flex-end',       
    backgroundColor: Colors.transparencyGrey,
  },    
  modalContent: {   
    width: 319,
	height: 400,     
    padding: 20,    
    backgroundColor: '#fff',    
    borderRadius: 10,  
	alignItems: 'flex-start', 
	marginTop: 50,
  },    
  header: {
	flexDirection: 'row', 
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	marginTop: 0
  },
  eMedicId: {
	fontFamily: 'regular',
	paddingVertical: 15,  
    fontSize: 13,    
    color: Colors.blue,    
  },    
  idCircle: {
	// width: 189, 
	// height: 32, 
	borderRadius: 60,
	backgroundColor: Colors.white, 
	alignItems: 'center', 
	justifyContent: 'center',
	elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10, 
  },
  userId: {    
    fontSize: 14,    
    color: Colors.blue,   
	paddingHorizontal: 25,
	paddingVertical: 5,
  },    
  profileSection: {
	width: 270, 
	height: 50, 
	marginTop: 10, 
	backgroundColor: Colors.white, 
	borderRadius: 60, 
	flexDirection: 'row', 
	justifyContent: 'space-around',
    alignItems: 'center',
	elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10, 
  },
  contain: { // Style contain dipindahkan dari Home.jsx
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginLeft: 10,
        gap: 5
    },
    pictureSection: { // Style pictureSection dipindahkan dari Home.jsx
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    image: { // Style image dipindahkan dari Home.jsx
        width: 42,
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSection: { // Style textSection dipindahkan dari Home.jsx
        marginLeft: 5,
        justifyContent: 'flex-start',
        marginTop: 5,
        width: 214,
    },
    judul: { // Style judul dipindahkan dari Home.jsx
        color: Colors.white,
        fontFamily: 'semibold',
        fontSize: 12,
        marginTop: 5,
    },
    deskripsi: { // Style deskripsi dipindahkan dari Home.jsx
        color: Colors.white,
        fontFamily: 'regular',
        fontSize: 10,
        marginTop: 5,
        marginRight: 40,
    },
    pelajariSection: { // Style pelajariSection dipindahkan dari Home.jsx
        width: 240,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 32,
    },
    pelajariText: { // Style pelajariText dipindahkan dari Home.jsx
        marginRight: 6,
        fontFamily: 'semibold',
        fontSize: 12,
        color: Colors.white,
    },
    pelajariIcon: { // Style pelajariIcon dipindahkan dari Home.jsx
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifiedContent: { // Style verifiedContent dipindahkan dari Home.jsx
        marginTop: 0,
        marginRight: 0,
    },
	profileContainer: {
		flexDirection: 'row', 
		alignItems: 'center', 
	}, 
	profileIcon: {
		width: 34.28,
		height: 34.28, 
		borderRadius: 20, 
		backgroundColor: Colors.lightGrey,
		justifyContent: 'center',
		alignItems: 'center',
	}, 
	userName: {    
		marginLeft: 10, 
		fontFamily: 'semibold',
		fontSize: 15,    
		color: Colors.blue,   
	},    
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
	bookmarkContainer:{
		flexDirection: 'column', 
		marginTop: 5,
		width: '100%',
	}, 
	image: {
		width: 138,
		height: 80, 
		marginLeft: 5,
	}, 
	friendSection: {
		marginTop: 20, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'center', 
	},
	teman: {
		marginLeft: 15,
		fontSize: 15, 
		fontFamily: 'regular', 
		color: Colors.blue, 
	},
	logOutSection: {
		flexDirection: 'row',  
		marginTop: 10, 
		width: '100%', 
		alignItems: 'flex-end', 
		justifyContent: 'flex-end', 
	}, 
	logOut:{
		fontFamily: 'semibold', 
		fontSize: 16, 
		color: Colors.red, 
		textAlign: 'right', 
	}, 
	noRemindersContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%', // Occupy full width
		height: 100,
	},
	noRemindersText: {
		fontSize: 12,
		color: Colors.grey,
		textAlign: 'center',
		fontFamily: 'regular',
		marginTop: 10,
	},
	cartContainer: { // Remove or adjust as needed
		marginTop: 20,
		// marginLeft: 20, // Remove or adjust as needed
		// marginRight: 20, // Remove or adjust as needed
		borderRadius: 20,
		// height: '100%' // Remove or adjust as needed
	},
	cartContent: { // Remove or adjust as needed
		paddingBottom: 20,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	cart: {
		width: '90%', // Adjust width as needed
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: Colors.blue,
	},
	cart2: {
		width: '90%', // Adjust width as needed
		borderRadius: 20,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 10,
		paddingVertical: 10,
		backgroundColor: Colors.blue,
	},
	contain: { // Style contain dipindahkan dari Home.jsx
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginLeft: 10,
        gap: 5
    },
    kataKunci: { // Style kataKunci dipindahkan dari Home.jsx
        color: Colors.white,
        fontFamily: 'italic',
        fontSize: 8,
        marginTop: 3,
    },
});    
  
export default Profile;    
