import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Sesuaikan dengan lokasi konfigurasi Firebase

const useFetchArticles = (selectedCategory, data) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const categoryDocuments = data[selectedCategory] || [];
      const fetchedArticles = [];

      for (const docId of categoryDocuments) {
        const docRef = doc(db, 'articles_no_cat', docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const docData = docSnap.data();
          fetchedArticles.push({
            id: docId,
            title: docData.judul,
            keywords: docData.katakunci,
            description: docData.deskripsi,
            image: docData.gambarPenyakit,
            description: docData.deskripsi,
            verified: docData.verifikasi,
          });
        }
      }

      setArticles(fetchedArticles);
      setIsLoading(false);
    };

    fetchData();
  }, [selectedCategory]);

  return { articles, isLoading };
};

export default useFetchArticles;
