import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import BackButton from '@/components/BackButton';
import Octicons from '@expo/vector-icons/Octicons';

// definisiin tipe data kontak -- statis
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
          source={require('../assets/images/icon.png')} 
          style={styles.avatar}
        />
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

  return (
    <View style={styles.container}>
      {/* masih bermasalah, list statis sebaiknya ga pake scroll view*/}
      <ScrollView>
        <StatusBar style='dark' translucent={true}/>
        {/* header */}
        <View style={styles.header}>
                <View style={styles.container}>
                    <View>
                      <BackButton color={Colors.red}/>
                    </View>
                    <Text style={styles.title}>Halaman Materi</Text>
                </View>
            </View>
        {/* jumlah Teman */}
        <View style={styles.friendCount}>
          <Text style={styles.friendCountText}>Jumlah teman</Text>
          <View style={styles.friendCountBadge}>
            <Text style={styles.friendCountNumber}>3/10</Text>
          </View>
          <TouchableOpacity style={styles.addFriend}>
            <Octicons name="person-add" size={20} color="#29335C" />
          </TouchableOpacity>
        </View>
        {/* list Teman */}
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={renderContact}
          contentContainerStyle={styles.contactList}
        />
      </ScrollView>

      {/* Footer */}
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
  allwrap: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: {
    marginTop:30,
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
  headerTitle: {
    fontSize: 18,
    fontFamily: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  friendCount: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 10,
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
    marginLeft: 10
  },
  friendCountBadge: 
  {
    backgroundColor: Colors.red,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  addFriend: {
    margin: 15
  },
  friendCountNumber: { 
    color: '#fff', 
    fontFamily: 'bold' 
  },
  contactList: { 
    paddingHorizontal: 16 
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
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
    marginRight: 12 },
  contactName: { 
    fontFamily: 'bold', 
    fontSize: 16,
    color: Colors.blue, 
  },
  contactPhone: { 
    fontFamily: 'regular',
    color: Colors.blue, 
    fontSize: 14 
  },
  actionButtons: { 
    flexDirection: 'row' 
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000'
  },
  footerButton: { 
    padding: 8 
  },
  footerButtonText: { 
    fontSize: 14, 
    fontFamily: 'bold',
    color: Colors.blue 
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
    fontFamily: 'bold' 
  },
});

export default Contactpage;
