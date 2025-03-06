import { useState, useEffect } from 'react'
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton';
import { router } from 'expo-router';
import { auth, db } from "@/firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function EditProfile() {
        const [name, setName] = useState('')
        const [username, setUsername] = useState('')
        const [email, setEmail] = useState('')
        const [modalVisible, setModalVisible] = useState(false);
        const user = auth.currentUser
        // const { user, setUser } = useUser()
        const [showPasswordFields, setShowPasswordFields] = useState(false); // sebenarnya selain dipake buat show password atau ga, bakal buat email juga

        useEffect(() => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const isGoogleUser = currentUser.providerData.some(
                (provider) => provider.providerId === 'google.com'
            );
            setShowPasswordFields(!isGoogleUser);
            }
        }, []);

        const handleEmail = async () => {
            // if (auth.currentUser.emailVerified) {
            //     router.push('./ChangeEmail')
            //     return
            // } else {
            //     try {
            //         setModalVisible(true)
            //         await sendEmailVerification(auth.currentUser);
            //         console.log('Email verification sent')
            //     } catch (error) {
            //         Alert.alert(error.message)
            //     }
            // }
            router.push('./ChangeEmail')
            return
        }
        
        useEffect(() => {
            if (!user) return;
                
            // Listen to real-time updates on this user's document
            const userRef = doc(db, "users", user.uid);
            const unsubscribe = onSnapshot(userRef, (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.data())
                const data = snapshot.data();
                setName(`${snapshot.data().firstName} ${snapshot.data().lastName}`);
                setUsername(snapshot.data().username);
                setEmail(snapshot.data().email);
            } else {
                console.log("User does not exist!");
            }
            });
                
            return () => unsubscribe();  // Cleanup listener on unmount
        }, [user]);



  return (
    <ScrollView style={styles.allwrap}>
        <BackButton color={Colors.white} top={45}/>
        <View style={styles.header}></View>
        <View style={styles.container}>
            <View style={styles.profileCont}>
                <View style={styles.profileImgContCont}>
                    <View style={styles.profileImgCont}>
                        <Image style={styles.profileImg} resizeMode='contain' source={require('../../../assets/images/Maskot.png')}/>
                    </View>
                    <TouchableOpacity style={styles.camBtn}>
                        <Entypo style={styles.camIcon} name="camera" size={15} color={Colors.red} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.dataContWrap}>
                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Nama Lengkap</Text>
                        <Text style={styles.dataSpec}>{name}</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn}onPress={() => router.push('./ChangeName')}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Username</Text>
                        <Text style={styles.dataSpec}>{username}</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('./ChangeUsername')} style={styles.editBtn}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View>

                
                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Alamat Email</Text>
                        <Text style={styles.dataSpec}>{email}</Text>
                    </View>
                    {showPasswordFields ?
                    <TouchableOpacity onPress={handleEmail} style={styles.editBtn}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity> : null
                }
                </View> 
                {showPasswordFields ?
                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Kata Sandi</Text>
                        <Text style={styles.dataSpec}>******</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn} onPress={() => router.push('./ChangePass')}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View> : null
                }
            </View>
        </View>
        <Modal transparent={true} visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
            <TouchableWithoutFeedback onPressOut={() => setModalVisible(false)}>
            <View style={styles.modalContainer2}>
                <TouchableWithoutFeedback>
                <View style={styles.modalCardContent2}>
                    <View style={styles.modalWarningContainer2}>
                    <View style={styles.modalWarningIcon2}>
                        <AntDesign name="warning" size={16} color={Colors.red} />
                    </View>
                    <Text style={styles.modalWarningText2}>
                        Pemberitahuan
                    </Text>
                    </View>
                    <Text style={styles.modalWarningQuestion2}>
                        Email Anda belum terverifikasi. Maka, verifikasi sudah dikirimkan. Silakan buka inbox mail Anda
                    </Text>
                    <View style={styles.answerContent2}>
                    <TouchableOpacity style={styles.meButton2} onPress={() => setModalVisible(false)}>
                        <Text style={styles.yaText}>
                        OK
                        </Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </View>
            </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    allwrap: {
        backgroundColor: Colors.white,
    },
    header: {
        backgroundColor: Colors.red,
        height: 175
    },
    container: {
        width: '100%',
        padding: 20
    },
    profileCont: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    profileImgContCont: {
        flex: 1,
        marginTop: -70,
        position: 'relative',
    },
    profileImgCont: {
        width: 100,
        height: 100,
        backgroundColor: Colors.white,
        borderRadius: 50,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    profileImg: {
        width: '100%',
        height: '100%',
        // borderRadius: 50,
    },
    camBtn: {
        position: 'absolute',
        backgroundColor: Colors.white,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        // zIndex: 99,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25, 
        shadowRadius: 3.84, 
        elevation: 2.5,
        right: 15,
        bottom: 15
    },
    camIcon: {
        // flex: 1,
        // position: 'relative',
        // zIndex: 100,
    },
    idCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    id: {
        color: Colors.red,
        fontFamily: 'bold',
        fontSize: 14
    },
    dataContWrap: {
        marginTop: 34,
        marginRight: 1
    },
    dataCont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 16,
        paddingBottom: 10,
        borderBottomColor: Colors.grey,
        borderBottomWidth: 0.3
    },
    dataText: {
        gap: 3
    },
    dataTitle: {
        fontFamily: 'bold',
        fontSize: 14,
        color: Colors.red
    },
    dataSpec: {
        fontFamily: 'light',
        fontSize: 12,
        color: Colors.black
    },
    editBtn: {
        backgroundColor: Colors.lightBlue,
        padding: 7.5,
        borderRadius: 30
    },
    modalContainer2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.transparencyGrey,
    },
    modalCardContent2: {
        marginHorizontal: 30,
        paddingHorizontal: 7,
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
        padding: 10,
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
        paddingHorizontal: 30,
        textAlign: 'center',
        marginTop: 23,
        marginBottom: 33
      },
      answerContent2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 4
      },
      meButton2: {
        paddingHorizontal: 34,
        paddingVertical: 7,
        backgroundColor: Colors.red,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      yaText: {
        color: Colors.white,
        fontFamily: 'semibold',
        fontSize: 14,
      },
      otherButton2: {
        paddingHorizontal: 34,
        paddingVertical: 7,
        backgroundColor: Colors.white,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      tidakText: {
        color: Colors.grey,
        fontFamily: 'semibold',
        fontSize: 14,
      },
})