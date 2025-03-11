import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '@/constants/Colors'

const SearchHistory = ({ searchHistory, clearSearchHistory, removeItemFromHistory, setSearchText, handleSearch }) => {
  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Riwayat Pencarian</Text>
        <TouchableOpacity onPress={clearSearchHistory}>
          <Text style={styles.clearText}>Hapus Semua</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.historyTags}>
        {searchHistory.length > 0 ? (
          searchHistory.map((item, index) => (
            <View key={index} style={styles.historyTag}>
              <TouchableOpacity onPress={() => removeItemFromHistory(item)}>
                <View>
                  <Entypo name="cross" size={24} color="red" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setSearchText(item); handleSearch(); }}>
                <Text style={styles.historyTagText}>{item}</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noHistoryText}>Tidak ada</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
        alignItems: 'center',
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
        alignItems: 'center',
      },
      historyTagText: {
        fontSize: 14,
        color: '#721C24',
      },
      noHistoryText: {
        fontFamily: 'regular',
        color: 'gray',
        textAlign: 'center',
        marginTop: 10,
      },
});

export default SearchHistory;