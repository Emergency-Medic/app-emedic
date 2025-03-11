import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import call from 'react-native-phone-call'; 
import { Colors } from '@/constants/Colors';
import { auth, db } from '@/firebaseConfig'
import { doc, onSnapshot, getDocs, collection, getDoc } from "firebase/firestore";
import useLocation from "@/hooks/useLocation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import EmergencyButton from "@/components/buttons/EmergencyButton";
import CustomModal from '@/components/modals/CustomModal'
import useUserData from '@/hooks/useUserData'
import { sendEmergencyNotification } from "@/services/emergencyService";
import { makePhoneCall } from "@/utils/callUtills";


const Emergency = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const { user, name } = useUserData(); 
  const { latitude, longitude, city, errorMsg, formattedAddress } = useLocation();

  return (
    <ScrollView style={styles.container}>
      <StatusBar style='dark' translucent={true} />
      <View style={styles.header}>
        {/* Profile */}
        <View style={styles.profileSection}>
          {/* Foto */}
          <TouchableOpacity onPress={() => router.push('/screens/profile/EditProfile')} style={styles.profileIcon}>
            <MaterialIcons name="person-outline" size={18} color={Colors.grey} />
          </TouchableOpacity>
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
              {city || "Loading..."}
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
        <EmergencyButton onPress={() => setModalVisible(true)}/>
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
      
      {/* Modal Section */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Peringatan"
        question="Siapa yang berada dalam keadaan darurat saat ini?"
        confirmText="Saya"
        cancelText="Orang lain"
        onConfirm={() => {
          sendEmergencyNotification(user.uid, { latitude, longitude, formattedAddress });
          setModalVisible(false);
          setModalVisible2(true);
        }}
      />
      {/* Modal 2 Section */}
      <CustomModal
        visible={modalVisible2}
        onClose={() => setModalVisible2(false)}
        title="Peringatan"
        question="Yakin lanjutkan panggilan?"
        confirmText="Ya"
        cancelText="Tidak"
        onConfirm={makePhoneCall}
      />
    </ScrollView>
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
    flexDirection: 'column', // Menumpuk teks secara vertikal
    alignItems: 'flex-end',
    flexDirection: 'column', // Menumpuk teks secara vertikal
    alignItems: 'flex-end',
  },
  location: {
    fontSize: 16,
    fontFamily: 'italic',
    color: Colors.red,
    flexWrap: 'wrap', // Memungkinkan teks berpindah baris
    width : 150,
    textAlign: 'right', // Perataan kanan
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
});

export default Emergency; 