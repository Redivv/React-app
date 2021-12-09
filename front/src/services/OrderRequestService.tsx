import axios from "axios";
import Order from "../types/order";

class OrderRequestService {
  getAllCurrentOrders(idToken: string) {
    return axios.get<Order[] | null>(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", "/orders")
        .replace("<ID_TOKEN>", idToken)
    );
  }

  addNewOrder(idToken: string, orderObject: Order) {
    return axios.post<{ name: string }>(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace("<DB_ROUTE>", "/orders")
        .replace("<ID_TOKEN>", idToken),
      orderObject,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  editOrder(idToken: string, orderObject: Order) {
    return axios.put(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace(
          "<DB_ROUTE>",
          `/orders`
        )
        .replace("<ID_TOKEN>", idToken),
      orderObject,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  deleteOrderById = (idToken: string, objectId: string) => {
    return axios.delete(
      process.env
        .REACT_APP_DB_API_ROUTE!.replace(
          "<DB_ROUTE>",
          `/orders/${objectId}`
        )
        .replace("<ID_TOKEN>", idToken)
    );
  };
}

export default new OrderRequestService();
