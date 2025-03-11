// hooks/useFetchArticleData.js
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const useFetchArticleData = (id) => {
  const [articleData, setArticleData] = useState({
    title: '',
    deskripsi: '',
    verifikasi: '',
    dos: [],
    donts: [],
    gambarPenyakit: '',
    gambarDos: '',
    video: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'articles_no_cat', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setArticleData({
            title: data.judul,
            deskripsi: data.deskripsi,
            verifikasi: data.verifikasi,
            dos: data["do's"] || [],
            donts: data["dont's"] || [],
            gambarPenyakit: data.gambarPenyakit || '',
            gambarDos: data["gambarDo's"] || '',
            video: data.video || '',
          });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { ...articleData, isLoading };
};

export default useFetchArticleData;