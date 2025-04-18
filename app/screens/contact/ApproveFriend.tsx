import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import BackButton from '@/components/BackButton';
import { useRouter } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import { auth, db } from '@/firebaseConfig';
import { getDoc, doc, collection, getDocs, updateDoc, addDoc, where, query, setDoc } from "firebase/firestore";


interface FriendRequest {
  id: string;
  senderUid: string;
  senderName: string;
  senderData: UserData;
  // ... other properties of the friend request 
}

interface UserData {
  name: string;
  firstName: string;
  username: string;
  phone?: string;  // Pastikan properti phone ada di UserData
  photoURL?: string;
  // ... properti lain dari data user Anda
}

type Contact = {
    id: string;
    name: string;
    phone: string;
};

const ApproveFriend: React.FC = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FriendRequest | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(true); // State untuk loading

  useEffect(() => {
    const fetchFriendRequests = async () => {
        if (user) {
            try {
                const friendRequestsRef = collection(db, "friend_requests");
                const q = query(friendRequestsRef, where("receiverUid", "==", user.uid), where("status", "==", "pending"));
                const querySnapshot = await getDocs(q);

                const requests: FriendRequest[] = [];

                for (const currentDoc of querySnapshot.docs) {
                    const requestData = currentDoc.data();
                    const senderUid = requestData.senderUid;

                    try {
                        const senderRef = doc(db, "users", senderUid);
                        const senderSnapshot = await getDoc(senderRef);
                        const senderData = senderSnapshot.data() as UserData;

                        const senderName = senderData?.firstName ?? senderData?.username ?? senderData?.name ?? "Nama Tidak Tersedia";

                        const friendRequestData = {
                            id: currentDoc.id,
                            senderUid: senderUid,
                            senderName: senderName, // Ini bisa dihapus jika tidak diperlukan
                            senderData: senderData, // Simpan data user lengkap
                            // ... other properties
                        };
                        requests.push(friendRequestData);

                    } catch (senderError) {
                        console.error(`Error getting sender ${senderUid} data:`, senderError);
                        // ... (handle error)
                        const friendRequestData = {
                            id: currentDoc.id,
                            senderUid: senderUid,
                            senderName: "Nama Tidak Tersedia",
                            senderData: {} as UserData, // Berikan objek kosong jika error
                            // ... other properties
                        };
                        requests.push(friendRequestData);
                    }
                }
                setFriendRequests(requests);
                setLoading(false); // Set loading ke false setelah data selesai di load

            } catch (error) {
                console.error("Error fetching friend requests:", error);
                Alert.alert("Error", "Gagal mengambil daftar permintaan.");
                setLoading(false); // Set loading ke false jika terjadi error
            }
        }
    };

    fetchFriendRequests();
}, [user]);

  const approveFriendRequest = async () => {
      if (selectedRequest && user) {
          try {
              const requestRef = doc(db, "friend_requests", selectedRequest.id);
              await updateDoc(requestRef, { status: "accepted" });

              const userFriendsRef = collection(db, "users", user.uid, "friends");
              await addDoc(userFriendsRef, { friendUid: selectedRequest.senderUid });
              // await setDoc(doc(userFriendsRef, ), { name: friendName })

              const senderFriendsRef = collection(db, "users", selectedRequest.senderUid, "friends");
              await addDoc(senderFriendsRef, { friendUid: user.uid });

              setFriendRequests(friendRequests.filter(request => request.id !== selectedRequest.id));

              Alert.alert("Success", "Permintaan pertemanan diterima.");
              setModalVisible(false);
          } catch (error) {
              console.error("Error approving friend request:", error);
              Alert.alert("Error", "Gagal menerima permintaan pertemanan.");
          }
      } else {
          if (!user) {
              Alert.alert("Perhatian", "Anda harus login untuk menerima permintaan.");
          } else if (!selectedRequest) {
              Alert.alert("Perhatian", "Pilih permintaan yang ingin diterima.");
          }
      }
  };

  const rejectFriendRequest = async (requestId: string) => {
      if (requestId && user) {
          try {
              const requestRef = doc(db, "friend_requests", requestId);
              await updateDoc(requestRef, { status: "rejected" });
              setFriendRequests(friendRequests.filter(request => request.id !== requestId));
              Alert.alert("Success", "Permintaan pertemanan ditolak.");
              setModalVisible(false);
          } catch (error) {
              console.error("Error rejecting friend request:", error);
              Alert.alert("Error", "Gagal menolak permintaan pertemanan.");
          }
      } else {
          if (!user) {
              Alert.alert("Perhatian", "Anda harus login untuk menolak permintaan.");
          } else if (!requestId) {
              Alert.alert("Perhatian", "Permintaan tidak valid.");
          }
      }
  };

  const renderContact = ({ item }: { item: FriendRequest }) => {
    const sender = item.senderData; // Ambil data user dari item

    return (
        <View style={styles.contactCard}>
            <View style={styles.contactInfo}>
                {/* Tampilkan foto user */}
                {sender?.photoURL ? ( // Optional chaining untuk menghindari error jika photoURL tidak ada
                    <Image source={{ uri: sender.photoURL }} style={styles.avatar} />
                ) : (
                    <Image source={require('../../../assets/images/icon.png')} style={styles.avatar} />
                )}

                <View>
                    <Text style={styles.contactName}>
                        {sender?.firstName || sender?.username || sender?.name || "Nama Tidak Tersedia"}
                    </Text>
                    {/* Tampilkan nomor telepon user */}
                    <Text style={styles.contactPhone}>{sender?.username || "Nomor Tidak Tersedia"}</Text>
                </View>
            </View>

            {/* Tombol-tombol aksi */}
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedRequest(item);
                        setModalVisible(true);
                    }}
                    style={styles.iconButtonEdit}
                >
                    <Feather name="check" size={18} color="#1AA832" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => rejectFriendRequest(item.id)}
                    style={styles.iconButtonDelete}
                >
                    <MaterialIcons name="delete-outline" size={18} color="#A8201A" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

  const renderHeader = () => (
    <>
      <StatusBar style="dark" translucent={true} />
      {/* header */}
      <BackButton color={Colors.red} top={44} left={10} goHome={true}/>
      <View style={styles.header}>
        <Text style={styles.title}>Halaman Kontak</Text>
      </View>
      {/* jumlah teman */}
      <View style={styles.friendCount}>
        <Text style={styles.friendCountText}>Daftar Permintaan Teman</Text>
        <View style={styles.friendCountBadge}>
          <Text style={styles.friendCountNumber}>{friendRequests.length}/10</Text>
        </View>
      </View>
      <View style={styles.listTitleWrapper}>
        <Text style={styles.listTitle}>Permintaan</Text>
      </View>
    </>
  );
  

  return (
      <View style={styles.container}>
        {loading ? ( // Tampilkan ActivityIndicator saat loading
                <ActivityIndicator size="large" color={Colors.blue} />
            ) : (
                <FlatList
                    data={friendRequests}
                    keyExtractor={(item) => item.id}
                    renderItem={renderContact}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.contactList}
                />
            )}
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
                  <Text style={styles.modalWarningQuestion}>
                  Jika Anda menerima permintaan pertemanan, maka Anda akan diberikan notifikasi jika teman Anda dalam bahaya.
                  </Text>
                  <View style={styles.answerContent}> 
                      <TouchableOpacity style={styles.meButton} onPress={approveFriendRequest}>
                        <Text style={styles.meText}>
                            Setuju
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.otherButton} onPress={() => rejectFriendRequest}>
                        <Text style={styles.otherText}>
                            Tolak
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
          <TouchableOpacity onPress={() => router.push("./SendRequest")}style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Kirim Permintaan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("./ApproveFriend")} style={styles.footerButtonActive}>
            <Text style={styles.footerButtonTextActive}>Permintaan</Text>
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
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
  },
  friendCountText: {
    flex: 1,
    fontSize: 15,
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
  modalContainer: {
    flex: 1,  
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: Colors.transparencyGrey,
  },
  modalCardContent: { 
    width: '85%',
    paddingVertical: 12,
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

export default ApproveFriend;