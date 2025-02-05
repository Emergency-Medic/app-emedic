import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const Exp = () => {
  const history = ['Luka Bakar', 'Luka Tusuk', 'Pendarahan', 'Mimisan', 'Gigitan Ular'];

  const recommendations = [
    {
      id: 1,
      title: 'Penanganan penderita epilepsi',
      keywords: 'Henti, Jantung, Pernapasan, CPR',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      color: '#173F92', // Blue background
    },
    {
      id: 2,
      title: 'Penanganan penderita epilepsi',
      keywords: 'Henti, Jantung, Pernapasan, CPR',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      color: '#B22222', // Red background
    },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pencarian"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Search History */}
      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Riwayat Pencarian</Text>
          <TouchableOpacity>
            <Text style={styles.clearText}>Hapus Semua</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.historyTags}>
          {history.map((item, index) => (
            <View key={index} style={styles.historyTag}>
              <TouchableOpacity>
                <View>
                  <Entypo name="cross" size={24} color="red" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.historyTagText}>{item}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Recommendations */}
      <View style={styles.recommendationsContainer}>
        <Text style={styles.recommendationsTitle}>Disarankan untuk Anda</Text>
        <FlatList
          data={recommendations}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: item.color }]}>
              <View style={styles.containercardgambartext}>
                {/* <View style={styles.containergambar}> */}
                  {/* <Image
                    source={require('@/assets/images/Injured.png')}
                    style={styles.cardImageInjured}
                    resizeMode='contain'
                  /> */}
                {/* </View> */}
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardKeywords}>Kata Kunci: {item.keywords}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.learnText}>Pelajari</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    // flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    // flex: 1,
    width:'90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontFamily:'regular',
  },
  searchIcon: {
    marginLeft: 10,
  },
  historyContainer: {
    marginBottom: 20,
  },
  historyHeader: {
    gap:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'semibold',
  },
  clearText: {
    fontSize: 14,
    color: '#007BFF',
    fontFamily:'regular',
  },
  historyTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  historyTag: {
    backgroundColor: '#F8D7DA',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    flexDirection:'row',
  },
  historyTagText: {
    fontSize: 14,
    color: '#721C24',
  },
  recommendationsContainer: {
    marginTop: 20,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardKeywords: {
    fontSize: 14,
    color: '#FFF',
    marginVertical: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#FFF',
  },
  learnText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  containercardgambartext: {
    flexDirection: 'row',
  },
  containergambar: {

  },
  cardImageInjured: {
    height:60,
    width:90,
  }
});

export default Exp;
