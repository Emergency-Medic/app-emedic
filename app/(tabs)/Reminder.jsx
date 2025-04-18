import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { Calendar, DateData } from "react-native-calendars";
import { Card, IconButton, Button } from "react-native-paper";
import BackButton from "@/components/BackButton";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";
import MakeSchedule from '../screens/reminder/MakeSchedule'
import { collection, query, where, getDoc, Timestamp, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import moment from 'moment-timezone';
import * as Notifications from 'expo-notifications';
import useReminders from "@/hooks/useReminders";
import { deleteNotifications } from "@/utils/notificationUtils";

export default function MedicationReminder() {
  const [selectedType, setSelectedType] = useState('Tablet'); // State untuk jenis obat
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const today = new Date().toISOString().split('T')[0]; // ini buat format tanggal
  const reminders = useReminders(selectedDate);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [activeReminderId, setActiveReminderId] = useState(null);
  
  const handleDots = (reminder) => {
    setEditingReminder(reminder);
    setModalVisible(true);
  };

  const handleEdit = (item) => {
    router.push(`/screens/reminder/EditSchedule?id=${item.id}`);
};

  const handleDelete = async (id) => {
    try {
        const scheduleDoc = await getDoc(doc(db, "schedules", id)); // Ambil dokumen
        if (!scheduleDoc.exists()) {
            Alert.alert("Error", "Reminder tidak ditemukan.");
            return;
        }

        const scheduleData = scheduleDoc.data();
        const notificationIds = scheduleData.notificationIds || [];

        // Hapus dokumen dari database
        await deleteDoc(doc(db, "schedules", id));

        await deleteNotifications(scheduleData.notificationIds || []);

        setModalVisible(false);
        Alert.alert("Sukses", "Reminder berhasil dihapus!");
    } catch (error) {
        console.error("Error deleting reminder:", error);
        Alert.alert("Error", "Gagal menghapus reminder. Silakan coba lagi.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark' translucent={true} />
      {/* <BackButton color={Colors.red} top={44} left={10} /> */}
      <View style={styles.header1}>
        <Text style={styles.title}>
          {`Hari ini, ${new Date().toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
          })}`}
        </Text>
      </View>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{ [selectedDate]: { selected: true, marked: true } }}
        style={{ fontFamily: 'regular' }} // masih belum bisa
      />
      <View style={styles.headerPengingat}>
        <Text style={styles.header2}>Pengingat Anda</Text>
        <TouchableOpacity onPress={() => {router.push('../screens/reminder/MakeSchedule')}}>
          <Text style={styles.addText}>Tambah Baru</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={reminders}
        style={styles.remindersCOntainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          
          <TouchableOpacity>
            <View style={styles.rowContainer}>
              <View>
                {item.reminders.map((time, index) => (
                  <Text key={index} style={styles.timeText}>{time}</Text>
                ))}
              </View>
              <Card style={[styles.card, activeReminderId === item.id && styles.activeCard]}>
                <Card.Title
                  left={(props) => {
                    let iconName = 'pill'; // Ikon default
        
                    if (item.type === 'Sirup') {
                      iconName = 'tint'; // Ikon untuk sirup
                    } else if (item.type === 'Tetes') {
                      iconName = 'eye-dropper'; // Ikon untuk tetes
                    } else if (item.type === 'Injeksi') {
                      iconName = 'syringe'; // Ikon untuk injeksi
                    } else if(item.type === 'Tablet'){
                      iconName = 'capsules'
                    } else if (item.type === 'Salep') {
                      iconName = 'flask'
                    }
        
                    return (
                      <IconButton
                        {...props}
                        icon={(iconProps) => (
                          <FontAwesome5
                          // name = "heart"
                            name={iconName}
                            {...iconProps}
                            color={activeReminderId === item.id ? Colors.white : Colors.blue}
                            
                          />
                        )}
                      />
                    );
                  }}
                  title={item.medName}
                  titleStyle={[styles.titleCard, activeReminderId === item.id && styles.activeTitle]}

                  subtitle={`${item.dose} ${item.doseType}`}
                  subtitleStyle={[styles.subtitle, activeReminderId === item.id && styles.activeSubtitle]}
                  right={(props) => (
                    <Entypo
                      {...props}
                      onPress={() => handleDots(item)}
                      name='dots-three-vertical'
                      size={15}
                      color={activeReminderId === item.id ? Colors.white : Colors.red}
                    />
                  )}
                />
                {activeReminderId === item.id ? (
                  <View style={styles.activeSection}>
                    <View style={styles.activeRow}>
                      <Text style={styles.activeText}>Sudah minum?</Text>
                      <Button mode='contained' onPress={() => setActiveReminderId(null)} style={styles.activeButton}>
                        <Text style={styles.activeTextButton}>Ya</Text>
                      </Button>
                    </View>
                  </View>
                ) : null}
              </Card>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} transparent animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button onPress={() => editingReminder ? handleEdit(editingReminder) : null}>
                <Text style={styles.buttonText}>Edit</Text>
            </Button>
            <Button onPress={() => editingReminder?.id ? handleDelete(editingReminder.id) : null}
            ><Text style={styles.buttonText}>Hapus</Text></Button>
            <Button onPress={() => setModalVisible(false)}><Text style={styles.buttonText}>Batal</Text></Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  header1: { 
    marginTop: 35, 
    // marginLeft:10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16 
  },
  header2: { 
    fontSize: 20, 
    fontFamily: 'bold', 
    marginTop: 20, 
    color: Colors.blue 
  },
  headerPengingat: {
    // flex: 1,
    flexDirection: 'row', 
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center'
  },
  addText: { 
    marginTop: 10, 
    fontFamily: 'bold', 
    color: Colors.red 
  },
  title: { 
    fontSize: 18, 
    color: Colors.blue, 
    fontFamily: 'bold' 
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContent: { 
    width: 300, 
    padding: 20, 
    backgroundColor: 'white', 
    borderRadius: 10 ,
  },
  input: { 
    borderBottomWidth: 1, 
    marginBottom: 10, 
    padding: 5 
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'bold',
    color: Colors.blue,
    marginRight: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    flex: 1,
    padding: 2,
    borderColor: '#E0E0E0',
    borderWidth: 1
  },
  activeCard: {
    backgroundColor: Colors.red, 
  },
  titleCard: {
    fontSize: 16,
    fontFamily: 'bold',
    color: Colors.red,
    marginLeft: 20,
  },
  activeTitle: {
    color: Colors.white,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#6C6C6C',
    marginLeft: 20
  },
  activeSubtitle: {
    color: Colors.white,
  },
  activeSection: {
    marginTop: 5,
    paddingHorizontal: 10,
  },
  activeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  activeText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'white',
    marginRight: 10, 
  },
  activeButton: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  activeTextButton: {
    fontSize: 12,
    color: Colors.red,
    fontFamily: 'bold'
  },
  buttonText: {
    fontFamily: 'bold',
    color: Colors.blue
  },
  remindersCOntainer: {
    marginVertical: 10,
  }
});