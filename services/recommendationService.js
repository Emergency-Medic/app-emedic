import { collection, getDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const categoryDocuments = ['mimisan', 'terkilirdanmemar', 'sakitkepala'];

export const fetchRecommendations = async (searchWords) => {
  const fetchedRecommendations = [];
  const articlesRef = collection(db, 'articles_no_cat');

  for (const word of searchWords) {
    const q = query(articlesRef, where('katakunci', 'array-contains', word));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (!fetchedRecommendations.some(item => item.id === doc.id)) {
        fetchedRecommendations.push({
          id: doc.id,
          title: data.judul,
          keywords: data.katakunci,
          description: data.deskripsi,
          image: data.gambarPenyakit,
        });
      }
    });
  }

  return fetchedRecommendations;
};

export const fetchDefaultRecommendations = async () => {
  const fetchedRecommendations = [];
  for (const docId of categoryDocuments) {
    const docRef = doc(db, 'articles_no_cat', docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      fetchedRecommendations.push({
        id: docId,
        title: data.judul,
        keywords: data.katakunci,
        description: data.deskripsi,
        image: data.gambarPenyakit,
      });
    }
  }

  return fetchedRecommendations;
};
