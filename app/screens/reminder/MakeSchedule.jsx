import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton'
import { Picker } from "@react-native-picker/picker";
import Checkbox from 'expo-checkbox';


const MakeSchedule = () => {
    const [medName, setMedName] = useState('Obat XX');
    const [dose, setDose] = useState(1);
    const [frequency, setFrequency] = useState(2);
    const [startDate, setStartDate] = useState('01 Des 2024');
    const [endDate, setEndDate] = useState('03 Des 2024');
    const [selectedValue, setSelectedValue] = useState("sdm");  
    const [isChecked, setIsChecked] = useState(false); 
    const [time, setTime] = useState('20:00');
    const [reminders, setReminders] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    const addReminder = () => {
        if (time && /^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        setReminders([...reminders, { time, remindLater: false }]);
        setTime("");
        }
    };

    const toggleReminder = (index) => {
        const newReminders = [...reminders];
        newReminders[index].remindLater = !newReminders[index].remindLater;
        setReminders(newReminders);
    };

    
    const calculateDays = (start, end) => {
        const months = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mei': 4, 'Jun': 5,
            'Jul': 6, 'Agu': 7, 'Sep': 8, 'Okt': 9, 'Nov': 10, 'Des': 11
        };
        
        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split(' ');
            return new Date(parseInt(year), months[month], parseInt(day));
        };
        
        const startDateObj = parseDate(start);
        const endDateObj = parseDate(end);
        
        return Math.max(0, (endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    };
    
    const duration = calculateDays(startDate, endDate)+1;

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
                <Text style={styles.title}>Pengingat Baru</Text>
                <Text style={styles.label}>Nama Obat</Text>
                <TextInput 
                    style={styles.input}
                    value={medName}
                    onChangeText={setMedName}
                />
                
                <Text style={styles.label}>Jenis Obat</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
                    <TouchableOpacity style={[styles.typeButton, { marginLeft: 0 }]}><FontAwesome5 name="capsules" size={24} color="black" /><Text>Tablet</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.typeButton}><FontAwesome name="tint" size={30} color="black" /><Text>Sirup</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.typeButton}><FontAwesome6 name="eye-dropper" size={24} color="black" /><Text>Tetes</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.typeButton}><FontAwesome5 name="syringe" size={24} color="black" /><Text>Injeksi</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.typeButton}><FontAwesome name="flask" size={30} color="black" /><Text>Salep</Text></TouchableOpacity>
                </ScrollView>
                
                <Text style={styles.label}>Dosis</Text>
                <View style={styles.doseContainer}>
                    <View style={styles.upDownContainer}>
                        <TouchableOpacity onPress={() => setDose(Math.max(1, dose - 1))} style={styles.doseButton}><Text style={styles.white}>-</Text></TouchableOpacity>
                        <Text style={styles.doseText}>{dose}</Text>
                        <TouchableOpacity onPress={() => setDose(dose + 1)} style={styles.doseButton}><Text style={styles.white}>+</Text></TouchableOpacity>
                    </View>
                    
                    <Text style={styles.frequencyText2}>sdm</Text>
                    <View style={styles.choice}>
                        {/* <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            style={{ fontFamily: 'regular' }}
                        >
                            <Picker.Item label="SDM" value="sdm" />
                            <Picker.Item label="SDT" value="sdt" />
                        </Picker> */}
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
                    <TextInput style={styles.dateInput} value={startDate} onChangeText={setStartDate} />
                    <Text style={styles.toText}>ke</Text>
                    <TextInput style={styles.dateInput} value={endDate} onChangeText={setEndDate} />
                    <Text style={styles.toText}>({duration} hari)</Text>
                </View>
                        
                <Text style={styles.or}>Atau</Text>
                {/* Checkbox untuk opsi tambahan */}
                <View style={styles.checkboxContainer}>
                    <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? "#A8201A" : undefined} />
                    <Text style={styles.checkboxLabelRed}>Selamanya</Text>
                </View>

                <Text style={styles.label}>Pengingat</Text>
                
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder="HH:MM"
                    value={time}
                    onChangeText={setTime}
                    />
                    <TouchableOpacity style={styles.button} onPress={addReminder}>
                        <Text style={styles.buttonText}>Tambah</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    {
                        reminders.map((item, index) => (
                            <View key={index} style={styles.reminderCard}>
                                <Text style={styles.timeText}>{item.time}</Text>
                                <View style={styles.switchContainer}>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            value={checkedItems[index] || false}
                                            onValueChange={() => {
                                            const newCheckedItems = [...checkedItems];
                                            newCheckedItems[index] = !newCheckedItems[index]; // Toggle state
                                            setCheckedItems(newCheckedItems);
                                            }}
                                            color={checkedItems[index] ? "#13070C" : undefined}
                                        />
                                        <Text style={styles.checkboxLabelBlue}>
                                            Ingatkan saya 15 menit setelahnya
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    }
                </View>

                <Text style={styles.label}>Deskripsi (Opsional)</Text>
                <TextInput style={styles.descriptionInput} placeholder="Isi dengan informasi tambahan obat" />
                
                <TouchableOpacity style={styles.saveButton}>
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
        gap: 7
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
});

export default MakeSchedule;
