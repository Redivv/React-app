import { createContext, useContext, useEffect, useState } from "react";
import NotificationContextData from "../types/notificationContextData";
import AuthContext from "./auth-context";
import React from "react";
import NotificationRequestService from "../services/NotificationRequestService";
import Notification from "../types/notification";

const NotificationContext = createContext<NotificationContextData>({
  notifications: [],
  getAllNotifications: () => {},
  deleteNotificationById: () => {},
  clearAllNotifications: () => {},
  areNotificationsLoaded: true,
});

export const NotificationContextProvider: React.FC = (props) => {
  const authContext = useContext(AuthContext);
  const [notifications, setNotifications] = useState<Notification[] | []>([]);
  const [areNotificationsLoaded, setAreNotificationsLoaded] = useState(true);

  const getAllNotifications = () => {
    setAreNotificationsLoaded(false);
    NotificationRequestService.getAllNotifications(
      authContext.accessToken!
    ).then((response) => {
      setNotifications([...response.data!]);
      setAreNotificationsLoaded(true);
    });
  };

  const deleteNotificationById = (
    notificationId: number,
    ordinalNumber: number
  ) => {
    let notificationsClone = notifications;
    notificationsClone.splice(ordinalNumber, 1);
    setNotifications([...notificationsClone]);
    NotificationRequestService.deleteNotificationById(
      authContext.accessToken!,
      notificationId
    ).catch(() => alert("Error occured. Changes did not save"));
  };
  const clearAllNotifications = () => {
    setNotifications([]);
    NotificationRequestService.clearAllNotifications(
      authContext.accessToken!
    ).catch(() => alert("Error occured. Changes did not save"));
  };

  const contextValues = {
    notifications: notifications,
    getAllNotifications: getAllNotifications,
    deleteNotificationById: deleteNotificationById,
    clearAllNotifications: clearAllNotifications,
    areNotificationsLoaded: areNotificationsLoaded,
  };

  useEffect(() => {
    getAllNotifications();
  }, []);

  return (
    <NotificationContext.Provider value={contextValues}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
