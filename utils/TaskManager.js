import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const BACKGROUND_NOTIFICATION_TASK = 'background-notification-task';

// Definisikan task di background
TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data, error }) => {
  if (error) {
    console.error('TaskManager Error:', error);
    return;
  }

  console.log('Notifikasi dijalankan di background:', data);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Saatnya minum obat!",
      body: "Jangan lupa minum obat sesuai jadwal.",
      sound: 'default',
    },
    trigger: {
      seconds: 5, // Tes dengan 5 detik, nanti ubah ke waktu yang sesuai
    },
  });
});

export default BACKGROUND_NOTIFICATION_TASK;
