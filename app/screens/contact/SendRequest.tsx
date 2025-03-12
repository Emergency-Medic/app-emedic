import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import BackButton from '@/components/BackButton';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { auth, db } from '@/firebaseConfig';
import { doc, onSnapshot, collection, addDoc, getDocs, where, query } from "firebase/firestore";


type Contact = {
    id: string;
    name: string;
    phone: string;
};

const SendRequest: React.FC = () => {
    const [id, setId] = useState('');
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [foundUser, setFoundUser] = useState<Contact | null>(null); // State untuk user yang ditemukan
    const user = auth.currentUser;

    useEffect(() => {
        const findUser = async () => {
            if (id) {
                try {
                    const usersRef = collection(db, "users");
                    const q = query(usersRef, where("username", "==", id)); // Cari berdasarkan username
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const userData = querySnapshot.docs[0].data();
                        setFoundUser({ // Set user yang ditemukan
                            id: querySnapshot.docs[0].id,
                            name: userData.firstName || userData.username,
                            phone: userData.username || "",
                        });
                    } else {
                        setFoundUser(null); // Reset jika tidak ditemukan
                    }
                } catch (error) {
                    console.error("Error finding user:", error);
                    Alert.alert("Error", "Gagal mencari user.");
                }
            } else {
                setFoundUser(null);
            }
        };

        findUser();
    }, [id]);

    const sendFriendRequest = async () => {
        if (selectedContact && user) {
            try {
                const friendRequestsRef = collection(db, "friend_requests");
                await addDoc(friendRequestsRef, {
                    senderUid: user.uid,
                    receiverUid: selectedContact.id,
                    status: "pending",
                });
                Alert.alert("Success", "Permintaan pertemanan berhasil dikirim.");
                setModalVisible(false);
            } catch (error) {
                console.error("Error sending friend request:", error);
                Alert.alert("Error", "Gagal mengirim permintaan pertemanan.");
            }
        } else {
            if (!user) {
                Alert.alert("Perhatian", "Anda harus login untuk mengirim permintaan.");
            } else if (!selectedContact) {
                Alert.alert("Perhatian", "Pilih user yang ingin ditambahkan.");
            }
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
                <TouchableOpacity onPress={() => {
                    setSelectedContact(item);
                    setModalVisible(true);
                }} style={styles.iconButtonEdit}>
                    <Feather name="check" size={18} color="#1AA832" />
                </TouchableOpacity>
            </View>
        </View>
    );

  const renderHeader = React.useMemo(() => (
    <>
      <StatusBar style="dark" translucent={true} />
      {/* headernya */}
      <BackButton color={Colors.red} top={44} left={10} goHome={true}/>
      <View style={styles.header}>
        <Text style={styles.title}>Halaman Kontak</Text>
      </View>
      {/* jumlah teman */}
      <View style={styles.friendCount}>
        <TouchableOpacity style={styles.addFriend}>
          <Octicons name="person-add" size={20} color="#29335C" />
        </TouchableOpacity>
        <TextInput
          placeholder="Input username"
          value={id}
          onChangeText={setId}
          style={styles.friendCountText}
        />
      </View>
      <View style={styles.listTitleWrapper}>
        <Text style={styles.listTitle}>Hasil</Text>
      </View>
    </>
  ), [id]);
  

  return (
      <View style={styles.container}>
        <FlatList
            keyboardShouldPersistTaps="handled"
            data={foundUser ? [foundUser] : []} // Tampilkan user yang ditemukan atau array kosong
            keyExtractor={(item) => item?.id || 'not-found'} // Tambahkan keyExtractor
            renderItem={renderContact}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.contactList}
        />
        {/* modal */}
        <Modal transparent={true} visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
          <TouchableWithoutFeedback onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.modalCardContent}>
                  <View style={styles.modalWarningContainer}>
                    <View style ={styles.modalWarningIcon}>
                      <AntDesign name="warning" size={16} color={Colors.red} />
                    </View>
                    <Text style={styles.modalWarningText}>
                      Peringatan
                    </Text>
                  </View>
                  <View>
                    {!!selectedContact ? (
                      <Text style={styles.qcontain}>
                        <Text style={styles.modalWarningQuestion}>Anda yakin menambahkan </Text>
                        <Text style={styles.getContactName}>{selectedContact.name}</Text>
                        <Text style={styles.modalWarningQuestion}> kedalam daftar pertemanan anda?</Text>
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.answerContent}>
                  <TouchableOpacity style={styles.meButton} onPress={sendFriendRequest}>
                      <Text style={styles.meText}>
                          Yakin
                      </Text>
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.otherButton}>
                      <Text style={styles.otherText}>
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
          <TouchableOpacity onPress={() => router.push("./Contactpage")} style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Teman</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("./SendRequest")}style={styles.footerButtonActive}>
            <Text style={styles.footerButtonTextActive}>Kirim Permintaan</Text>
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
    fontFamily: 'regular',
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
    backgroundColor: '#B8FFC4',
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
  // bagian modal
  modalContainer: {
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.transparencyGrey,
  },
  modalCardContent: { 
    width: '85%',
    paddingHorizontal: 5,
    paddingVertical: 10,
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
  getContactName: {
    fontFamily: 'bold'
  },
  qcontain: {
    paddingHorizontal: 30,
    marginVertical: 20,
    gap: 0,
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

export default SendRequest;