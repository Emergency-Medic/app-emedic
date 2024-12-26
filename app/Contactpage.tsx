import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import BackButton from '@/components/BackButton';
import Octicons from '@expo/vector-icons/Octicons';

type Contact = {
  id: string;
  name: string;
  phone: string;
};

const Contactpage: React.FC = () => {
  const contacts: Contact[] = [
    { id: '1', name: 'Orang 1', phone: '+62 812 1565 2273' },
    { id: '2', name: 'Orang 2', phone: '+62 813 1566 2272' },
    { id: '3', name: 'Orang 3', phone: '+62 814 1567 2271' },
  ];

  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <Image source={require('../assets/images/icon.png')} style={styles.avatar} />
        <View>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.iconButtonEdit}>
          <Feather name="edit" size={18} color="#29335C" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButtonDelete}>
          <MaterialIcons name="delete-outline" size={18} color="#A8201A" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      <StatusBar style="dark" translucent={true} />
      {/* headernya */}
      <BackButton color={Colors.red} top={44} left={10}/>
      <View style={styles.header}>
        <Text style={styles.title}>Halaman Kontak</Text>
      </View>
      {/* jumlah teman */}
      <View style={styles.friendCount}>
        <Text style={styles.friendCountText}>Jumlah teman</Text>
        <View style={styles.friendCountBadge}>
          {/* jumlah temannya udah dinamis, tapi perlu nyesuaiin sesuai backendnya besok (?) */}
          <Text style={styles.friendCountNumber}>{contacts.length}/10</Text>
        </View>
        <TouchableOpacity style={styles.addFriend}>
          <Octicons name="person-add" size={20} color="#29335C" />
        </TouchableOpacity>
      </View>
      <View style={styles.listTitleWrapper}>
        <Text style={styles.listTitle}>List Teman</Text>
      </View>
    </>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.contactList}
      />
      {/* footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButtonActive}>
          <Text style={styles.footerButtonTextActive}>Teman</Text>
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
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.blue,
    fontFamily: 'bold',
  },
  friendCount: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
  },
  friendCountText: {
    flex: 1,
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'bold',
    marginLeft: 10,
  },
  friendCountBadge: {
    backgroundColor: Colors.red,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  addFriend: {
    margin: 15,
  },
  friendCountNumber: {
    color: '#fff',
    fontFamily: 'bold',
  },
  listTitleWrapper: {
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  listTitle: {
    fontFamily: 'bold',
    fontSize: 16,
    color: Colors.blue,
  },
  contactList: {
    paddingHorizontal: 16,
    paddingBottom: 70, 
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 12,
    borderColor: '#BED1E6',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contactName: {
    fontFamily: 'bold',
    fontSize: 16,
    color: Colors.blue,
  },
  contactPhone: {
    fontFamily: 'regular',
    color: Colors.blue,
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButtonEdit: {
    backgroundColor: '#B8D8FF',
    borderRadius: 50,
    padding: 6,
    marginLeft: 6,
  },
  iconButtonDelete: {
    backgroundColor: '#FFB8B8',
    borderRadius: 50,
    padding: 6,
    marginLeft: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35, 
    shadowRadius: 6,
  },  
  footerButton: {
    padding: 8,
  },
  footerButtonText: {
    fontSize: 14,
    fontFamily: 'bold',
    color: Colors.blue,
  },
  footerButtonActive: {
    backgroundColor: Colors.red,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginRight: 8,
  },
  footerButtonTextActive: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'bold',
  },
});

export default Contactpage;