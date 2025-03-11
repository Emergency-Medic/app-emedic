import { collection, getDocs } from "firebase/firestore";
import * as Notifications from "expo-notifications";

export const scheduleNotificationsFromFirestore = async () => {
    try {
        // Ambil data dari Firestore
        const schedulesSnapshot = await getDocs(collection(db, "schedules"));
        const schedules = schedulesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        await Notifications.cancelAllScheduledNotificationsAsync(); // Hapus notifikasi lama

        schedules.forEach(schedule => {
            const { medName, reminders, startDate, endDate, forever } = schedule;

            reminders.forEach(reminder => {
                const { hour, minute } = reminder;
                
                // Konversi Firestore Timestamp ke Date
                const start = startDate.toDate();
                const end = endDate ? endDate.toDate() : null;
                
                // Loop dari startDate hingga endDate
                let currentDate = new Date(start);
                while (forever || (end && currentDate <= end)) {
                    // Buat tanggal + waktu reminder
                    const reminderDate = new Date(currentDate);
                    reminderDate.setHours(hour);
                    reminderDate.setMinutes(minute);
                    reminderDate.setSeconds(0);

                    if (reminderDate > new Date()) { // Hanya jadwalkan jika belum lewat
                        Notifications.scheduleNotificationAsync({
                            content: {
                                title: `Saatnya minum ${medName}`,
                                body: `Jangan lupa minum obat pada pukul ${hour}:${minute.toString().padStart(2, '0')}.`,
                                sound: true,
                                android: { channelId: "default" },
                            },
                            trigger: { date: reminderDate },
                        });

                        console.log(`Notifikasi dijadwalkan: ${medName} pada ${reminderDate}`);
                    }

                    // Tambah satu hari
                    currentDate.setDate(currentDate.getDate() + 1);
                }
            });
        });

        console.log("Semua notifikasi telah dijadwalkan.");
    } catch (error) {
        console.error("Gagal mengambil jadwal dari Firestore:", error);
    }
};
