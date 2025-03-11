import { useState, useEffect } from 'react';
import { db } from '@/firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

const useSearch = () => {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    setIsSearching(true);
    if (!searchText.trim()) {
      fetchDefaultRecommendations();
      setIsSearching(false);
      return;
    }

    const searchWords = searchText.toLowerCase().split(' ');
    const fetchedRecommendations = [];
    const articlesRef = collection(db, "articles_no_cat");

    for (const word of searchWords) {
      const q = query(articlesRef, where("katakunci", "array-contains", word));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
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

  useEffect(() => {
    loadSearchHistory();
    fetchDefaultRecommendations();
  }, []);

  useEffect(() => {
    setIsSearching(false);
    setSearchText('');
    fetchDefaultRecommendations();
  }, [router.pathname]);

  return {
    recommendations,
    searchText,
    setSearchText,
    isSearching,
    searchHistory,
    handleSearch,
    fetchDefaultRecommendations,
    clearSearchHistory,
    removeItemFromHistory,
    setIsSearching,
  };
};

export default useSearch;