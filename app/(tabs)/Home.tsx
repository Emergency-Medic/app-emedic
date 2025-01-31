import React, { useState } from "react";
import { Modal, ScrollView, View, Image ,  Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/Colors';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const data = {  
  kategori1: [  
    {  
      id: 1,  
      title: "Penanganan penderita epilepsi",  
      keywords: "Henti, Jantung, Pernapasan, CPR",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('../../assets/images/undraw_injured_9757 1.png'),  
    },  
    
    {  
      id: 2,  
      title: "Penanganan penderita epilepsi",  
      keywords: "Henti, Jantung, Pernapasan, CPR",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('../../assets/images/undraw_injured_9757 1.png'),  
    },  
  ],  
  kategori2: [  
    {  
      id: 3,  
      title: "Penanganan henti jantung",  
      keywords: "CPR, Pertolongan Pertama",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('../../assets/images/undraw_injured_9757 1.png'),  
    },  

    {  
      id: 4,  
      title: "Penanganan penderita epilepsi",  
      keywords: "Henti, Jantung, Pernapasan, CPR",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('../../assets/images/undraw_injured_9757 1.png'),  
    },  
  ],  
  kategori3: [  
    {  
    
      id: 5,  
      title: "Penanganan pernapasan",  
      keywords: "Asma, Sesak Napas",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('../../assets/images/undraw_injured_9757 1.png'),  
    },
    
    {  
      id: 6,  
      title: "Penanganan penderita epilepsi",  
      keywords: "Henti, Jantung, Pernapasan, CPR",  
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",  
      image: require('../../assets/images/undraw_injured_9757 1.png'),  
    },  
  ],  
};  

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('kategori1');

  const renderCategoryInfo = () => {
    return data[selectedCategory].map((item)=> (
      <View style={styles.cart} key={item.id}> 
        <View style={styles.pictureSection}>
          <MaterialIcons name="verified" size={14} color={Colors.white} />
          <Image source={item.image} style={styles.image}/>
        </View>
        <View style={styles.textSection}>
          <Text style={styles.judul}> 
            {item.title} 
          </Text>
          <Text style={styles.kataKunci}>
            Kata Kunci: {item.keywords}
          </Text>
          <Text style={styles.deskripsi}>
            {item.description} 
          </Text>

          <TouchableOpacity style={styles.pelajariSection}> 
            <Text style={styles.pelajariText}> 
              Pelajari
            </Text>
            <View style={styles.pelajariIcon}> 
              <MaterialIcons name="article" size={10} color="black" />
            </View>
          </TouchableOpacity>
        </View>  
      </View>
    )); 
  }; 

  return (
    <ScrollView style={styles.container}>
        <StatusBar style='dark' translucent={true} />
        {/* Hello, (name) */}
        <View style={styles.header}> 
          <View style={styles.profileSection}> 
            <View style={styles.profileIcon}>
              <MaterialIcons name="person-outline" size={18} color={Colors.grey} />
            </View>
            {/* Greating Section */}
            <View style={styles.greatingSection}>
              <Text style={styles.halo}>
                Halo,
              </Text>
              <Text style={styles.name}> 
                Natasya
              </Text>
            </View>
          </View> 
          <View style={styles.alarmIcon}> 
            <MaterialIcons name="alarm" size={20} color= {Colors.blue} />
          </View>
        </View>

        {/* Content */}
        {/* Rekomendasi Pembelajaran */}
        <View style={styles.rekomendasiPembelajaranTitle}>
          <Text style={styles.titleText}>Rekomendasi Pembelajaran</Text>
          <TouchableOpacity onPress={() => router.push('../screens/MetodePenangan')}>
            <Text style={styles.lihatSemua}> Lihat Semua</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles.kategoriSection}> 
          <TouchableOpacity style={styles.section} onPress={()=> setSelectedCategory('kategori1')}> 
            <Text style={styles.keterangan}>Kategori 1</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.section} onPress={()=> setSelectedCategory('kategori2')}> 
            <Text style={styles.keterangan}>Kategori 2</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.section} onPress={()=> setSelectedCategory('kategori3')}> 
            <Text style={styles.keterangan}>Kategori 3</Text> 
          </TouchableOpacity>
        </View>
        
        {/* Cart */}  
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.cartContainer}>
          {renderCategoryInfo()}
        </ScrollView>

    </ScrollView>
  ); 
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: Colors.white,
  }, 
  header: {
    marginTop: 20, 
    padding: 32,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
  },
  profileSection: {
    flexDirection: 'row', 
    alignItems: 'center', 
  }, 
  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: Colors.lightGrey, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  greatingSection: {
    flexDirection: 'row',
    marginLeft: 15, 
  }, 
  halo: {
    fontFamily: 'light',
    color: Colors.blue,
    fontSize: 20, 
  }, 
  name: {
    marginLeft: 5, 
    fontFamily: 'bold', 
    fontSize: 20, 
    color: Colors.blue,
  }, 
  alarmIcon: {
    alignItems: 'center', 
  }, 
  rekomendasiPembelajaranTitle: {
    marginLeft: 32,
    marginRight: 32,  
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  }, 
  titleText: {
    fontFamily: 'bold', 
    fontSize: 15, 
    color: Colors.blue, 
  }, 
  lihatSemua: {
    fontFamily: 'regular', 
    fontSize: 10, 
    color: Colors.red,
  }, 
  kategoriSection: {
    marginLeft: 32, 
    flexDirection: 'row', 
  },
  section:{
    width: 69, 
    height: 23, 
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10,  
    marginRight: 10, 
  },
  keterangan: {
    fontSize: 9, 
  },
  cartContainer: {
    marginTop: 15, 
    marginLeft: 30, 
    marginRight: 30,
    borderRadius: 20,
  },
  cart: {
    width: 248, 
    height: 94, 
    backgroundColor: Colors.blue,
    borderRadius: 20, 
    flexDirection: 'row', 
    alignContent: 'center', 
    justifyContent: 'center', 
    marginLeft: 10, 
  }, 
  pictureSection: {
    flexDirection: 'column',  
    alignItems:'flex-start', 
    justifyContent: 'center',
    marginLeft: 32,  
  },
  image: { 
    width: 42, 
    height: 42, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  textSection: {
    marginLeft: 10,  
    justifyContent: 'flex-start', 
  },
  judul: {
    color: Colors.white, 
    fontFamily: 'semibold', 
    fontSize: 12, 
    marginTop: 10, 
  }, 
  kataKunci: {
    color: Colors.white, 
    fontFamily: 'italic', 
    fontSize: 8,
    marginTop: 3, 
  }, 
  deskripsi: {
    color: Colors.white, 
    fontFamily: 'regular', 
    fontSize: 10, 
    marginTop: 5, 
    marginRight: 40, 
  }, 
  pelajariSection: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-end',  
    marginRight: 32, 
  }, 
  pelajariText: {
    marginRight: 6, 
    fontFamily: 'semibold', 
    fontSize: 12, 
    color: Colors.white, 
  }, 
  pelajariIcon: {
    width: 20,
    height: 20, 
    borderRadius: 20, 
    backgroundColor: Colors.white, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
}); 
