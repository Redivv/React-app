import Notification from "./notification";

type NotificationContextData = {
  notifications: Notification[] | [];
  getAllNotifications: () => void;
  deleteNotificationById: (
    notificationId: number,
    ordinalNumber: number
  ) => void;
  clearAllNotifications: () => void;
  areNotificationsLoaded: boolean;
};

export default NotificationContextData;
