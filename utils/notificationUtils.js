import * as Notifications from 'expo-notifications';

export const deleteNotifications = async (notificationIds) => {
  try {
    await Promise.all(notificationIds.map((id) => 
      Notifications.cancelScheduledNotificationAsync(id)
    ));
  } catch (error) {
    console.error("Error deleting notifications:", error);
    throw new Error("Gagal menghapus notifikasi.");
  }
};
