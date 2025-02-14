import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { Calendar, DateData } from "react-native-calendars";
import { Card, IconButton, Button } from "react-native-paper";
import BackButton from "@/components/BackButton";
import Entypo from "@expo/vector-icons/Entypo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MakeSchedule from '../screens/reminder/MakeSchedule'

type Reminder = {
  id: number;
  time: string;
  name: string;
  dose: string;
};

type RemindersType = {
  [key: string]: Reminder[];
};

export default function MedicationReminder() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const today = new Date().toISOString().split('T')[0]; // ini buat format tanggal

const [reminders, setReminders] = useState<RemindersType>({
    [today]: [
      { id: 1, time: '08:00', name: 'Obat xxx', dose: '1 sct (50 mg)' },
      { id: 2, time: '12:00', name: 'Obat xxx', dose: '1 sct (50 mg)' },
    ],
});


  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [activeReminderId, setActiveReminderId] = useState<number | null>(null);

  const handleEdit = (reminder: Reminder): void => {
    setEditingReminder(reminder);
    setModalVisible(true);
  };

  const saveEdit = (): void => {
    if (editingReminder) {
      setReminders((prev) => ({
        ...prev,
        [selectedDate]: prev[selectedDate]?.map((item) =>
          item.id === editingReminder.id ? editingReminder : item
        ) || [],
      }));
      setModalVisible(false);
      setEditingReminder(null);
    }
  };

  const handleDelete = (id: number): void => {
    setReminders((prev) => ({
      ...prev,
      [selectedDate]: prev[selectedDate]?.filter((item) => item.id !== id) || [],
    }));
  };

  const toggleActive = (id: number): void => {
    setActiveReminderId(activeReminderId === id ? null : id);
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
        onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
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
        data={reminders[selectedDate] || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleActive(item.id)}>
            <View style={styles.rowContainer}>
              <Text style={styles.timeText}>{item.time}</Text>
              <Card style={[styles.card, activeReminderId === item.id && styles.activeCard]}>
              <Card.Title
                left={(props) => (
                  <IconButton
                    {...props}
                    icon={(iconProps) => <MaterialCommunityIcons name='pill' {...iconProps} color={activeReminderId === item.id ? Colors.white : Colors.blue} />}
                  />
                )}
                title={item.name}
                titleStyle={[styles.titleCard, activeReminderId === item.id && styles.activeTitle]}
                subtitle={`${item.dose}`}
                subtitleStyle={[styles.subtitle, activeReminderId === item.id && styles.activeSubtitle]}
                right={(props) => (
                  <Entypo
                    {...props}
                    onPress={() => handleEdit(item)}
                    name='dots-three-vertical'
                    size={15}
                    color={activeReminderId === item.id ? Colors.white : Colors.red}
                  />
                )}
              />
                {activeReminderId === item.id && (
                  <View style={styles.activeSection}>
                    <View style={styles.activeRow}>
                      <Text style={styles.activeText}>Sudah minum?</Text>
                      <Button mode='contained' onPress={() => setActiveReminderId(null)} style={styles.activeButton}>
                        <Text style={styles.activeTextButton}>Ya</Text>
                      </Button>
                    </View>
                  </View>
                )}
              </Card>
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal visible={modalVisible} transparent animationType='slide'>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Button onPress={() => router.push('../screens/reminder/EditSchedule')}><Text style={styles.buttonText}>Edit</Text></Button>
            <Button onPress={() => handleDelete(editingReminder?.id!)}><Text style={styles.buttonText}>Hapus</Text></Button>
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
    flex: 1,
    flexDirection: 'row', 
    marginTop: 5,
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
  },
  activeTitle: {
    color: Colors.white,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'light',
    color: '#6C6C6C',
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
  }
});