import axios from "axios";
import Order from "../types/order";

class OrderRequestService {
  getAllCurrentOrders(idToken: string) {
    return axios.get<Order[] | null>(
      process.env
        .REACT_APP_FIREBASE_DB_API_ROUTE!.replace("<DB_ROUTE>", "/orders.json")
        .replace("<ID_TOKEN>", idToken)
    );
  }

  addNewOrder(idToken: string, orderObject: Order) {
    return axios.post(
      process.env
        .REACT_APP_FIREBASE_DB_API_ROUTE!.replace("<DB_ROUTE>", "/orders.json")
        .replace("<ID_TOKEN>", idToken),
      orderObject,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export default new OrderRequestService();
