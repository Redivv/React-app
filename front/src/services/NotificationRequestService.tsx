import axios from "axios";
import Notification from "../types/notification";

class NotificationRequestService {
  getAllNotifications(idToken: string) {
    return axios.get<Notification[] | null>(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", "/notifications")
        .replace("<ID_TOKEN>", idToken)
    );
  }

  deleteNotificationById(idToken: string, notificationId: number) {
    return axios.delete(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace(
          "<DB_ROUTE>",
          `/notifications/${notificationId}`
        )
        .replace("<ID_TOKEN>", idToken)
    );
  }

  clearAllNotifications(idToken: string) {
    return axios.delete(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", `/notifications`)
        .replace("<ID_TOKEN>", idToken)
    );
  }
}

export default new NotificationRequestService();
