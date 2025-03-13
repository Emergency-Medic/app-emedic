import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { signOut } from "firebase/auth";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { auth, db } from "@/firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserData from '@/hooks/useUserData';
import LastReadArticle from '@/components/cards/LastReadArticle';
import ProgressBar from '@/components/ProgressBar';
import useLastRead from '@/hooks/useLastRead';
import { truncateDescription } from '@/utils/truncateDescription';

const Profile = ({ modalVisible, setModalVisible }) => {
  const router = useRouter();
  const { name, username, completedQuizzes } = useUserData();
  const progress = Math.round(((completedQuizzes?.length ?? 0)/13)*100);
  const { lastReadArticle, modalHeight, loadLastRead, handleArticlePress } = useLastRead();

  useEffect(() => {
    loadLastRead();
  }, [loadLastRead]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/MenuAwal');
    }).catch((error) => {
      console.log(error);
    });
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
                  <MaterialIcons name="person-outline" size={14} color={Colors.grey} />
                </View>
                <Text style={styles.userName}>{name}</Text>
              </View>
              <AntDesign name="right" size={15} color={Colors.blue} />
            </TouchableOpacity>

            {/* Progress Section */}
            <ProgressBar progress={progress} />

            {/* Last Read */}
            <View style={styles.bookmarkContainer}>
              <Text style={styles.eMedicId}>Terakhir Dikunjungi</Text>
              <ScrollView style={{ marginTop: 10 }} contentContainerStyle={{ alignItems: 'center' }}>
                <LastReadArticle article={lastReadArticle} onPress={handleArticlePress} />
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
    textSection: { // Style textSection dipindahkan dari Home.jsx
        marginLeft: 5,
        justifyContent: 'flex-start',
        marginTop: 5,
        width: 214,
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
