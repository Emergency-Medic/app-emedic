import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadSearchHistory = async () => {
  try {
    const history = await AsyncStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Gagal memuat riwayat pencarian:', error);
    return [];
  }
};

export const saveSearchHistory = async (history) => {
  try {
    await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Gagal menyimpan riwayat pencarian:', error);
  }
};

export const clearSearchHistory = async () => {
  try {
    await AsyncStorage.removeItem('searchHistory');
  } catch (error) {
    console.error('Gagal menghapus riwayat pencarian:', error);
  }
};
