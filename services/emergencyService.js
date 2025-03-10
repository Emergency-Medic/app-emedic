import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

export async function sendEmergencyNotification(userUid, location) {
  console.log("🔍 Mengambil daftar teman...");
  const friendsRef = collection(db, `users/${userUid}/friends`);
  const friendsSnapshot = await getDocs(friendsRef);

  friendsSnapshot.forEach(async (friendDoc) => {
    const friendUid = friendDoc.data().friendUid;
    console.log(`📌 Mengambil data teman: ${friendUid}`);

    const friendRef = doc(db, "users", friendUid);
    const friendSnap = await getDoc(friendRef);

    if (friendSnap.exists()) {
      const pushToken = friendSnap.data().pushToken;
      console.log(`✅ Push token ditemukan: ${pushToken}`);

      if (pushToken) {
        try {
          const response = await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              to: pushToken,
              sound: "alarm.wav",
              title: "🚨 Darurat!",
              body: `Temanmu, ${auth.currentUser.displayName} dalam bahaya! Klik untuk melihat lokasi.`,
              priority: "high",
              data: {
                latitude: location.latitude,
                longitude: location.longitude,
                formattedAddress: location.formattedAddress,
                name: auth.currentUser.displayName,
                action: "open_map",
              },
              notification: {
                title: "🚨 Darurat!",
                body: `Temanmu, ${auth.currentUser.displayName} dalam bahaya! Klik untuk melihat lokasi.`,
                sound: "alarm.wav",
                priority: "high",
              },
              android: {
                channelId: "default",
                priority: "high",
              },
            }),
          });

          const result = await response.json();
          console.log("📬 Hasil pengiriman notifikasi:", result);

          if (result.data && result.data.id) {
            console.log(`📜 Push Ticket ID: ${result.data.id}`);
          }
        } catch (error) {
          console.error("❌ Error saat mengirim notifikasi:", error);
        }
      }
    } else {
      console.warn(`⚠️ Data teman ${friendUid} tidak ditemukan di Firestore.`);
    }
  });
}
