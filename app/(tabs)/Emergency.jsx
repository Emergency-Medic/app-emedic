import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import call from 'react-native-phone-call'; 
import { Colors } from '@/constants/Colors';
import { auth, db } from '@/firebaseConfig'
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';

const Emergency = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [name, setName] = useState(false);

  const makePhoneCall = () => {
    const args = {
      number: '112',
      prompt: false,
      skipCanOpen: true
    }

    call(args).catch(console.error);
  };

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        console.log(user)
        if (user) {
          console.log(user.uid)
          try {
            const userDocRef = doc(db, 'users', user.uid)
            const userDocSnap = await getDoc(userDocRef)
            if (userDocSnap.exists()) {
              setName(userDocSnap.data().firstName)
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
    <View style={styles.container}>
      <StatusBar style='dark' translucent={true} />
      <View style={styles.header}>
        {/* Profile */}
        <View style={styles.profileSection}>
          {/* Foto */}
          <View style={styles.profileIcon}>
            <MaterialIcons name="person-outline" size={18} color={Colors.grey} />
          </View>
          {/* Keterangan profile */}
          <View style={styles.profileText}>
            <Text style={styles.name}>
              {name}
            </Text>
            <Text style={styles.role}>
              Pemilik
            </Text>
          </View>
        </View>
        {/* Location */}
        <View style={styles.locationSection}>
          <View style={styles.locationIcon}>
            <Entypo name="location-pin" size={16} color={Colors.red} fontWeight='bold' />
          </View>
          {/* Keterangan Lokasi */}
          <View style={styles.locationText}>
            <Text style={styles.location}>
              Sentul Circuit
            </Text>
            <Text style={styles.locationInfo}>
              Lokasi terkini
            </Text>
          </View>
        </View>
      </View>

      {/* Emergency Call Section */}
      <View style={styles.emergencySection}>
        <Text style={styles.emergencyText}>Panggilan Darurat</Text>
        <Text style={styles.emergencySubtitle}>
          Hanya gunakan saat keadaan berbahaya.
        </Text>

        {/* Emergency Button */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.emergencyButton}>
          <View style={styles.circle}>
            <Foundation name="telephone" size={100} color={Colors.white} style={styles.callIcon} />
          </View>
        </TouchableOpacity>
      </View>
      {/* Warning Section*/}
      <View style={styles.warningContainer}>
        <View style={styles.warningIcon}>
          <AntDesign name="warning" size={16} color={Colors.red} />
        </View>
        <Text style={styles.warningText}>
          Peringatan
        </Text>
      </View>
      <Text style={styles.description}>
        Penekanan tombol hanya dipergunakan untuk situasi darurat seperti A, B, C, dan D.
      </Text>
      {/* Cancel Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.button}>
          <Text style={styles.cancelText}>
            Batal
          </Text>
        </TouchableOpacity>
      </View>
      {/* Modal Section */}
      <Modal transparent={true} visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCardContent}>
                <View style={styles.modalWarningContainer}>
                  <View style={styles.modalWarningIcon}>
                    <AntDesign name="warning" size={16} color={Colors.red} />
                  </View>
                  <Text style={styles.modalWarningText}>
                    Peringatan
                  </Text>
                </View>
                <Text style={styles.modalWarningQuestion}>
                  Siapa yang berada dalam keadaan darurat saat ini?
                </Text>
                <View style={styles.answerContent}>
                  <TouchableOpacity style={styles.meButton} onPress={() => setModalVisible2(true)}>
                    <Text style={styles.meText} >
                      Saya
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.otherButton} onPress={() => setModalVisible2(true)}>
                    <Text style={styles.otherText}>
                      Orang lain
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Modal 2 Section */}
      <Modal transparent={true} visible={modalVisible2} animationType="fade" onRequestClose={() => setModalVisible2(false)}>
        <TouchableWithoutFeedback onPressOut={() => setModalVisible2(false)}>
          <View style={styles.modalContainer2}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCardContent2}>
                <View style={styles.modalWarningContainer2}>
                  <View style={styles.modalWarningIcon2}>
                    <AntDesign name="warning" size={16} color={Colors.red} />
                  </View>
                  <Text style={styles.modalWarningText2}>
                    Peringatan
                  </Text>
                </View>
                <Text style={styles.modalWarningQuestion2}>
                  Yakin lanjutkan panggilan?
                </Text>
                <View style={styles.answerContent2}>
                  <TouchableOpacity style={styles.meButton2} onPress={makePhoneCall}>
                    <Text style={styles.yaText}>
                      Ya
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.otherButton2} onPress={() => setModalVisible2(false)}>
                    <Text style={styles.tidakText}>
                      Tidak
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'semibold',
    fontSize: 14,
    color: Colors.red,
  },
  role: {
    fontSize: 12,
    fontFamily: 'light',
    color: Colors.blue,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    textAlign: 'right',
  },
  locationIcon: {
    marginRight: 7,
  },
  locationText: {
    marginRight: 16,
  },
  location: {
    fontSize: 16,
    fontFamily: 'italic',
    color: Colors.red,
  },
  locationInfo: {
    fontSize: 12,
    color: Colors.blue,
    textAlign: 'right',
    fontFamily: 'light',
  },
  emergencySection: {
    alignItems: 'center',
    marginTop: 32,
  },
  emergencyText: {
    fontSize: 30,
    fontFamily: 'bold',
    color: 'Black',
    padding: 9,
  },
  emergencySubtitle: {
    fontFamily: 'italic',
    color: Colors.grey,
    marginBottom: 42,
  },
  emergencyButton: {
    width: 250,
    height: 250,
    borderRadius: 360,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 43,
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  circle: {
    width: 210,
    height: 210,
    borderRadius: 360,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center'
  },
  callIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'left',
    marginLeft: 30,
    marginBottom: 8,
    padding: 8,
  },
  warningIcon: {
    marginRight: 10,
  },
  warningText: {
    color: Colors.red,
    fontSize: 14,
    fontFamily: 'semibold',
  },
  description: {
    color: Colors.blue,
    fontFamily: 'semibold',
    fontSize: 12,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 70,
    gap: 35,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    height: 48,
    borderRadius: 30,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparencyGrey,
  },
  modalCardContent: {
    width: '85%',
    paddingHorizontal: 37,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderRadius: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  modalWarningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  modalWarningIcon: {
    marginRight: 10,
  },
  modalWarningText: {
    color: Colors.red,
    fontSize: 14,
    fontFamily: 'semibold',
  },
  modalWarningQuestion: {
    fontFamily: 'semibold',
    fontSize: 14,
    color: Colors.blue,
    paddingHorizontal: 30,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 22
  },
  answerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    paddingHorizontal: 34,
    marginBottom: 4
  },
  meButton: {
    paddingHorizontal: 34,
    paddingVertical: 7,
    backgroundColor: Colors.red,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  meText: {
    color: Colors.white,
    fontFamily: 'semibold',
    fontSize: 14,
  },
  otherButton: {
    width: 129,
    height: 33,
    paddingVertical: 7,
    backgroundColor: Colors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  otherText: {
    color: Colors.grey,
    fontFamily: 'semibold',
    fontSize: 14,
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparencyGrey,
  },
  modalCardContent2: {
    paddingHorizontal: 37,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderRadius: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
  modalWarningContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  modalWarningIcon2: {
    marginRight: 10,
  },
  modalWarningText2: {
    color: Colors.red,
    fontSize: 14,
    fontFamily: 'semibold',
  },
  modalWarningQuestion2: {
    fontFamily: 'semibold',
    fontSize: 14,
    color: Colors.blue,
    paddingHorizontal: 30,
    textAlign: 'center',
    marginTop: 23,
    marginBottom: 33
  },
  answerContent2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 4
  },
  meButton2: {
    paddingHorizontal: 34,
    paddingVertical: 7,
    backgroundColor: Colors.red,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  yaText: {
    color: Colors.white,
    fontFamily: 'semibold',
    fontSize: 14,
  },
  otherButton2: {
    paddingHorizontal: 34,
    paddingVertical: 7,
    backgroundColor: Colors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  tidakText: {
    color: Colors.grey,
    fontFamily: 'semibold',
    fontSize: 14,
  },
});

export default Emergency; 