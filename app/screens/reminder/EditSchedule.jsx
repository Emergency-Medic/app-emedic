// coba tambah
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { auth, db } from '@/firebaseConfig';
import { doc, setDoc, collection, addDoc, getDoc, Timestamp } from 'firebase/firestore';
import { Platform } from 'react-native';
import { useLocalSearchParams  } from 'expo-router';
import { useRouter } from 'expo-router';
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';

const EditSchedule = () => {
    const params = useLocalSearchParams();
    const { id: scheduleId } = params
    const [medName, setMedName] = useState('');
        const [dose, setDose] = useState(1);
        const [frequency, setFrequency] = useState(1); //Default frekuensi 1
        // date and time
        const [startDate, setStartDate] = useState(new Date()); // Gunakan date object
        const [endDate, setEndDate] = useState(new Date()); // Gunakan date object
        const [showStartDatePicker, setShowStartDatePicker] = useState(false);
        const [showEndDatePicker, setShowEndDatePicker] = useState(false);
        // 
        const [selectedType, setSelectedType] = useState('Tablet'); // State untuk jenis obat
        const [forever, setForever] = useState(false); // State untuk opsi selamanya
        const [reminders, setReminders] = useState([]);
        const [notificationIds, setNotificationIds] = useState([]);
        const [time, setTime] = useState(new Date());
        const [showTimePicker, setShowTimePicker] = useState(false);
        const [description, setDescription] = useState('');
        const [checkedItems, setCheckedItems] = useState([]);
        const [doseType, setDoseType] = useState('tablet');
        const router = useRouter();


    useEffect(() => {
        const fetchSchedule = async () => {
            if (scheduleId) {
                try {
                    const docRef = doc(db, "schedules", scheduleId);
                    const docSnap = await getDoc(docRef);
                    console.log(docSnap)
                    if (docSnap.exists()) { 
                        const data = docSnap.data();
                        setMedName(data.medName);
                        console.log(medName)
                        setDose(data.dose);
                        setFrequency(data.frequency);
                        setStartDate(data.startDate.toDate()); // Ubah Timestamp ke Date
                        setEndDate(data.endDate ? data.endDate.toDate() : new Date()); // Ubah Timestamp ke Date
                        setSelectedType(data.type);
                        setForever(data.forever);
                        setReminders(data.reminders);
                        setDescription(data.description);
                        setDoseType(data.doseType);
                        setNotificationIds(data.notificationIds)
                        setReminders(data.reminders);
                        console.log(notificationIds)
                    } else {
                        Alert.alert("Error", "Jadwal tidak ditemukan.");
                    }
                } catch (error) {
                    console.error("Error fetching schedule:", error);
                    Alert.alert("Error", "Gagal mengambil data jadwal.");
                }
            }
        };

        fetchSchedule();
    }, [scheduleId]);

    const addReminder = () => {
        if (time) {
            const formattedTime = time.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: false  // Pastikan format 24 jam
            });
    
            setReminders([...reminders, formattedTime]);
            setTime(new Date());
        }
    };

    const handleDeleteReminder = (indexToRemove) => {
        setReminders(reminders.filter((_, index) => index !== indexToRemove));
    };


    const onChangeStartDate = (event, selectedDate) => {
        console.log("onChangeStartDate called", { event, selectedDate });
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(Platform.OS === 'ios');
        // setStartDate(currentDate);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
        setShowStartDatePicker(false);
    };

    const onChangeEndDate = (event, selectedDate) => {
        console.log("onChangeEndDate called", { event, selectedDate });
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(Platform.OS === 'ios');
        // setEndDate(currentDate);
        if (selectedDate) {
            setEndDate(selectedDate);
        }
        setShowEndDatePicker(false);
    };

    const onChangeTime = (event, selectedTime) => {
        console.log("onChangeTime called", { event, selectedTime });
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
        setShowTimePicker(false);
        };

        const saveSchedule = async () => {
            try {
                if (!medName || !dose || !frequency || !reminders.length) {
                    Alert.alert("Error", "Mohon lengkapi semua data obat dan pengingat.");
                    return;
                }
        
                console.log("Sebelum hapus:", notificationIds);
        
                // Gunakan variabel lokal untuk menyimpan ID yang tersisa setelah dihapus
                let updatedNotificationIds = [...notificationIds];
        
                await Promise.all(
                    notificationIds.map(async (notificationId) => {
                        try {
                            await Notifications.cancelScheduledNotificationAsync(notificationId);
                            updatedNotificationIds = updatedNotificationIds.filter(id => id !== notificationId);
                        } catch (error) {
                            console.error("Gagal menghapus notifikasi:", notificationId, error);
                        }
                    })
                );
        
                // Setelah semua notifikasi dihapus, update state dengan array yang sudah diperbarui
                setNotificationIds(updatedNotificationIds);
                console.log("Setelah hapus:", updatedNotificationIds);
        
                const startDateTimestamp = Timestamp.fromDate(startDate);
                const endDateTimestamp = forever ? null : Timestamp.fromDate(endDate);
                const now = new Date();
        
                let newNotificationIds = []; // Gunakan array baru untuk menyimpan ID baru
        
                for (const reminderTime of reminders) {
                    const [hours, minutes] = reminderTime.split(":").map(Number);
                    startDate.setHours(hours, minutes, 0, 0);
                    endDate.setHours(hours, minutes, 0, 0);
        
                    const content = {
                        title: "Reminder to take your meds",
                        body: `Don't forget to take ${medName} (${dose} ${doseType})!`,
                        sound: "default",
                        android: {
                            channelId: 'default'
                        }
                    };
        
                    if (forever) {
                        const notification = await Notifications.scheduleNotificationAsync({
                            content,
                            trigger: {
                                type: Notifications.SchedulableTriggerInputTypes.DAILY,
                                hour: hours,
                                minute: minutes,
                            },
                        });
                        newNotificationIds.push(notification);
                    } else {
                        let currentReminderDate = new Date(startDate);
        
                        while (currentReminderDate <= endDate) {
                            currentReminderDate.setHours(hours, minutes, 0, 0);
                            const timeInterval = ((currentReminderDate.getTime() - now.getTime()) / 1000);
                            console.log('Time Interval: ' + timeInterval)
                            if (timeInterval < 0) {
                                currentReminderDate.setDate(currentReminderDate.getDate() + 1);
                                continue;
                            }
                            const notification = await Notifications.scheduleNotificationAsync({
                                content,
                                trigger: {
                                    type: Notifications.SchedulableTriggerInputTypes.DATE,
                                    date: currentReminderDate
                                },
                            });
        
                            newNotificationIds.push(notification);
                            currentReminderDate.setDate(currentReminderDate.getDate() + 1);
                        }
                    }
                }
        
                // Setelah semua notifikasi baru dibuat, update state
                setNotificationIds(newNotificationIds);
                console.log("Notifikasi baru:", newNotificationIds);
        
                const dataToSave = {
                    userId: auth.currentUser.uid,
                    medName,
                    dose,
                    frequency,
                    type: selectedType,
                    startDate: startDateTimestamp,
                    endDate: endDateTimestamp,
                    forever,
                    reminders,
                    description,
                    doseType,
                    notificationIds: newNotificationIds, // Pastikan data yang disimpan adalah array baru
                };
        
                console.log("Data to save:", dataToSave);
        
                if (scheduleId) {
                    const docRef = doc(db, "schedules", scheduleId);
                    await setDoc(docRef, dataToSave);
                    Alert.alert("Sukses", "Jadwal berhasil diperbarui!");
                }
        
                // Reset state setelah disimpan
                setMedName('');
                setDose(1);
                setFrequency(1);
                setStartDate(new Date());
                setEndDate(new Date());
                setSelectedType('Tablet');
                setForever(false);
                setReminders([]);
                setTime(new Date());
                setDescription('');
                router.back();
            } catch (error) {
                console.error("Error saving schedule:", error);
                Alert.alert("Error", "Gagal menyimpan jadwal. Silakan coba lagi.");
            }
        };
        
    const calculateDays = () => {
        const timeDiff = endDate.getTime() - startDate.getTime();
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return Math.max(0, diffDays) + 1; // +1 untuk menghitung hari terakhir
    };

    const duration = calculateDays();
    // jes
    const toggleReminder = (index) => {
        const newReminders = [...reminders];
        newReminders[index].remindLater = !newReminders[index].remindLater;
        setReminders(newReminders);
    };

    return (
        <ScrollView 
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        >
            <View>
            <BackButton color={Colors.red} top={45} left={0}/>
            </View>
            
            <View style={styles.inContainer}>
                <Text style={styles.title}>Edit Pengingat</Text>
                <Text style={styles.label}>Nama Obat</Text>
                <TextInput 
                    style={styles.input}
                    value={medName}
                    onChangeText={setMedName}
                />
                
                <Text style={styles.label}>Jenis Obat</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
                    <TouchableOpacity
                        style={[styles.typeButton, { marginLeft: 0 }, selectedType === 'Tablet' && styles.selectedTypeButton]}
                        onPress={() => setSelectedType('Tablet')}
                    >
                        <FontAwesome5 name="capsules" size={24} color="black" /><Text>Tablet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeButton, { marginLeft: 0 }, selectedType === 'Sirup' && styles.selectedTypeButton]}
                        onPress={() => setSelectedType('Sirup')}
                    >
                        <FontAwesome5 name="tint" size={24} color="black" /><Text>Sirup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeButton, { marginLeft: 0 }, selectedType === 'Tetes' && styles.selectedTypeButton]}
                        onPress={() => setSelectedType('Tetes')}
                    >
                        <FontAwesome5 name="eye-dropper" size={24} color="black" /><Text>Tetes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeButton, { marginLeft: 0 }, selectedType === 'Injeksi' && styles.selectedTypeButton]}
                        onPress={() => setSelectedType('Injeksi')}
                    >
                        <FontAwesome5 name="syringe" size={24} color="black" /><Text>Injeksi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeButton, { marginLeft: 0 }, selectedType === 'Salep' && styles.selectedTypeButton]}
                        onPress={() => setSelectedType('Salep')}
                    >
                        <FontAwesome5 name="flask" size={24} color="black" /><Text>Salep</Text>
                    </TouchableOpacity>
                </ScrollView>
                
                <Text style={styles.label}>Dosis</Text>
                <View style={styles.doseContainer}>
                    <View style={styles.upDownContainer}>
                        <TouchableOpacity onPress={() => setDose(Math.max(1, dose - 1))} style={styles.doseButton}><Text style={styles.white}>-</Text></TouchableOpacity>
                        <Text style={styles.doseText}>{dose}</Text>
                        <TouchableOpacity onPress={() => setDose(dose + 1)} style={styles.doseButton}><Text style={styles.white}>+</Text></TouchableOpacity>
                    </View>
                    
                    {/* <Text style={styles.frequencyText2}>sdm</Text> */}
                    <TextInput
                        style={styles.doseTypeInput}
                        placeholder="sdm"
                        value={doseType}
                        onChangeText={setDoseType}
                    />
                    <View style={styles.choice}>
                    </View>

                    <View style={styles.upDownContainer}>
                        <TouchableOpacity onPress={() => setFrequency(Math.max(1, frequency - 1))} style={styles.frequencyButton}><Text style={styles.white}>-</Text></TouchableOpacity>
                        <Text style={styles.frequencyText}>{frequency}</Text>
                        <TouchableOpacity onPress={() => setFrequency(frequency + 1)} style={styles.frequencyButton}><Text style={styles.white}>+</Text></TouchableOpacity>
                    </View>
                    <Text style={styles.frequencyText2}>kali/hari</Text>
                </View>
                
                <Text style={styles.label}>Durasi Minum Obat</Text>
                <View style={styles.dateContainer}>
                    <Text style={[styles.toText, { marginLeft: 0 }]}>Dari</Text>
                    <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                        <TextInput style={styles.dateInput} value={startDate.toLocaleDateString()} editable={false} />
                    </TouchableOpacity>
                    {showStartDatePicker && (
                        <DateTimePicker
                            value={startDate}
                            mode="date"
                            is24Hour={true}
                            // display="default"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChangeStartDate}
                        />
                    )}
                    <Text style={styles.toText}>ke</Text>
                    <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                        <TextInput style={styles.dateInput} value={endDate.toLocaleDateString()} editable={false} />
                    </TouchableOpacity>
                    {showEndDatePicker && (
                        <DateTimePicker
                            value={endDate}
                            mode="date"
                            is24Hour={true}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onChangeEndDate}
                        />
                    )}
                    <Text style={styles.toText}>({duration} hari)</Text>
                </View>
                        
                <Text style={styles.or}>Atau</Text>
                <View style={styles.checkboxContainer}>
                    <Checkbox value={forever} onValueChange={setForever} color={forever ? "#A8201A" : undefined} />
                    <Text style={styles.checkboxLabelRed}>Selamanya</Text>
                </View>

                <Text style={styles.label}>Pengingat</Text>
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder="HH:MM"
                            value={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            editable={false}
                        />
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeTime}
                        />
                    )}
                    <TouchableOpacity style={styles.button} onPress={addReminder}>
                        <Text style={styles.buttonText}>Tambah</Text>
                    </TouchableOpacity>
                </View>
                <View>
                {
                        reminders.map((item, index) => (
                            <View key={index} style={styles.reminderCard}>
                                <Text style={styles.timeText}>{item}</Text>
                                <View style={styles.switchContainer}>
                                    <TouchableOpacity style={styles.checkboxContainer} onPress={() => {handleDeleteReminder(index)}}>
                                        <Feather name="trash-2" size={24} color={Colors.blue} />
                                        <Text style={styles.checkboxLabelBlue}>
                                            Hapus
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </View>

                <Text style={styles.label}>Deskripsi (Opsional)</Text>
                <TextInput style={styles.descriptionInput} placeholder="Isi dengan informasi tambahan obat" />
                
                <TouchableOpacity style={styles.saveButton} onPress={saveSchedule}>
                    <Text style={styles.saveButtonText}>Simpan</Text>
                </TouchableOpacity>
            </View>
           
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow:1,
    },
    inContainer: {
        margin: 0,
    },
    backButton: {
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        // marginTop: 5,
        gap: 7,
        alignItems: 'center'
    },
    checkboxLabelBlue: {
        // marginLeft: 5,
        fontFamily: 'semibold',
        color: '#13070C',
        fontSize: 12
    },
    checkboxLabelRed: {
        marginLeft: 5,
        fontFamily: 'semibold',
        color: '#A8201A',
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontFamily: 'bold',
        color: '#29335C',
        marginTop: 100,
    },
    label: {
        fontSize: 18,
        fontFamily: 'bold',
        marginTop: 20,
        color: '#29335C',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 20,
        marginTop: 5,
        fontFamily: 'regular',
    },
    typeScroll: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    typeButton: {
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        width: 80,
        marginHorizontal: 10,
    },
    doseContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: -85,
        // marginBottom: -85,
    },
    upDownContainer:{
        backgroundColor: '#A8201A',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    },
    doseButton: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        width: 30,
        alignItems: 'center',
        borderColor: 'transparent'
    },
    white: {
        color: '#fff',
    },
    frequencyButton: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
        width: 30,
        alignItems: 'center',
        borderColor: 'transparent',
    },
    doseText: {
        marginHorizontal: 10,
        color: '#fff',
        fontSize: 12,
    },
    frequencyText: {
        marginHorizontal: 10,
        color: '#fff',
        fontFamily: 'regular',
        fontSize: 12,
    },
    frequencyText2: {
        marginHorizontal: 10,
        fontFamily: 'regular',
        fontSize: 14,
    },
    toText: {
        marginHorizontal: 10,
        fontFamily: 'regular',
        fontSize: 14,
    },
    choice: {
        marginHorizontal: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        borderRadius: 15,
        width: 100,
        textAlign: 'center',
        fontSize: 13,
    },
    reminderText: {
        fontSize: 16,
        marginVertical: 5,
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginTop: 5,
        height: 80,
        textAlignVertical: 'top',
        fontFamily: 'regular',
    },
    saveButton: {
        backgroundColor: '#A8201A',
        padding: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'semibold',
    },
    or: {
        fontSize: 12,
        marginTop: 5,
        marginBottom: 5,
    },
    inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  reminderCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  timeText: {
    fontSize: 18,
    fontFamily: "semibold",
    color: "#13070C",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },
  button: {
    backgroundColor: '#A8201A',
    padding: 10,
    borderRadius: 20,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'semibold',
    fontSize: 12,
  },
  selectedTypeButton: {
   borderColor: Colors.red,
   borderWidth: 1
  },
  doseTypeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginTop: 5,
    fontFamily: 'regular',
    width: 60,
    height: 33,
    marginLeft: 10,
    paddingHorizontal: 7
  },
});

export default EditSchedule;
