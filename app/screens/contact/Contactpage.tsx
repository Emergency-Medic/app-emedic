import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import BackButton from '@/components/BackButton';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { auth, db } from '@/firebaseConfig';
import { collection, getDocs,getDoc, updateDoc, doc, deleteDoc, where, query } from "firebase/firestore";

type Contact = {
    id: string;
    name: string;
    phone: string;
};
const Contactpage: React.FC = () => {
  const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const user = auth.currentUser;

    useEffect(() => {
      if (user) {
        const fetchContacts = async () => {
            try {
                const friendsRef = collection(db, "users", user.uid, "friends"); // Path ke subcollection "friends"
                const querySnapshot = await getDocs(friendsRef);
                const fetchedContacts: Contact[] = [];

                for (const docSnapshot of querySnapshot.docs) {
                  const friendUid = docSnapshot.data().friendUid; // Ambil friendUid dari properti friendUid
                    const friendRef = doc(db, "users", friendUid); // Ambil data user dari collection "users"
                    const friendDocSnapshot = await getDoc(friendRef);

                    if (friendDocSnapshot.exists()) {
                      const friendData = friendDocSnapshot.data();
                      fetchedContacts.push({
                          id: friendUid,
                          name: friendData.firstName || friendData.username,
                          phone: friendData.username || "",
                      });
                    } else {
                        console.warn(`Data user dengan UID ${friendUid} tidak ditemukan.`);
                    }
                }

                setContacts(fetchedContacts);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching contacts: ", error);
            }
        };

        if (user) { // Pastikan user sudah login
            fetchContacts();
        }
      }else {
        // Tampilkan pesan atau arahkan ke halaman login
        Alert.alert("Anda belum login", "Silakan login untuk melihat teman Anda.", [
          { text: "OK", onPress: () => router.push("/(auth)/SignInScreen") },
        ]);
      }
    }, [user]); // Tambahkan user sebagai dependency


  const handleDeleteContact = async () => {
    if (selectedContact && user) {
      try {
        const friendsRef = collection(db, "users", user.uid, "friends");
        const q = query(friendsRef, where("friendUid", "==", selectedContact.id)); // selectedContact.id berisi friendUid
  
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docToDelete = querySnapshot.docs[0]; // Ambil dokumen yang akan dihapus
  
          // 2. Hapus dokumen 'friends' dari user yang login
          await deleteDoc(doc(db, "users", user.uid, "friends", docToDelete.id));
  
          // 3. Cari dan hapus juga di collection teman yang dihapus
          const friendsRef2 = collection(db, "users", selectedContact.id, "friends");
          const q2 = query(friendsRef2, where("friendUid", "==", user.uid));
          const querySnapshot2 = await getDocs(q2);
          
  
          if (!querySnapshot2.empty) {
            const docToDelete2 = querySnapshot2.docs[0];
            await deleteDoc(doc(db, "users", selectedContact.id, "friends", docToDelete2.id));
          }
          
  
          setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== selectedContact.id));
          setModalVisible2(false);
          setSelectedContact(null);
          // alert('Teman berhasil dihapus.');
  
        } else {
          console.warn("Dokumen teman tidak ditemukan.");
          // alert('Gagal menghapus teman. Silakan coba lagi.');
        }
  
      } catch (error) {
        console.error("Error deleting contact: ", error);
        // alert("Gagal menghapus teman. Silakan coba lagi.");
      }
    } else {
      // ... (handle jika selectedContact atau user null)
    }
  };


  const renderContact = ({ item }: { item: Contact }) => (
    <View style={styles.contactCard}>
      <View style={styles.contactInfo}>
        <Image source={require('../../../assets/images/icon.png')} style={styles.avatar} />
        <View>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          onPress={() => {
            setSelectedContact(item);
            setModalVisible2(true);
          }} 
          style={styles.iconButtonDelete}
        >
          <MaterialIcons name="delete-outline" size={18} color="#A8201A" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHeader = () => (
    <>
      <StatusBar style="dark" translucent={true} />
      {/* headernya */}
      <BackButton color={Colors.red} top={44} left={10} goHome={true}/>
      <View style={styles.header}>
        <Text style={styles.title}>Halaman Kontak</Text>
      </View>
      {/* jumlah teman */}
      <View style={styles.friendCount}>
        <Text style={styles.friendCountText}>Jumlah teman</Text>
        <View style={styles.friendCountBadge}>
          <Text style={styles.friendCountNumber}>{contacts.length}/10</Text>
        </View>
        <TouchableOpacity onPress={() => router.push("./SendRequest")} style={styles.addFriend}>
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
      {/* Modal Section */}
      <Modal transparent={true} visible={modalVisible2} animationType="fade" onRequestClose={() => setModalVisible2(false)}>
        <TouchableWithoutFeedback onPressOut={() => setModalVisible2(false)}>
          <View style={styles.modalContainer2}>
              <TouchableWithoutFeedback>
                <View style={styles.modalCardContent2}> 
                  <View style={styles.modalWarningContainer2}>
                    <View style ={styles.modalWarningIcon2}>
                      <AntDesign name="warning" size={16} color={Colors.red} />
                    </View>
                    <Text style={styles.modalWarningText2}>
                      Peringatan
                    </Text>
                  </View>
                  <View>
                  {!!selectedContact ? (
                    <>
                      <Text style={styles.modalWarningQuestion2}>Anda yakin hapus
                      <Text style = {styles.deleteContactName}> {selectedContact.name}</Text> 
                      <Text style = {styles.deleteContactNumber}> ({selectedContact.phone})</Text></Text>
                    </>
                  ) : null}
                  </View>
                  <View style={styles.answerContent2}> 
                    <TouchableOpacity style={styles.meButton2} onPress={handleDeleteContact}> 
                      <Text style={styles.yaText} >
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
      {/* footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("./Contactpage")}style={styles.footerButtonActive}>
          <Text style={styles.footerButtonTextActive}>Teman</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("./SendRequest")} style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Kirim permintaan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("./ApproveFriend")} style={styles.footerButton}>
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
  contactCard2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 12,
    borderColor: Colors.white,
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
  iconButtonDelete: {
    backgroundColor: '#FFB8B8',
    borderRadius: 50,
    padding: 6,
    marginLeft: 6,
  },
  // bagian modal
  modalContainer: {
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.transparencyGrey,
  },
  modalCardContent: { 
    width: '85%',
    paddingHorizontal: 10,
    paddingVertical: 30,
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
    // width: 129, 
    // height: 33, 
    paddingHorizontal: 34,
    paddingVertical: 7,
    backgroundColor: Colors.red, 
    borderRadius: 30, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 10, 
    shadowColor: Colors.black, 
    shadowOffset: {width: 0, height: 10},
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
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1, 
    shadowRadius: 10,
  },
  otherText: {
    color: Colors.grey, 
    fontFamily: 'semibold', 
    fontSize: 14, 
  },
  // Modal 2
  modalContainer2: {
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.transparencyGrey,
  },
  modalCardContent2: { 
    // width: 342,
    // height: 169,
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
    paddingHorizontal: 5,
    textAlign: 'center',  
    marginTop: 23,
    marginBottom: 33
  },
  deleteContactName: {
    fontFamily: 'bold'
  },
  deleteContactNumber: {
    fontFamily: 'regular'
  },
  answerContent2: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 20, 
    marginBottom: 4
  },
  meButton2: {
    // width: 129, 
    // height: 33, 
    paddingHorizontal: 34,
    paddingVertical: 7,
    backgroundColor: Colors.red, 
    borderRadius: 30, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 10, 
    shadowColor: Colors.black, 
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
  }, 
  yaText: {
    color: Colors.white, 
    fontFamily: 'semibold', 
    fontSize: 14, 
  },
  otherButton2: {
    // width: 129, 
    // height: 33, 
    paddingHorizontal: 34,
    paddingVertical: 7,
    backgroundColor: Colors.white, 
    borderRadius: 30, 
    alignItems: 'center', 
    justifyContent: 'center', 
    elevation: 10, 
    shadowColor: Colors.black, 
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1, 
    shadowRadius: 10,
  },
  tidakText: {
    color: Colors.grey, 
    fontFamily: 'semibold', 
    fontSize: 14, 
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