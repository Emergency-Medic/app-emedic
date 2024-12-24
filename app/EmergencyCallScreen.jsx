import React, {useState} from "react";
import {Alert, Modal, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'; 
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
<<<<<<< HEAD

=======
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
>>>>>>> 5f110342f95b7bd4d33859b4af58dfbaefe8d65f

const EmergencyCallScreen = () => {
  const router = useRouter();
  return(
    <View style={styles.container}> 
    <StatusBar style='dark' translucent={true}/>
      <View style={styles.header}>
        {/* Profile */}
        <View style={styles.profileSection}>
          {/* Foto */}
          <View style={styles.profileIcon}>
            <MaterialIcons name="person-outline" size={18} color="#6C6C6C" />
          </View>
          {/* Keterangan profile */}
          <View style={styles.profileText}> 
            <Text style={styles.name}>
              Natasya Fernanda
            </Text>
            <Text style={styles.role}>
              Pemilik
            </Text>          
          </View>  
        </View>
        {/* Location */}
        <View style={styles.locationSection}> 
          <View style={styles.locationIcon}> 
            <Entypo name="location-pin" size={16} color="#A8201A" fontWeight='bold'/>
          </View>
          {/* Keterangan Lokasi */}
          <View style={styles.locationText}>
              <Text style={styles.location}>
                Sentul Circuit
              </Text>
              <Text styles={styles.locationInfo}>
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
        <TouchableOpacity style={styles.emergencyButton}> 
          <View style={styles.circle}> 
            <Foundation name="telephone" size={100} color="#FFFFFF" style={styles.callIcon} />
          </View>
        </TouchableOpacity>
      </View>
      {/* Warning Section*/}
      <View style={styles.warningContainer}> 
        <View style ={styles.warningIcon}>
          <AntDesign name="warning" size={16} color="#A8201A" />
        </View>
        <Text style={styles.warningText}>
          Peringatan
        </Text>
      </View>
      <Text style={styles.description}>
        Penekanan tombol hanya dipergunakan untuk situasi darurat seperti A, B, C, dan D.
      </Text>
      {/* Cancel Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.buttonContainer}>
        <Text style={styles.cancelText}> 
          Batal
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  conitainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF',
  },
  header : {
    marginTop: 20, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'White',
    alignItems: 'center',
    padding: 32,
    gap: 20, 
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // elevation: 4,
  }, 
  profileSection: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    backgroundColor: '#D9D9D9',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  profileText: {
    marginLeft: 16,
  },
  name: {
    fontFamily: 'semibold',
    fontSize: 14,
    color: '#A8201A',
  },
  role: {
    fontSize: 12,
    fontFamily: 'light',
    color: '#29335C',
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
    color: '#A8201A',
  },
  locationInfo: {
    fontSize: 12,
    fontFamily: 'light',
    color: '#29335C',
    textAlign: 'right',
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
    color: '#6C6C6C', 
    marginBottom: 42,
  },
  emergencyButton: {
    width: 250,
    height: 250,
    borderRadius: 360,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 43,
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  circle: {
    width: 210,
    height: 210,
    borderRadius: 360,
    backgroundColor: '#A82828',
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
    justifyContent: 'center', 
    textAlign: 'left',
    marginLeft:30, 
    marginBottom: 8, 
    padding: 8,
  },
  warningIcon: {
    marginRight: 10, 
  },
  warningText: {
    color: '#A8201A',
    fontSize: 14,
    fontFamily: 'semibold',
  },
  description: {
    color: '#29335C',
    fontFamily: 'semibold',
    fontSize: 12, 
    marginLeft: 35, 
    marginRight: 35, 
    marginBottom: 70,
    gap: 35,
  },
  buttonContainer: { 
    width: 300, 
    height: 48, 
    borderRadius: 30, 
    backgroundColor: '#A8201A',  
  }, 
  cancelText:{
    color: '#FFF', 
    fontSize: 16, 
    fontFamily: 'bold', 
  }
});

export default EmergencyCallScreen; 