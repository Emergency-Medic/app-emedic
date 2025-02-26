import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { db } from '@/firebaseConfig';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Exp = () => {
  const router = useRouter();
  // const history = ['Luka Bakar', 'Luka Tusuk', 'Pendarahan', 'Mimisan', 'Gigitan Ular'];
  const [recommendations, setRecommendations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    setIsSearching(true);
    if (!searchText.trim()) {
      // Jika teks pencarian kosong, kembalikan ke rekomendasi default
      fetchDefaultRecommendations();
      setIsSearching(false);
      return;
    }

    const searchWords = searchText.toLowerCase().split(' '); // Pecah teks pencarian menjadi kata-kata
    const fetchedRecommendations = [];
    const articlesRef = collection(db, "articles_no_cat"); // Referensi ke koleksi articles_no_cat

    for (const word of searchWords) {
      const q = query(articlesRef, where("katakunci", "array-contains", word)); // Query untuk mencari kata kunci
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Cek apakah dokumen sudah ada di hasil pencarian
        if (!fetchedRecommendations.some(item => item.id === doc.id)) {
          fetchedRecommendations.push({
            id: doc.id,
            title: data.judul,
            keywords: data.katakunci.join(', '),
            description: data.deskripsi,
            image: data.gambarPenyakit,
            color: fetchedRecommendations.length % 2 === 0 ? Colors.blue : Colors.red,
          });
        }
      });
    }
    setRecommendations(fetchedRecommendations);
    const newHistory = [...new Set([searchText, ...searchHistory])];
    setSearchHistory(newHistory);
    saveSearchHistory(newHistory);
  };

  // Fungsi untuk mengambil rekomendasi default
  const fetchDefaultRecommendations = async () => {
    setIsSearching(false);
    const categoryDocuments = ['mimisan', 'terkilirdanmemar', 'sakitkepala'];
    const fetchedRecommendations = [];

    for (const docId of categoryDocuments) {
      const docRef = doc(db, "articles_no_cat", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        fetchedRecommendations.push({
          id: docId,
          title: data.judul,
          keywords: data.katakunci.join(', '),
          description: data.deskripsi,
          image: data.gambarPenyakit,
          color: fetchedRecommendations.length % 2 === 0 ? Colors.blue : Colors.red,
        });
      }
    }
    setRecommendations(fetchedRecommendations);
  };

  useEffect(() => {
    loadSearchHistory(); // Muat riwayat pencarian saat komponen dimuat
    fetchDefaultRecommendations(); // Muat rekomendasi default saat komponen dimuat
  }, []);

  useEffect(() => {
    setIsSearching(false);
    setSearchText('');
    fetchDefaultRecommendations();
  }, [router.pathname]);

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('searchHistory');
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Gagal memuat riwayat pencarian:', error);
    }
  };

  const saveSearchHistory = async (history) => {
    try {
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Gagal menyimpan riwayat pencarian:', error);
    }
  };

  const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncated = words.slice(0, 10).join(' ');
    return words.length > 10 ? truncated + '...' : truncated;
  };

  const handleResetSearch = () => {
    setSearchText('');
    fetchDefaultRecommendations();
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error('Gagal menghapus riwayat pencarian:', error);
    }
  };

  const removeItemFromHistory = async (itemToRemove) => {
    try {
      const updatedHistory = searchHistory.filter(item => item !== itemToRemove);
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Gagal menghapus item dari riwayat pencarian:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pencarian"
          value={searchText} // Tambahkan value dan onChangeText
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

       {/* Search History */}
       {!isSearching && (
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
                  {/* PERUBAHAN: Tambahkan onPress untuk memicu pencarian */}
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
      )}

       {/* Recommendations */}
       <View style={styles.recommendationsContainer}>
        <View style={styles.recommendationsHeader}>
          <Text style={styles.recommendationsTitle}>
            {isSearching ? "Hasil Pencarian Anda" : "Disarankan untuk Anda"}
          </Text>
          {isSearching && (
            <TouchableOpacity onPress={handleResetSearch}>
              <Text style={styles.clearText}>Reset Pencarian</Text>
            </TouchableOpacity>
          )}
        </View>
        {recommendations.length > 0 ? (
          <FlatList
            data={recommendations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.cart, { backgroundColor: item.color }]} key={item.id}>
                <View style={styles.pictureSection}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </View>
                <View style={styles.textSection}>
                  <View style={styles.verifiedIcon}>
                    <MaterialIcons name="verified" size={20} color="white" />
                  </View>
                  <Text style={styles.judul}>{item.title}</Text>
                  <Text style={styles.kataKunci}>Kata Kunci: {item.keywords}</Text>
                  <Text style={styles.deskripsi}>{truncateDescription(item.description)}</Text>
                  <TouchableOpacity
                    style={styles.pelajariSection}
                    onPress={() => router.push(`../screens/artikel/Articlepage?id=${item.id}`)}
                  >
                    <Text style={styles.pelajariText}>Pelajari</Text>
                    <View style={styles.pelajariIcon}>
                      <MaterialIcons name="article" size={10} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          isSearching && <Text style={styles.notFoundText}>Tidak ditemukan</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop:30,
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
  recommendationsContainer: {
    marginTop: 20,
    flex: 1,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontFamily: 'semibold',
    marginBottom: 0,
  },
	cart: {
		width: '100%', 
		// height: 94, 
		borderRadius: 20, 
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'flex-start', 
		marginTop: 10, 
		// paddingHorizontal: 10,
		paddingHorizontal: 25,
		paddingVertical: 10,
	}, 
	pictureSection: {
		flexDirection: 'column',  
		alignItems: 'left', 
		justifyContent: 'center',
		marginRight: 15,
	},
	image: { 
		width: 42, 
		height: 62, 
		justifyContent: 'center', 
		alignItems: 'center', 
		marginTop: 10,
		borderRadius: 10,
	},
	textSection: {
		flex: 1,
		justifyContent: 'center', 
		marginTop: 5,
	},
	judul: {
		color: Colors.white, 
		fontFamily: 'semibold', 
		fontSize: 12, 
		marginBottom: 5, 
	}, 
	kataKunci: {
		color: Colors.white, 
		fontFamily: 'italic', 
		fontSize: 8,
		marginBottom: 5, 
	}, 
	deskripsi: {
		color: Colors.white, 
		fontFamily: 'regular', 
		fontSize: 10, 
		marginBottom: 5, 
	}, 
	pelajariSection: {
		flexDirection: 'row', 
		alignItems: 'center', 
		justifyContent: 'flex-end',  
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
  notFoundText: {
    fontFamily: 'regular',
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  noHistoryText: {
    fontFamily: 'regular',
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  verifiedIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default Exp;