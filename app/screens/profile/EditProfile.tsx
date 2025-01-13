import React from 'react'
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
import BackButton from '@/components/BackButton';
import { router } from 'expo-router';

export default function EditProfile() {
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
                <View style={styles.idCont}>
                    <Text style={styles.id}>#XXXID</Text>
                    <TouchableOpacity>
                        <Feather name="copy" size={14} color={Colors.grey}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.dataContWrap}>
                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Nama Lengkap</Text>
                        <Text style={styles.dataSpec}>John Doe</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn}onPress={() => router.push('./ChangeName')}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Username</Text>
                        <Text style={styles.dataSpec}>John Doe</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('./ChangeUsername')} style={styles.editBtn}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Nomor Telepon</Text>
                        <Text style={styles.dataSpec}>John Doe</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('./ChangePhone')} style={styles.editBtn}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Alamat Email</Text>
                        <Text style={styles.dataSpec}>John Doe</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('./ChangeEmail')} style={styles.editBtn}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dataCont}>
                    <View style={styles.dataText}>
                        <Text style={styles.dataTitle}>Kata Sandi</Text>
                        <Text style={styles.dataSpec}>******</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn} onPress={() => router.push('./ChangePass')}>
                        <Feather name="edit" size={14} color={Colors.blue} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
})