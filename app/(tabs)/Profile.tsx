import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';    
import { Colors } from '@/constants/Colors';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebaseConfig";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


interface ProfileProps {  
  modalVisible: boolean;  
  setModalVisible: (visible: boolean) => void;  
}  
  
const Profile: React.FC<ProfileProps> = ({ modalVisible, setModalVisible }) => {    
	const router = useRouter();
	const handleSignOut = () => {
		signOut(auth).then(() => {
			router.replace('/MenuAwal')
		}).catch((error) => {
			console.log(error);
		})
	}
	const [name, setName] = useState('')
	
	  useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
		  console.log(user)
		  if (user) {
			console.log(user.uid)
			try {
			  const userDocRef = doc(db, 'users', user.uid)
			  const userDocSnap = await getDoc(userDocRef)
			  if (userDocSnap.exists()) {
				setName(`${userDocSnap.data().firstName} ${userDocSnap.data().lastName}`);
			  } else {
				console.log("User document not found")
				setName('Guest')
			  }
			} catch (error) {
			  console.error(error)
			  setName('Guest')
			}
		  } else {
			setName('')
		  }
		})
		return () => unsubscribe();
	  }, [])
	return (    
		<Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
			<TouchableWithoutFeedback onPressOut={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>    
					<View style={styles.modalContent}>  
						{/* Header */}
						<View style={styles.header}>
							<Text style={styles.eMedicId}>E Medic ID</Text>
							<View style={styles.idCircle}> 
								<Text style={styles.userId}>NF92312423</Text>
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
								<Text style={styles.persentage}>0%</Text>
							</View>
							<View style={styles.progresBar}>
								<View style={styles.bar}>
								</View> 
							</View>
						</View> 
						
						{/* Bookmark  */}
						<View style={styles.bookmarkContainer}> 
							<Image source={require( '../../assets/images/Rectangle 151.png')} style={styles.image}></Image>
							<Image source={require( '../../assets/images/Rectangle 151.png')} style={styles.image}></Image>
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
	height: 401,     
    padding: 20,    
    backgroundColor: '#fff',    
    borderRadius: 10,  
	alignItems: 'flex-start', 
	marginTop: 50,
  },    
  header: {
	flexDirection: 'row', 
	alignItems: 'center',
	justifyContent: 'center'
  },
  eMedicId: {
	fontFamily: 'regular',
	padding: 20,  
    fontSize: 10,    
    color: Colors.blue,    
  },    
  idCircle: {
	width: 189, 
	height: 32, 
	borderRadius: 60,
	backgroundColor: Colors.white, 
	alignItems: 'center', 
	justifyContent: 'center',
	elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10, 
  },
  userId: {    
    fontSize: 14,    
    color: Colors.blue,    
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
	elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10, 
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
	elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10, 
  }, 
  bar: {
	width: 100, 
	height: 2.9,
	backgroundColor: Colors.red, 
	borderRadius: 20, 
  },
  bookmarkContainer:{
	flexDirection: 'row', 
	marginTop: 5, 
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

});    
  
export default Profile;    
