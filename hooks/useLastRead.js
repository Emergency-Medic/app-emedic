// hooks/useLastRead.js
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const useLastRead = () => {
    const router = useRouter();
  const [lastReadArticle, setLastReadArticle] = useState(null);
  const [modalHeight, setModalHeight] = useState(610);

  const loadLastRead = useCallback(async () => {
    try {
      const storedArticle = await AsyncStorage.getItem('lastRead');
      const parsedArticle = storedArticle ? JSON.parse(storedArticle) : null;
      setLastReadArticle(parsedArticle);
      setModalHeight(parsedArticle ? 590 : 500);
    } catch (error) {
      console.error("Error loading lastRead:", error);
      setLastReadArticle(null);
      setModalHeight(500);
    }
  }, []);

  const handleArticlePress = async (article) => {
    try {
      await AsyncStorage.setItem('lastRead', JSON.stringify(article));
      setLastReadArticle(article);
      router.push(`../screens/artikel/Articlepage?id=${article.id}`);
      setModalHeight(610);
    } catch (error) {
      console.error("Error saving lastRead:", error);
    }
  };

  return { lastReadArticle, modalHeight, loadLastRead, handleArticlePress };
};

export default useLastRead;