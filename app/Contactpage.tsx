import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Image} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import BackButton from '@/components/BackButton'

// Definisikan tipe data kontak
type Contact = {
  id: string;
  name: string;
  phone: string;
};

const Contactpage: React.FC = () => {
  const contacts: Contact[] = [
    { id: '1', name: 'Orang 1', phone: '+62 812 1565 2273' },
    { id: '2', name: 'Orang 2', phone: '+62 812 1565 2273' },
    { id: '3', name: 'Orang 3', phone: '+62 812 1565 2273' },
  ];

  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <Image
          source={require('../assets/images/icon.png')} // Sesuaikan path file avatar
          style={styles.avatar}
        />
        <View>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.iconButton}>
        <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
        <MaterialIcons name="delete-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
        {/* back button */}
        <BackButton color='white'/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Halaman Kontak</Text>
      </View>

      <View style={styles.friendCount}>
        <Text style={styles.friendCountText}>Jumlah teman</Text>
        <View style={styles.friendCountBadge}>
          <Text style={styles.friendCountNumber}>3/10</Text>
        </View>
        <TouchableOpacity>
        <MaterialIcons name="person-outline" size={18} color="#6C6C6C" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        contentContainerStyle={styles.contactList}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Teman</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Kirim permintaan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Permintaan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#800000',
    marginLeft: 8,
  },
  friendCount: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  friendCountText: { fontSize: 16, flex: 1 },
  friendCountBadge: {
    backgroundColor: '#800000',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  friendCountNumber: { color: '#fff', fontSize: 16 },
  contactList: { paddingHorizontal: 16 },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  contactInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  contactName: { fontSize: 16, fontWeight: 'bold' },
  contactPhone: { fontSize: 14, color: '#555' },
  actionButtons: { flexDirection: 'row' },
  iconButton: { marginLeft: 8 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  footerButton: { alignItems: 'center' },
  footerButtonText: { fontSize: 16, color: '#800000' },
});

export default Contactpage;
